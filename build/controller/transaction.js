"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const pdf_1 = require("../util/pdf");
const data_access_1 = require("../model/data-access/data-access");
async function genTransactionPDF(req, res, next) {
    try {
        let transactions = await data_access_1.DAL.transactionDAL.getTransaction(1);
        let userInfo = await data_access_1.DAL.userInfoDAL.getUserInfoById(1);
        let lpInfo = await data_access_1.DAL.lpInfoDAL.getLpById(1);
        let charges_info = [];
        for (let i = 0; i < transactions.length; i++) {
            if (charges_info.filter((ele) => { return ele.id == transactions[i].charges_id; }).length == 0) {
                let charge = await data_access_1.DAL.chargesDAL.getChargesById(transactions[i].charges_id);
                let cpk_1 = await data_access_1.DAL.checkpointDAL.getCheckpointById(charge.cpk_1);
                let cpk_2 = await data_access_1.DAL.checkpointDAL.getCheckpointById(charge.cpk_2);
                charges_info.push({ id: transactions[i].charges_id, cpk_1: cpk_1.area_name, cpk_2: cpk_2.area_name, cost: charge.cost });
            }
        }
        const tableInfo = {
            headers: ['ข้อมูลผู้ใช้', ''],
            rows: [
                [
                    `หมายเลข e-code: ${await data_access_1.DAL.easypassDAL.getEasyPassById(userInfo.e_code_id)}\nชื่อเจ้าของบัตร: ${userInfo.firstname} ${userInfo.lastname}\nเลขที่เบียนรถ: ${lpInfo.license_number} ${lpInfo.province}`,
                    `เลขบัตรประจำตัว: ${userInfo.citizen_id}\nemail: ${userInfo.email}`
                ]
            ]
        };
        const tableResult = {
            headers: ['ลำดับ', 'สถานที่', 'วันที่', 'จำนวนเงิน'],
            rows: []
        };
        let cost = 0;
        for (let i = 0; i < transactions.length; i++) {
            let tmp_charges = charges_info.filter((ele) => { return ele.id == transactions[i].charges_id; });
            tableResult.rows.push([`${i + 1}`,
                `${tmp_charges[0]['cpk_1']} -> ${tmp_charges[0]['cpk_2']}`,
                `${transactions[i].last_update}`,
                `${tmp_charges[0]['cost']}`]);
            cost += tmp_charges[0]['cost'];
        }
        tableResult.rows.push([``, ``, `รวมทั้งสิ้น`, `${cost}`]);
        const doc = new pdf_1.PDFDocumentCustom();
        res.type('application/pdf');
        doc.pipe(res);
        doc.genHeader();
        doc.fontSize(16);
        doc.font('fonts/THSarabunNew.ttf');
        doc.genTable(tableInfo).moveDown();
        doc.genTable(tableResult).moveDown();
        doc.end();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.genTransactionPDF = genTransactionPDF;
//# sourceMappingURL=transaction.js.map
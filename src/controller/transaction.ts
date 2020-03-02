import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { PDFDocumentCustom as PDFDocument } from '../util/pdf';

import { DAL } from '../model/data-access/data-access';

export async function genTransactionPDF(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let transactions = await DAL.transactionDAL.getTransaction(req['payload'].id);
        let userInfo = await DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
        let lpInfo = await DAL.lpInfoDAL.getLpById(parseInt(req.body.lp_id));
        let charges_info = [];
        for (let i = 0; i < transactions.length; i++) {
            if (charges_info.filter((ele) => { return ele.id == transactions[i].charges_id }).length == 0) {
                let charge = await DAL.chargesDAL.getChargesById(transactions[i].charges_id);
                let cpk_1 = await DAL.checkpointDAL.getCheckpointById(charge.cpk_1);
                let cpk_2 = await DAL.checkpointDAL.getCheckpointById(charge.cpk_2);
                charges_info.push({ id: transactions[i].charges_id, cpk_1: cpk_1.area_name, cpk_2: cpk_2.area_name, cost: charge.cost });
            }
        }
        const tableInfo = {
            headers: ['ข้อมูลผู้ใช้', ''],
            rows: [
                [
                    `หมายเลข e-code: ${await DAL.easypassDAL.getEasyPassById(userInfo.e_code_id)}\nชื่อเจ้าของบัตร: ${userInfo.firstname} ${userInfo.lastname}\nเลขที่เบียนรถ: ${lpInfo.license_number} ${lpInfo.province}`,
                    `เลขบัตรประจำตัว: ${userInfo.citizen_id}\nemail: ${userInfo.email}`
                ]
            ]
        }
        const tableResult = {
            headers: ['ลำดับ', 'สถานที่', 'วันที่', 'จำนวนเงิน'],
            rows: []
        };
        let cost = 0;
        for (let i = 0; i < transactions.length; i++) {
            let tmp_charges = charges_info.filter((ele) => { return ele.id == transactions[i].charges_id });
            tableResult.rows.push([`${i + 1}`,
            `${tmp_charges[0]['cpk_1']} -> ${tmp_charges[0]['cpk_2']}`,
            `${transactions[i].last_update}`,
            `${tmp_charges[0]['cost']}`]);
            cost += tmp_charges[0]['cost'];
        }
        tableResult.rows.push([``, ``, `รวมทั้งสิ้น`, `${cost}`]);

        const doc = new PDFDocument();
        res.type('application/pdf');
        doc.pipe(res);
        doc.genHeader();
        doc.fontSize(16);
        doc.font('fonts/THSarabunNew.ttf');
        doc.genTable(tableInfo).moveDown();
        doc.genTable(tableResult).moveDown();
        doc.end();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const pdf_1 = require("../util/pdf");
const data_access_1 = require("../model/data-access/data-access");
async function genSingleTransactionPDF(req, res, next) {
    try {
        let transactions = await data_access_1.DAL.transactionDAL.getTransactionById(req.query.transaction_id);
        let userInfo = await data_access_1.DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
        let lpInfo = await data_access_1.DAL.lpInfoDAL.getLpById(transactions.lp_id);
        let charge = await data_access_1.DAL.chargesDAL.getChargesById(transactions.charges_id);
        let cpk_1 = await data_access_1.DAL.checkpointDAL.getCheckpointById(charge.cpk_1);
        let cpk_2 = await data_access_1.DAL.checkpointDAL.getCheckpointById(charge.cpk_2);
        let charges_info = { id: transactions.charges_id, cpk_1: cpk_1.area_name, cpk_2: cpk_2.area_name, cost: charge.cost };
        const tableInfo = {
            headers: ['ข้อมูลผู้ใช้', ''],
            rows: [
                [
                    `หมายเลข e-code: ${(await data_access_1.DAL.easypassDAL.getEasyPassById(userInfo.e_code_id)).e_code}\nชื่อเจ้าของบัตร: ${userInfo.firstname} ${userInfo.lastname}\nเลขที่เบียนรถ: ${lpInfo.license_number} ${lpInfo.province}`,
                    `เลขบัตรประจำตัว: ${userInfo.citizen_id}\nemail: ${userInfo.email}`
                ]
            ]
        };
        const tableResult = {
            headers: ['ลำดับ', 'สถานที่', 'วันที่', 'จำนวนเงิน'],
            rows: []
        };
        let cost = 0;
        let in_datetime = new Date((new Date(transactions.in_datetime)).setHours(new Date(transactions.in_datetime).getHours() - 7));
        let out_datetime = new Date((new Date(transactions.out_datetime)).setHours(new Date(transactions.out_datetime).getHours() - 7));
        tableResult.rows.push([`${1}`,
            `${charges_info['cpk_1']} -> ${charges_info['cpk_2']}`,
            `${in_datetime} -> ${out_datetime}`,
            `${charges_info['cost']}`]);
        cost += charges_info['cost'];
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
exports.genSingleTransactionPDF = genSingleTransactionPDF;
async function genTransactionPDF(req, res, next) {
    try {
        let transactions = await data_access_1.DAL.transactionDAL.getTransaction(req['payload'].id, req.query.lp_id, req.query.date_from ? req.query.date_from : null, req.query.date_to ? req.query.date_to : null);
        let userInfo = await data_access_1.DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
        let lpInfo = await data_access_1.DAL.lpInfoDAL.getLpById(parseInt(req.query.lp_id));
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
                    `หมายเลข e-code: ${(await data_access_1.DAL.easypassDAL.getEasyPassById(userInfo.e_code_id)).e_code}\nชื่อเจ้าของบัตร: ${userInfo.firstname} ${userInfo.lastname}\nเลขที่เบียนรถ: ${lpInfo.license_number} ${lpInfo.province}`,
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
                `${transactions[i].in_datetime} -> ${transactions[i].out_datetime}`,
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
async function getTransactions(req, res, next) {
    try {
        let datas = await data_access_1.DAL.transactionDAL.getTransactionList(req.params.limit ? parseInt(req.params.limit) : 10, req.params.offset ? parseInt(req.params.offset) : 0, req.params.status ? parseInt(req.params.status) : 1);
        if (datas.count == 0)
            return res.status(HttpStatus.NOT_FOUND).send();
        let transaction_data = [];
        for (let i = 0; i < parseInt(req.params.limit); i++) {
            let template_data = {};
            let lp_info = await data_access_1.DAL.lpInfoDAL.getLpById(datas.data[i].lp_id);
            let charge_info = await data_access_1.DAL.chargesDAL.getChargesById(datas.data[i].charges_id);
            let cpk_1 = await data_access_1.DAL.checkpointDAL.getCheckpointById(charge_info.cpk_1);
            let cpk_2 = await data_access_1.DAL.checkpointDAL.getCheckpointById(charge_info.cpk_2);
            template_data.lp_info = lp_info.license_number + ' ' + lp_info.province;
            template_data.from_th = cpk_1.area_name;
            template_data.from_en = cpk_1.area_name_en;
            template_data.to_th = cpk_2.area_name;
            template_data.to_en = cpk_2.area_name_en;
            template_data.cost = charge_info.cost;
            template_data.last_update = datas.data[i].last_update;
            transaction_data.push(template_data);
        }
        return res.status(HttpStatus.OK).send({ data: transaction_data, count: datas.count });
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.getTransactions = getTransactions;
async function insertTransactions(req, res, next) {
    try {
        let transaction_data = {};
        let lp_info = (await data_access_1.DAL.lpInfoDAL.getLpByLpnumAndProvince(req.body.lp_num, req.body.province));
        if (!lp_info)
            return res.status(HttpStatus.NOT_FOUND).send('License plate number was not found on the server.');
        let account_id = (await data_access_1.DAL.userInfoDAL.getUserInfoIdByEcodeId(lp_info.e_code_id)).account_id;
        transaction_data.account_id = account_id;
        transaction_data.charges_id = req.body.charges_id;
        transaction_data.lp_id = lp_info.id;
        transaction_data.in_datetime = req.body.in_datetime;
        transaction_data.out_datetime = req.body.out_datetime;
        let recipient_info = await data_access_1.DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
        transaction_data.recipient = recipient_info.firstname + ' ' + (recipient_info.lastname ? recipient_info.lastname : '');
        let wallet = (await data_access_1.DAL.easypassDAL.getEasyPassById(lp_info.e_code_id)).wallet;
        let cost = (await data_access_1.DAL.chargesDAL.getChargesById(transaction_data.charges_id)).cost;
        if (wallet - cost >= 0) {
            await data_access_1.DAL.easypassDAL.updateWallet(lp_info.e_code_id, wallet - cost);
            transaction_data.status = 1;
        }
        else
            transaction_data.status = 0;
        let result = await data_access_1.DAL.transactionDAL.insertTransaction(transaction_data);
        await data_access_1.DAL.historyDAL.updateExistHistory(req.body.history_id);
        if (result)
            return res.status(HttpStatus.CREATED).send();
        return res.status(HttpStatus.NOT_ACCEPTABLE);
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.insertTransactions = insertTransactions;
//# sourceMappingURL=transaction.js.map
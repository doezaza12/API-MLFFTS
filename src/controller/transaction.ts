import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { PDFDocumentCustom as PDFDocument } from '../util/pdf';

import { DAL } from '../model/data-access/data-access';
import { transactionAttribute } from '../model/db';

export async function genTransactionPDF(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let transactions = await DAL.transactionDAL.getTransaction(req['payload'].id, req.query.lp_id,
            req.query.date_from ? req.query.date_from : null, req.query.date_to ? req.query.date_to : null);
        let userInfo = await DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
        let lpInfo = await DAL.lpInfoDAL.getLpById(parseInt(req.query.lp_id));
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

export async function getTransactions(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let datas = await DAL.transactionDAL.getTransactionList(req.params.limit ? parseInt(req.params.limit) : 10,
            req.params.offset ? parseInt(req.params.offset) : 0, req.params.status ? parseInt(req.params.status) : 1);
        if (datas.count == 0) return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send({ data: datas.data, count: datas.count });
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function insertTransactions(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let transaction_data = {} as transactionAttribute;
        let lp_info = (await DAL.lpInfoDAL.getLpByLpnumAndProvince(req.body.lp_num, req.body.province));
        if (!lp_info) return res.status(HttpStatus.NOT_FOUND).send('License plate number was not found on the server.');
        let account_id = (await DAL.userInfoDAL.getUserInfoIdByEcodeId(lp_info.e_code_id)).account_id;
        transaction_data.account_id = account_id;
        transaction_data.charges_id = req.body.charges_id;
        transaction_data.lp_id = lp_info.id;
        let recipient_info = await DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
        transaction_data.recipient = recipient_info.firstname + ' ' + (recipient_info.lastname ? recipient_info.lastname : '');
        let wallet = (await DAL.easypassDAL.getEasyPassById(lp_info.e_code_id)).wallet;
        let cost = (await DAL.chargesDAL.getChargesById(transaction_data.charges_id)).cost;
        if (wallet - cost >= 0) {
            await DAL.easypassDAL.updateWallet(lp_info.e_code_id, wallet - cost);
            transaction_data.status = 1;
        }
        else transaction_data.status = 0;
        let result = await DAL.transactionDAL.insertTransaction(transaction_data);
        if (result) return res.status(HttpStatus.CREATED).send();
        return res.status(HttpStatus.NOT_ACCEPTABLE)
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
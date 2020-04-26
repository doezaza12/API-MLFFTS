import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as s3 from 'aws-sdk/clients/s3';
import { PDFDocumentCustom as PDFDocument } from '../util/pdf';

import { DAL } from '../model/data-access/data-access';
import { transactionAttribute } from '../model/db';

const bucket = new s3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
})

export async function genSingleTransactionPDF(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let transactions = await DAL.transactionDAL.getTransactionById(req.query.transaction_id);
        let userInfo = await DAL.userInfoDAL.getUserInfoByAccountId(req['payload'].id);
        let lpInfo = await DAL.lpInfoDAL.getLpById(transactions.lp_id);
        let charge = await DAL.chargesDAL.getChargesById(transactions.charges_id);
        let cpk_1 = await DAL.checkpointDAL.getCheckpointById(charge.cpk_1);
        let cpk_2 = await DAL.checkpointDAL.getCheckpointById(charge.cpk_2);
        let charges_info = { id: transactions.charges_id, cpk_1: cpk_1.area_name, cpk_2: cpk_2.area_name, cost: charge.cost };
        const tableInfo = {
            headers: ['ข้อมูลผู้ใช้', ''],
            rows: [
                [
                    `หมายเลข e-code: ${(await DAL.easypassDAL.getEasyPassById(lpInfo.e_code_id)).e_code}\nชื่อเจ้าของบัตร: ${userInfo.firstname} ${userInfo.lastname}\nเลขที่เบียนรถ: ${lpInfo.license_number} ${lpInfo.province}`,
                    `เลขบัตรประจำตัว: ${userInfo.citizen_id}\nemail: ${userInfo.email}`
                ]
            ]
        }
        const tableResult = {
            headers: ['ลำดับ', 'สถานที่', 'วันที่', 'จำนวนเงิน'],
            rows: []
        };
        let cost = 0;
        let in_datetime = new Date((new Date(transactions.in_datetime)).setHours(new Date(transactions.in_datetime).getHours())).toUTCString();
        let out_datetime = new Date((new Date(transactions.out_datetime)).setHours(new Date(transactions.out_datetime).getHours())).toUTCString();
        // let in_datetime = new Date((new Date(transactions.in_datetime)).setHours(new Date(transactions.in_datetime).getHours() - 7));
        // let out_datetime = new Date((new Date(transactions.out_datetime)).setHours(new Date(transactions.out_datetime).getHours() - 7));
        tableResult.rows.push([`${1}`,
        `${charges_info['cpk_1']} -> ${charges_info['cpk_2']}`,
        `${in_datetime} -> ${out_datetime}`,
        `${charges_info['cost']}`]);
        cost += charges_info['cost'];
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
                    `หมายเลข e-code: ${(await DAL.easypassDAL.getEasyPassById(lpInfo.e_code_id)).e_code}\nชื่อเจ้าของบัตร: ${userInfo.firstname} ${userInfo.lastname}\nเลขที่เบียนรถ: ${lpInfo.license_number} ${lpInfo.province}`,
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
            // `${transactions[i].in_datetime} -> ${transactions[i].out_datetime}`,
            `${new Date((new Date(transactions[i].in_datetime)).setHours(new Date(transactions[i].in_datetime).getHours())).toUTCString()} -> ${new Date((new Date(transactions[i].out_datetime)).setHours(new Date(transactions[i].out_datetime).getHours())).toUTCString()}`,
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
        let datas = await DAL.transactionDAL.getTransactionList(req['payload'].id, req.query.limit ? parseInt(req.query.limit) : null,
            req.query.offset ? parseInt(req.query.offset) : null, req.query.date_from ? req.query.date_from : null,
            req.query.date_to ? req.query.date_to : null, req.query.status ? parseInt(req.query.status) : 1, req.query.lp_id);
        if (datas.count == 0) return res.status(HttpStatus.NOT_FOUND).send();
        let transaction_data = []
        for (let i = 0; i < parseInt(datas.data.length); i++) {
            let template_data = {} as any;
            let lp_info = await DAL.lpInfoDAL.getLpById(datas.data[i].lp_id)
            let charge_info = await DAL.chargesDAL.getChargesById(datas.data[i].charges_id);
            let cpk_1 = await DAL.checkpointDAL.getCheckpointById(charge_info.cpk_1);
            let cpk_2 = await DAL.checkpointDAL.getCheckpointById(charge_info.cpk_2);
            template_data.id = datas.data[i].id;
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
        transaction_data.in_datetime = req.body.in_datetime;
        transaction_data.out_datetime = req.body.out_datetime;
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
        await DAL.historyDAL.updateExistHistory(req.body.history_id);
        bucket.deleteObject({
            Bucket: process.env.bucket_name,
            Key: (process.env.key + '/' + req.body.image_name)
        }, function (err, data) {
            if (err) console.error(err);
        });
        if (result) return res.status(HttpStatus.CREATED).send();
        return res.status(HttpStatus.NOT_ACCEPTABLE)
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export async function getMonthRange(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let datas = await DAL.transactionDAL.getTransactionList(req['payload'].id, req.query.limit ? parseInt(req.query.limit) : null,
            req.query.offset ? parseInt(req.query.offset) : null, req.query.date_from ? req.query.date_from : null,
            req.query.date_to ? req.query.date_to : null, req.query.status ? parseInt(req.query.status) : 1, req.query.lp_id, req.query.asc ? true : false);
        if (datas.count == 0) return res.status(HttpStatus.NOT_FOUND).send();
        let months = []
        for (let i = 0; i < parseInt(datas.data.length); i++) {
            let month = new Date(datas.data[i].last_update).getMonth();
            months.push(month + 1);
        }
        let uniqueMonths = [...new Set(months)]
        return res.status(HttpStatus.OK).send(uniqueMonths);
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
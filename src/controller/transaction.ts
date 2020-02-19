import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as PDFDocument from 'pdfkit';

import { DAL } from '../model/data-access/data-access';

export async function genTransactionPDF(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let transactions = await DAL.transactionDAL.getTransaction(1);
        let lp_datas = [];
        for (let i = 0; i < transactions.length; i++) {
            lp_datas.push(await DAL.lpInfoDAL.getLpById(1));
        }
        const doc = new PDFDocument();
        res.type('application/pdf');
        doc.pipe(res);
        doc.fontSize(25);
        for (let i = 0; i < transactions.length; i++) {
            doc.text(`${transactions[i].last_update}`);
        }
        doc.end();
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const PDFDocument = require("pdfkit");
const data_access_1 = require("../model/data-access/data-access");
async function genTransactionPDF(req, res, next) {
    try {
        let transactions = await data_access_1.DAL.transactionDAL.getTransaction(1);
        let lp_datas = [];
        for (let i = 0; i < transactions.length; i++) {
            lp_datas.push(await data_access_1.DAL.lpInfoDAL.getLpById(1));
        }
        const doc = new PDFDocument();
        res.type('application/pdf');
        doc.pipe(res);
        doc.fontSize(25);
        for (let i = 0; i < transactions.length; i++) {
            doc.text(`${transactions[i].last_update}`);
        }
        doc.end();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.genTransactionPDF = genTransactionPDF;
//# sourceMappingURL=transaction.js.map
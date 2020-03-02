"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
async function webHook(req, res, next) {
    try {
        console.log(req.body);
        return res.status(HttpStatus.OK).send();
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.webHook = webHook;
//# sourceMappingURL=webhook.js.map
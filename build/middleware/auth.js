"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const config_1 = require("../util/config");
const data_access_1 = require("../model/data-access/data-access");
function authentication(req, res, next) {
    try {
        let header = req.headers.authorization.split(' ')[0];
        let token = req.headers.authorization.split(' ')[1];
        if (header == 'Bearer') {
            jwt.verify(token, config_1.Configuration.token.secret, async (err, payload) => {
                if (err)
                    return res.status(HttpStatus.UNAUTHORIZED).send();
                let result = await data_access_1.DAL.accountDAL.validateToken(payload['id'], payload['uuid']);
                if (!result)
                    return res.status(HttpStatus.UNAUTHORIZED).send();
                req.body.payload = payload;
                next();
            });
        }
        else {
            return res.status(HttpStatus.EXPECTATION_FAILED).send();
        }
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
exports.authentication = authentication;
//# sourceMappingURL=auth.js.map
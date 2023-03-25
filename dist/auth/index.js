"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET } = process.env;
const auth = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            console.log("hello world");
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error();
            }
            else {
                const decoded = await jsonwebtoken_1.default.verify(token, SECRET || '');
                req.token = decoded;
                next();
            }
        }
    }
    catch (error) {
        res.status(401).send('Please authenticate');
    }
};
module.exports = auth;
//# sourceMappingURL=index.js.map
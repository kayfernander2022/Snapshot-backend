"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageKitRouter = void 0;
const dotenv = __importStar(require("dotenv"));
const imagekit_1 = __importDefault(require("imagekit"));
const express_1 = __importDefault(require("express"));
dotenv.config();
const router = express_1.default.Router();
exports.imageKitRouter = router;
const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY || '';
router.get("/api/imagekit-auth", async (req, res) => {
    const imageKit = new imagekit_1.default({ publicKey: 'public_33FjszinEBzlgrIz8+HbC3JVASM=', privateKey: IMAGEKIT_KEY, urlEndpoint: 'https://ik.imagekit.io/jfpi8d5c5/capstone/' });
    const authParams = imageKit.getAuthenticationParameters();
    res.status(200).send(authParams);
});
//# sourceMappingURL=imageKit.js.map
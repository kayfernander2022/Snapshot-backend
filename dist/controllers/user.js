"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
exports.userRouter = router;
router.post('/api/user', async (req, res) => {
    const { username, password } = req.body;
    console.log('creating user');
    const user = user_1.default.create({ username, password });
    return res.status(201).send(user);
});
router.get("/api/users", async (req, res) => {
    const users = await user_1.default.find({});
    res.status(200).send(users);
});
//# sourceMappingURL=user.js.map
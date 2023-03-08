"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRouter = void 0;
const express_1 = __importDefault(require("express"));
const friend_1 = __importDefault(require("../models/friend"));
const router = express_1.default.Router();
exports.friendRouter = router;
router.post('/api/friend', async (req, res) => {
    const { userId, friendId } = req.body;
    console.log('creating friend');
    const friend = friend_1.default.create({ userId, friendId });
    return res.status(201).send(friend);
});
router.get("/api/friend/all", async (req, res) => {
    const friends = await friend_1.default.find({});
    res.status(200).send(friends);
});
//# sourceMappingURL=friend.js.map
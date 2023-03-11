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
    const exists = await friend_1.default.find({ userId: userId, friendId: friendId });
    console.log(exists);
    if (exists.length === 0) {
        const friend = await friend_1.default.create({ userId, friendId });
        return res.status(201).send(friend);
    }
    return res.send();
});
router.get("/api/friends", async (req, res) => {
    const friends = await friend_1.default.find({});
    res.status(200).send(friends);
});
router.get("/api/friends/:userId", async (req, res) => {
    const userId = req.params.userId;
    const friends = await friend_1.default.find({ userId: userId });
    res.send(friends);
});
router.get("/api/friends/addedMe/:friendId", async (req, res) => {
    const friendId = req.params.friendId;
    const friends = await friend_1.default.find({ friendId: friendId });
    res.send(friends);
});
//Delete
router.delete("/api/friends/:friendId", async (req, res) => {
    const friendId = req.params.friendId;
    await friend_1.default.findByIdAndDelete(friendId);
    res.send();
});
//# sourceMappingURL=friend.js.map
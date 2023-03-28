"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRouter = void 0;
const express_1 = __importDefault(require("express"));
const friend_1 = __importDefault(require("../models/friend"));
const user_1 = __importDefault(require("../models/user"));
const sharedTo_1 = __importDefault(require("../models/sharedTo"));
const router = express_1.default.Router();
exports.friendRouter = router;
//Create
router.post('/api/friends', async (req, res) => {
    const { userId, friendId } = req.body;
    console.log('creating friend');
    // Check and see if user and friend exist in the user table.  Required to access the app.
    const userExists = await user_1.default.findById(userId);
    const friendExists = await user_1.default.findById(friendId);
    // If either do not exists then throw a 404 - Not Found error back to the client
    if (!userExists || !friendExists) {
        return res.status(404).send(!userExists ? { error: 'User not found' } : { error: 'Friend not found' }); // Return message of who was not found user or friend
    }
    // Check to see if friend / user relationship already recorded in the friend table.  If it exists we just return 200 - Success to 
    // not create duplicates.  If the relationship does not exist create it for the first time
    const exists = await friend_1.default.find({ userId: userId, friendId: friendId });
    console.log(exists);
    // If none found create record
    if (exists.length === 0) {
        const friend = await friend_1.default.create({ userId, friendId });
        return res.status(201).send(friend);
    }
    // This is only hit if the record already existed and we skip creating to avoid duplicates.
    return res.send();
});
//Index
router.get("/api/friends", async (req, res) => {
    const friends = await friend_1.default.find({});
    res.status(200).send(friends);
});
//Show
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
    // Need to delete from SharedTo so that I do not have orphan records that were created!
    await sharedTo_1.default.deleteMany({ friendId: friendId });
    res.send();
});
//# sourceMappingURL=friend.js.map
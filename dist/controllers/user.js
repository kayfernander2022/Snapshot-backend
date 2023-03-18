"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const friend_1 = __importDefault(require("../models/friend"));
const photo_1 = __importDefault(require("../models/photo"));
const sharedTo_1 = __importDefault(require("../models/sharedTo"));
const router = express_1.default.Router();
exports.userRouter = router;
router.post('/api/users', async (req, res) => {
    const { username, password } = req.body;
    const userNameExists = await user_1.default.findOne({ username: username.toLowerCase() });
    if (userNameExists) {
        return res.status(409).send({ error: 'Username already exists' });
    }
    console.log('creating user');
    const user = await user_1.default.create({ username: username.toLowerCase(), password });
    return res.status(201).send(user);
});
router.get("/api/users", async (req, res) => {
    const users = await user_1.default.find({});
    return res.send(users);
});
//Update
router.put("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await user_1.default.findByIdAndUpdate(userId, req.body, { new: true });
    return res.status(201).send(user);
});
//Delete 
router.delete("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    // Find all of the users photo
    const photos = await photo_1.default.find({ userId: userId });
    // Delete all of the links where the photo was shared to someone by using the photoId
    photos.forEach(async (photo) => {
        await sharedTo_1.default.deleteMany({ photoId: photo.id });
    });
    //Delete all photos belonging to the user
    await photo_1.default.deleteMany({ userId: userId });
    // Delete all of the links where someone made me a friend
    await friend_1.default.deleteMany({ friendId: userId });
    // Delete all of the links where user listed someone as a friend
    await friend_1.default.deleteMany({ userId: userId });
    //Finally delete the user
    await user_1.default.findByIdAndDelete(userId);
    res.send();
});
//Show
router.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    console.log('UserId' + userId);
    try {
        const users = await user_1.default.findById(userId);
        return res.send(users);
    }
    catch (ex) {
        console.log(ex);
    }
});
//# sourceMappingURL=user.js.map
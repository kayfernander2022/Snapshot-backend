"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const friend_1 = __importDefault(require("../models/friend"));
const photo_1 = __importDefault(require("../models/photo"));
const sharedTo_1 = __importDefault(require("../models/sharedTo"));
const { SECRET } = process.env;
const router = express_1.default.Router();
exports.userRouter = router;
router.post('/api/users', async (req, res) => {
    const username = req.body.username;
    const password = await bcryptjs_1.default.hash(req.body.password, 10);
    const userNameExists = await user_1.default.findOne({ username: username.toLowerCase() });
    if (userNameExists) {
        return res.status(409).send({ error: 'Username already exists' });
    }
    try {
        console.log('creating user');
        const user = await user_1.default.create({ username: username.toLowerCase(), password });
        return res.status(201).send(user);
    }
    catch (error) {
        return res.status(400).send(error);
    }
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
router.post("/api/users/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await user_1.default.findOne({ username: username.toLowerCase() });
        if (user) {
            const match = await bcryptjs_1.default.compare(password, user.password);
            if (match) {
                const token = await jsonwebtoken_1.default.sign({ username }, SECRET || ' ');
                console.log(JSON.stringify(user));
                const authUser = { id: user.id, username: user.username, password: user.password, token };
                console.log(JSON.stringify(authUser));
                res.status(200).json(authUser);
            }
            else {
                res.status(400).json({ error: "PASSWORD DOES NOT MATCH" });
            }
        }
        else {
            res.status(400).json({ error: "USER DOES NOT EXIST" });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//# sourceMappingURL=user.js.map
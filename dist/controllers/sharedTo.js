"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedToRouter = void 0;
const express_1 = __importDefault(require("express"));
const sharedTo_1 = __importDefault(require("../models/sharedTo"));
const router = express_1.default.Router();
exports.sharedToRouter = router;
router.post('/api/sharedTo', async (req, res) => {
    const { photoId, friendId } = req.body;
    console.log('creating sharedTo');
    const exists = await sharedTo_1.default.find({ photoId, friendId }); //getting error
    if (exists.length === 0) {
        const sharedTo = await sharedTo_1.default.create({ photoId, friendId });
        return res.status(201).send(sharedTo);
    }
    return res.send();
});
router.get("/api/sharedTos", async (req, res) => {
    const sharedTo = await sharedTo_1.default.find({});
    return res.status(200).send(sharedTo);
});
//Get 
router.get("/api/sharedTo/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    const sharedTos = await sharedTo_1.default.find({ photoId });
    return res.send(sharedTos);
});
router.get("/api/sharedTo/friend/:friendId", async (req, res) => {
    const friendId = req.params.friendId;
    const sharedTos = await sharedTo_1.default.find({ friendId });
    return res.send(sharedTos);
});
//Delete
router.delete("/api/sharedTo/:photoId/friend/:friendId", async (req, res) => {
    const photoId = req.params.photoId;
    const friendId = req.params.friendId;
    await sharedTo_1.default.deleteMany({ photoId, friendId });
    return res.send();
});
//# sourceMappingURL=sharedTo.js.map
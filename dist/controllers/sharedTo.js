"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedToRouter = void 0;
const express_1 = __importDefault(require("express"));
const sharedTo_1 = __importDefault(require("../models/sharedTo"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
exports.sharedToRouter = router;
function convertPhoto(photo, sharedFrom) {
    return {
        id: photo.id,
        caption: photo.caption,
        imageUrl: photo.imageUrl,
        userId: photo.userId,
        sharedFrom: sharedFrom
    };
}
//Create
router.post('/api/sharedTos', async (req, res) => {
    const { photoId, friendIds } = req.body;
    console.log('creating sharedTo'); //test
    friendIds.forEach(async (friendId) => {
        const friendExists = await user_1.default.findById(friendId);
        if (friendExists) {
            const exists = await sharedTo_1.default.find({ photoId, friendId });
            if (exists.length === 0) {
                await sharedTo_1.default.create({ photoId, friendId });
            }
        }
    });
    return res.status(200);
});
//
router.get("/api/sharedTos", async (req, res) => {
    const sharedTo = await sharedTo_1.default.find({});
    return res.status(200).send(sharedTo);
});
//
//Get 
router.get("/api/sharedTos/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    const sharedTos = await sharedTo_1.default.find({ photoId });
    return res.send(sharedTos);
});
//
router.get("/api/sharedTos/friend/:friendId", async (req, res) => {
    const friendId = req.params.friendId;
    const sharedTos = await sharedTo_1.default.find({ friendId }).populate('photoId');
    console.log(JSON.stringify(sharedTos));
    const convertedPhotos = await Promise.all(sharedTos.map(async (sharedTo) => {
        const user = await user_1.default.findById(sharedTo.photoId.userId);
        return convertPhoto(sharedTo.photoId, user?.name || 'shared by anonymous');
    }));
    return res.send(convertedPhotos);
});
//Delete
router.delete("/api/sharedTos/:photoId/friend/:friendId", async (req, res) => {
    const photoId = req.params.photoId;
    const friendId = req.params.friendId;
    await sharedTo_1.default.deleteMany({ photoId, friendId });
    return res.send();
});
//# sourceMappingURL=sharedTo.js.map
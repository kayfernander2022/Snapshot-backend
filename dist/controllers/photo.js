"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRouter = void 0;
const express_1 = __importDefault(require("express"));
const photo_1 = __importDefault(require("../models/photo"));
const sharedTo_1 = __importDefault(require("../models/sharedTo"));
const router = express_1.default.Router();
exports.photoRouter = router;
router.post('/api/photos', async (req, res) => {
    const { imageUrl, caption, userId } = req.body;
    console.log('creating photo');
    const photo = await photo_1.default.create({ imageUrl, caption, userId });
    return res.status(201).send(photo);
});
router.get("/api/photos", async (req, res) => {
    const photos = await photo_1.default.find({});
    res.status(200).send(photos);
});
router.get("/api/photos/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    const tempPhoto = await photo_1.default.findById(photoId);
    if (tempPhoto) {
        const photo = convertPhoto(tempPhoto);
        res.status(200).send(photo);
    }
});
router.get("/api/photos/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const tempPhotos = await photo_1.default.find({ userId: userId });
    const photos = tempPhotos.map((photo) => {
        return convertPhoto(photo);
    });
    res.status(200).send(photos);
});
//Update 
router.put("/api/photos/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photo_1.default.findByIdAndUpdate(photoId, req.body, { new: true });
    return res.status(201).send(photo);
});
//Delete
router.delete("/api/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    await photo_1.default.findByIdAndDelete(photoId);
    //Delete from shared to table so that will not have orphaned records.
    await sharedTo_1.default.deleteMany({ photoId: photoId });
    res.send();
});
function convertPhoto(photo) {
    return { id: photo.id, caption: photo.caption, imageUrl: photo.imageUrl, userId: photo.userId };
}
//# sourceMappingURL=photo.js.map
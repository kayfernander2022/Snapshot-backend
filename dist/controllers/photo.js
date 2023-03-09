"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRouter = void 0;
const express_1 = __importDefault(require("express"));
const photo_1 = __importDefault(require("../models/photo"));
const router = express_1.default.Router();
exports.photoRouter = router;
router.post('/api/photo', async (req, res) => {
    const { imageUrl, caption, userId } = req.body;
    console.log('creating photo');
    const photo = photo_1.default.create({ imageUrl, caption, userId });
    return res.status(201).send(photo);
});
router.get("/api/photos", async (req, res) => {
    const photos = await photo_1.default.find({});
    res.status(200).send(photos);
});
//# sourceMappingURL=photo.js.map
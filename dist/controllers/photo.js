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
// function to convert the IPhoto object from the database to an object that the client expects.
// Strips away all of the Mongoose document properties not needed.
function convertPhoto(photo) {
    return {
        id: photo.id,
        caption: photo.caption,
        imageUrl: photo.imageUrl,
        userId: photo.userId,
        imageName: photo.imageName
    };
}
// Create 
//single photo.
router.post('/api/photos', async (req, res) => {
    const { imageUrl, caption, userId, imageName } = req.body;
    console.log('creating photo');
    const photo = await photo_1.default.create({ imageUrl, caption, userId, imageName });
    const convertedPhoto = convertPhoto(photo);
    return res.status(201).send(convertedPhoto);
});
// Show
// return single photo
router.get("/api/photos/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    const tempPhoto = await photo_1.default.findById(photoId);
    if (tempPhoto) {
        const photo = convertPhoto(tempPhoto);
        res.status(200).send(photo);
    }
});
//Index
// return all photos belonging to the user
router.get("/api/photos/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const tempPhotos = await photo_1.default.find({ userId: userId }); //get photos back from db as Iphoto
    //map an create a new object to solve problem. Data was coming back in dif format then what was needed.(too much)
    const photos = tempPhotos.map((photo) => {
        return convertPhoto(photo); //return new object
    });
    res.status(200).send(photos);
});
//Update 
//update a single photo
router.put("/api/photos/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photo_1.default.findByIdAndUpdate(photoId, req.body, { new: true });
    if (photo) {
        const convertedPhoto = convertPhoto(photo);
        return res.status(201).send(convertedPhoto);
    }
    return res.status(200);
});
//Delete 
//delete a single photo
router.delete("/api/:photoId", async (req, res) => {
    const photoId = req.params.photoId;
    await photo_1.default.findByIdAndDelete(photoId);
    //Delete from shared to table so that will not have orphaned records.
    await sharedTo_1.default.deleteMany({ photoId: photoId });
    res.send();
});
//# sourceMappingURL=photo.js.map
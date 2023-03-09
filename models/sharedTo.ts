import mongoose, { ObjectId, Schema } from "mongoose";

interface ISharedTo extends mongoose.Document {
  photoId: ObjectId,
  friendId: ObjectId
}

const sharedToSchema = new mongoose.Schema({
  photoId: {type: Schema.Types.ObjectId, required: true, ref: "Photo"},
  friendId: {type: Schema.Types.ObjectId, required: true, ref: "Friend"}
})

const SharedTo = mongoose.model<ISharedTo>('SharedTo', sharedToSchema);

export default SharedTo;
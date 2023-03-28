import mongoose, { ObjectId, Schema } from "mongoose";
import { IPhoto } from "./photo";

//Interface = contract that defines the properties and datatypes required
export interface ISharedTo extends mongoose.Document {
  photoId: IPhoto,
  friendId: ObjectId
}

const sharedToSchema = new mongoose.Schema({
  photoId: {type: Schema.Types.ObjectId, required: true, ref: "Photo"},
  friendId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

const SharedTo = mongoose.model<ISharedTo>('SharedTo', sharedToSchema);

export default SharedTo;
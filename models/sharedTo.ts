import mongoose, { ObjectId, Schema } from "mongoose";


//Interface = contract that defines the properties and datatypes required
interface ISharedTo extends mongoose.Document {
  photoId: ObjectId,
  friendId: ObjectId
}

const sharedToSchema = new mongoose.Schema({
  photoId: {type: Schema.Types.ObjectId, required: true, ref: "Photo"},
  friendId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

const SharedTo = mongoose.model<ISharedTo>('SharedTo', sharedToSchema);

export default SharedTo;
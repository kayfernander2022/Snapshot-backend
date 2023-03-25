import mongoose, { ObjectId, Schema } from "mongoose";


//Interface = contract that defines the properties and datatypes required
export interface IPhoto {
  id: ObjectId;
  imageUrl: string;
  caption: string;
  userId: ObjectId
}

const photoSchema = new mongoose.Schema({
  imageUrl: {type: String, required: true},
  caption: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

const Photo = mongoose.model<IPhoto>('Photo', photoSchema);

export default Photo;
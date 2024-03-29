import mongoose, { ObjectId, Schema } from "mongoose";


//Interface = contract that defines the properties and datatypes required
interface IFriend extends mongoose.Document {
  userId: ObjectId,
  friendId: ObjectId
}

//schema
const FriendSchema = new mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, required: true, ref: "User"},
  friendId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

const Friend = mongoose.model<IFriend>('Friend', FriendSchema);

export default Friend;
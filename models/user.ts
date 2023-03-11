import mongoose from "mongoose";


//Interface = contract that defines the properties and datatypes required
export interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

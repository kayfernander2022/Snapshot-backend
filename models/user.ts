import mongoose from "mongoose";

interface IUser{
  username: string;
  password: string;
}
interface IUserModel extends mongoose.Model<any>{
  build(attr: IUser): IUserDoc;
}

interface IUserDoc extends mongoose.Document {
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
})

const User = mongoose.model<any, IUserModel>('User', UserSchema);

UserSchema.statics.build = (attr: IUser) =>{
  return new User(attr);
}

export default User

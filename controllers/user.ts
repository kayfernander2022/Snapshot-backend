import express, {Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user'
import Friend from '../models/friend';
import Photo from '../models/photo';
import SharedTo from '../models/sharedTo';

const {SECRET} = process.env;
const router = express.Router();


//Create
router.post('/api/users', async(req: Request, res: Response) =>{
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);
  const name = req.body.name;

  const userNameExists = await User.findOne({username: username.toLowerCase()});

  if(userNameExists){
    return res.status(409).send({error: 'Username already exists'})
  }

  try{
    console.log('creating user');

    const user = await User.create({ username: username.toLowerCase(), password, name});
  
    return res.status(201).send(user);
  }
  catch(error){
    return res.status(400).send(error);
  }
  
});


// index
router.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.find({});

  const transformUsers = users.map((user) => {
    return {id: user.id, name: user.name};
  })

  return res.send(transformUsers);
})



//
router.post("/api/users/login",async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body
    const user = await User.findOne({username: username.toLowerCase()});

    if (user) {
        const match = await bcrypt.compare(password, user.password)

        if (match) {
            const token = await jwt.sign({username}, SECRET || ' ');
            console.log(JSON.stringify(user))
            const authUser = {id: user.id, username: user.username, password:user.password, token};
            console.log(JSON.stringify(authUser))
            res.status(200).json(authUser)
        } else {
            res.status(400).json({error: "PASSWORD DOES NOT MATCH"})
        }
    } else {
        res.status(400).json({error: "USER DOES NOT EXIST"})
    }
}
catch(error) {
    res.status(400).json({error})
}
})


//Show
router.get("/api/users/:userId", async (req: Request, res: Response) =>{
  const userId = req.params.userId;

  console.log('UserId' + userId);

  try{

  const users = await User.findById(userId);

  return res.send(users);
  }
  catch(ex){
    console.log(ex);
  }
})


//Update
router.put("/api/users/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findByIdAndUpdate(userId, req.body, {new: true});

  return res.status(201).send(user);
})


//Delete 
//delete a user
router.delete("/api/users/:userId", async (req: Request, res: Response) =>{
  const userId = req.params.userId;

  // Find all of the users photo
  const photos = await Photo.find({userId: userId});

  // Delete all of the links where the photo was shared to someone by using the photoId
  photos.forEach(async (photo) => {
    await SharedTo.deleteMany({photoId: photo.id});
  })

  //Delete all photos belonging to the user
  await Photo.deleteMany({userId: userId});

  // Delete all of the links where someone made me a friend
  await Friend.deleteMany({friendId: userId});

  // Delete all of the links where user listed someone as a friend
  await Friend.deleteMany({userId: userId});

  //Finally delete the user
  await User.findByIdAndDelete(userId)

  res.send();
})



export { router as userRouter }
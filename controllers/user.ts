import express, {Request, Response } from 'express'
import User from '../models/user'
import Friend from '../models/friend';
import Photo from '../models/photo';
import SharedTo from '../models/sharedTo';

const router = express.Router();

router.post('/api/users', async(req: Request, res: Response) =>{
  const { username, password } = req.body;

  const userNameExists = await User.findOne({username: username.toLowerCase()});

  if(userNameExists){
    return res.status(409).send({error: 'Username already exists'})
  }

  console.log('creating user');
  const user = await User.create({ username: username.toLowerCase(), password});
 
  return res.status(201).send(user);
});



router.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.find({});

  return res.send(users);
})

//Update
router.put("/api/users/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findByIdAndUpdate(userId, req.body, {new: true});

  return res.status(201).send(user);
})

//Delete 
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

export { router as userRouter }
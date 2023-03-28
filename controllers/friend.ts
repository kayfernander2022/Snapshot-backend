import express, {Request, Response } from 'express'
import Friend from '../models/friend'
import User from '../models/user';
import SharedTo from '../models/sharedTo';

const router = express.Router();

//Create
router.post('/api/friends', async(req: Request, res: Response) =>{
  const { userId, friendId } = req.body;
  console.log('creating friend');

  // Check and see if user and friend exist in the user table.  Required to access the app.
  const userExists = await User.findById(userId);
  const friendExists = await User.findById(friendId);

  // If either do not exists then throw a 404 - Not Found error back to the client
  if(!userExists || !friendExists){
    return res.status(404).send(!userExists ? {error:'User not found'} : {error: 'Friend not found'});  // Return message of who was not found user or friend
  }

  // Check to see if friend / user relationship already recorded in the friend table.  If it exists we just return 200 - Success to 
  // not create duplicates.  If the relationship does not exist create it for the first time
  const exists = await Friend.find({userId: userId, friendId: friendId});
  console.log(exists);

  // If none found create record
  if(exists.length === 0)
  {
    const friend = await Friend.create({ userId, friendId});
    return res.status(201).send(friend);
  }

  // This is only hit if the record already existed and we skip creating to avoid duplicates.
  return res.send();
});


//Index
router.get("/api/friends", async (req: Request, res: Response) => {
  const friends = await Friend.find({});
  res.status(200).send(friends);
})

//Show
router.get("/api/friends/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const friends = await Friend.find({userId: userId});
  res.send(friends);
})


router.get("/api/friends/addedMe/:friendId", async (req: Request, res: Response) => {
  const friendId = req.params.friendId;
  const friends = await Friend.find({friendId: friendId});
  res.send(friends);
})


//Delete
router.delete("/api/friends/:friendId", async (req: Request, res: Response) =>{
  const friendId = req.params.friendId;
  await Friend.findByIdAndDelete(friendId);

  // Need to delete from SharedTo so that I do not have orphan records that were created!
  await SharedTo.deleteMany({friendId: friendId});
  res.send();
})



export { router as friendRouter }
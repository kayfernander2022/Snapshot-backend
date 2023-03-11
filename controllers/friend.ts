import express, {Request, Response } from 'express'
import Friend from '../models/friend'

const router = express.Router();

router.post('/api/friend', async(req: Request, res: Response) =>{
  const { userId, friendId } = req.body;
  console.log('creating friend');
  const exists = await Friend.find({userId: userId, friendId: friendId});
  console.log(exists);

  if(exists.length === 0)
  {
    const friend = await Friend.create({ userId, friendId});
    return res.status(201).send(friend);
  }

  return res.send();
});

router.get("/api/friends", async (req: Request, res: Response) => {
  const friends = await Friend.find({});

  res.status(200).send(friends);
})

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

  res.send();
})



export { router as friendRouter }
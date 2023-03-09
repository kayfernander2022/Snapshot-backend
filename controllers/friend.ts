import express, {Request, Response } from 'express'
import Friend from '../models/friend'

const router = express.Router();




router.post('/api/friend', async(req: Request, res: Response) =>{
  const { userId, friendId } = req.body;
  console.log('creating friend');
  const friend = Friend.create({ userId, friendId});
 
  return res.status(201).send(friend);
});



router.get("/api/friends", async (req: Request, res: Response) => {
  const friends = await Friend.find({});

  res.status(200).send(friends);
})

export { router as friendRouter }
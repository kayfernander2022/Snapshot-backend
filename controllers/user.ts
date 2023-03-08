import express, {Request, Response } from 'express'
import User from '../models/user'

const router = express.Router();

router.post('/api/user', async(req: Request, res: Response) =>{
  const { username, password } = req.body;
  console.log('creating user');
  const user = User.create({ username, password});
 
  return res.status(201).send(user);
});



router.get("/api/user/all", async (req: Request, res: Response) => {
  const users = await User.find({});

  res.status(200).send(users);
})

export { router as userRouter }
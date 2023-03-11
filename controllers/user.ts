import express, {Request, Response } from 'express'
import User from '../models/user'

const router = express.Router();

router.post('/api/user', async(req: Request, res: Response) =>{
  const { username, password } = req.body;
  console.log('creating user');
  const user = await User.create({ username, password});
 
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

  await User.findByIdAndDelete(userId)

  res.send();
})

//Show
router.get("/api/users/:userId", async (req: Request, res: Response) =>{
  const userId = req.params.userId;

  const users = await User.findById(userId);

  return res.send(users);
})

export { router as userRouter }
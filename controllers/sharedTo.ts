import express, {Request, Response } from 'express'
import SharedTo from '../models/sharedTo'

const router = express.Router();

router.post('/api/sharedTo', async (req: Request, res: Response) =>{
  const { photoId, friendId } = req.body;
  console.log('creating sharedTo');

  const exists = await SharedTo.find({photoId, friendId});//getting error

  if(exists.length === 0)
  {
  const sharedTo = await SharedTo.create({ photoId, friendId});
  return res.status(201).send(sharedTo);
  }

  return res.send();
});

router.get("/api/sharedTos", async (req: Request, res: Response) => {
  const sharedTo = await SharedTo.find({});

  return res.status(200).send(sharedTo);
})

//Get 
router.get("/api/sharedTo/:photoId", async (req: Request, res: Response) => {//all people photo was shared to
  const photoId = req.params.photoId;

  const sharedTos = await SharedTo.find({photoId});

  return res.send(sharedTos);
})

router.get("/api/sharedTo/friend/:friendId", async (req: Request, res: Response) => {//all people photo was shared to
  const friendId = req.params.friendId;

  const sharedTos = await SharedTo.find({friendId});

  return res.send(sharedTos);
})

//Delete
router.delete("/api/sharedTo/:photoId/friend/:friendId", async (req: Request, res: Response) => {
  const photoId = req.params.photoId;
  const friendId = req.params.friendId;

  await SharedTo.deleteMany({photoId, friendId});

  return res.send();
})



export { router as sharedToRouter }
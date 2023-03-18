import express, {Request, Response } from 'express'
import Friend from '../models/friend';
import SharedTo from '../models/sharedTo'
import User from '../models/user'

const router = express.Router();

router.post('/api/sharedTos', async (req: Request, res: Response) =>{
  const { userId, photoId, friendId } = req.body;
  console.log('creating sharedTo');

  const friendRelationship = await Friend.findById(friendId);

  console.log(friendRelationship);

  const friendExists = await User.findById(friendRelationship?.friendId);

  if(!friendExists){
    return res.status(404).send({error: 'Friend does not exists'});
  }

  const exists = await SharedTo.find({photoId, friendId});

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
router.get("/api/sharedTos/:photoId", async (req: Request, res: Response) => {//all people photo was shared to
  const photoId = req.params.photoId;

  const sharedTos = await SharedTo.find({photoId});

  return res.send(sharedTos);
})

router.get("/api/sharedTos/friend/:friendId", async (req: Request, res: Response) => {//all people photo was shared to
  const friendId = req.params.friendId;

  const sharedTos = await SharedTo.find({friendId});

  return res.send(sharedTos);
})

//Delete
router.delete("/api/sharedTos/:photoId/friend/:friendId", async (req: Request, res: Response) => {
  const photoId = req.params.photoId;
  const friendId = req.params.friendId;

  await SharedTo.deleteMany({photoId, friendId});

  return res.send();
})



export { router as sharedToRouter }
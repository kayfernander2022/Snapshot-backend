import express, {Request, Response } from 'express'
import SharedTo from '../models/sharedTo'

const router = express.Router();




router.post('/api/sharedTo', async(req: Request, res: Response) =>{
  const { photoId, sharedId } = req.body;
  console.log('creating sharedTo');
  const sharedTo = SharedTo.create({ photoId, sharedId});
 
  return res.status(201).send(sharedTo);
});



router.get("/api/sharedTos", async (req: Request, res: Response) => {
  const sharedTo = await SharedTo.find({});

  res.status(200).send(sharedTo);
})

export { router as sharedToRouter }
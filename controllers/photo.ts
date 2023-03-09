import express, {Request, Response } from 'express'
import Photo from '../models/photo'

const router = express.Router();

router.post('/api/photo', async(req: Request, res: Response) =>{
  const { imageUrl, caption, userId } = req.body;
  console.log('creating photo');
  const photo = Photo.create({ imageUrl, caption, userId});
 
  return res.status(201).send(photo);
});



router.get("/api/photos", async (req: Request, res: Response) => {
  const photos = await Photo.find({});

  res.status(200).send(photos);
})

export { router as photoRouter }
import express, {Request, Response } from 'express'
import Photo from '../models/photo'
import SharedTo from '../models/sharedTo';

const router = express.Router();

router.post('/api/photos', async(req: Request, res: Response) =>{
  const { imageUrl, caption, userId } = req.body;
  console.log('creating photo');
  const photo = await Photo.create({ imageUrl, caption, userId});
 
  return res.status(201).send(photo);
});

router.get("/api/photos", async (req: Request, res: Response) => {
  const photos = await Photo.find({});

  res.status(200).send(photos);
})

router.get("/api/photos/:photoId", async (req: Request, res: Response) => {
  const photoId = req.params.photoId;

  const photos = await Photo.findById(photoId);

  res.status(200).send(photos);
})

router.get("/api/photos/user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const photos = await Photo.find({userId: userId});

  res.status(200).send(photos);
})

//Update 
router.put("/api/photos/:photoId", async (req: Request, res: Response)=>{
  const photoId = req.params.photoId;

  const photo = await Photo.findByIdAndUpdate(photoId, req.body, {new: true});

  return res.status(201).send(photo);
})


//Delete
router.delete("/api/:photoId", async (req: Request, res: Response) =>{
  const photoId: string = req.params.photoId
  
  await Photo.findByIdAndDelete(photoId)
  
  //Delete from shared to table so that will not have orphaned records.
  await SharedTo.deleteMany({photoId: photoId});

  res.send()
  })


export { router as photoRouter }

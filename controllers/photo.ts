import express, {Request, Response } from 'express'
import Photo, {IPhoto} from '../models/photo'
import SharedTo from '../models/sharedTo';
import { ObjectId } from 'mongoose';

const router = express.Router();


interface IConvertedPhoto{
  id: ObjectId,
  caption: string,
  imageUrl: string,
  userId: ObjectId,
  imageName: string
}

// function to convert the IPhoto object from the database to an object that the client expects.
// Strips away all of the Mongoose document properties not needed.
//
function convertPhoto(photo:IPhoto): IConvertedPhoto{
  return {
          id: photo.id, 
          caption: photo.caption,
          imageUrl: photo.imageUrl, 
          userId: photo.userId,
          imageName: photo.imageName 
        }
}

// Create 
//single photo.
router.post('/api/photos', async(req: Request, res: Response) =>{
  const { imageUrl, caption, userId, imageName } = req.body;
  console.log('creating photo');
  const photo = await Photo.create({ imageUrl, caption, userId, imageName});
 
  const convertedPhoto = convertPhoto(photo);

  return res.status(201).send(convertedPhoto);
});

// Show
// return single photo
router.get("/api/photos/:photoId", async (req: Request, res: Response) => {
  const photoId = req.params.photoId;

  const tempPhoto = await Photo.findById(photoId);

  if(tempPhoto)
  {
    const photo = convertPhoto(tempPhoto);

    res.status(200).send(photo);
  }
})

//Index
// return all photos belonging to the user
router.get("/api/photos/user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const tempPhotos = await Photo.find({userId: userId}) as IPhoto[];//get photos back from db as Iphoto

  const photos = tempPhotos.map((photo) => {//map an create a new object to solve problem. Data was coming back in dif format then what was needed.(too much)
    return convertPhoto(photo); //return new object
  })

  res.status(200).send(photos);
})

//Update 
//update a single photo
router.put("/api/photos/:photoId", async (req: Request, res: Response)=>{
  const photoId = req.params.photoId;

  const photo = await Photo.findByIdAndUpdate(photoId, req.body, {new: true});

  if(photo)
  {
    const convertedPhoto = convertPhoto(photo);

    return res.status(201).send(convertedPhoto);
  }

  return res.status(200);
})


//Delete 
//delete a single photo
router.delete("/api/:photoId", async (req: Request, res: Response) =>{
  const photoId: string = req.params.photoId
  
  await Photo.findByIdAndDelete(photoId)
  
  //Delete from shared to table so that will not have orphaned records.
  await SharedTo.deleteMany({photoId: photoId});

  res.send()
  })




export { router as photoRouter }

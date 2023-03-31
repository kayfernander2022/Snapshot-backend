import express, {Request, Response } from 'express'
import SharedTo from '../models/sharedTo'
import User from '../models/user'
import { IPhoto } from '../models/photo';
import { ObjectId } from 'mongoose';

const router = express.Router();


interface IConvertedPhoto{
  id: ObjectId,
  caption: string,
  imageUrl: string,
  userId: ObjectId,
  sharedFrom: string
}


function convertPhoto(photo:IPhoto, sharedFrom: string): IConvertedPhoto{
  return {
    id: photo.id, 
    caption: photo.caption, 
    imageUrl: photo.imageUrl, 
    userId: photo.userId, 
    sharedFrom: sharedFrom
  }
}



//Create
router.post('/api/sharedTos', async (req: Request, res: Response) =>{
  const { photoId, friendIds } = req.body as {photoId: string, friendIds: string[]};
  console.log('creating sharedTo');

  friendIds.forEach(async (friendId) => {

  const friendExists = await User.findById(friendId);

    if(friendExists){
      const exists = await SharedTo.find({photoId, friendId});
      if(exists.length === 0)
      {
        await SharedTo.create({ photoId, friendId});
      }
    }
  })

  return res.status(200);
});


//
router.get("/api/sharedTos", async (req: Request, res: Response) => {
  const sharedTo = await SharedTo.find({});

  return res.status(200).send(sharedTo);
})


//
//Get 
router.get("/api/sharedTos/:photoId", async (req: Request, res: Response) => {//all people photo was shared to 
  const photoId = req.params.photoId;

  const sharedTos = await SharedTo.find({photoId});

  return res.send(sharedTos);
})


//
router.get("/api/sharedTos/friend/:friendId", async (req: Request, res: Response) => {//all people photo was shared to
  const friendId = req.params.friendId;

  const sharedTos = await SharedTo.find({friendId}).populate('photoId');

  console.log(JSON.stringify(sharedTos));
  
  const convertedPhotos: IConvertedPhoto[] =  await Promise.all(//wait for all promises to be returned
    sharedTos.map(async (sharedTo) => {
      const user = await User.findById(sharedTo.photoId.userId);//db call to get user info

      return convertPhoto(sharedTo.photoId, user?.name || 'shared by anonymous');
    }));

  return res.send(convertedPhotos);
})

//Delete
router.delete("/api/sharedTos/:photoId/friend/:friendId", async (req: Request, res: Response) => {
  const photoId = req.params.photoId;
  const friendId = req.params.friendId;

  await SharedTo.deleteMany({photoId, friendId});

  return res.send();
})



export { router as sharedToRouter }
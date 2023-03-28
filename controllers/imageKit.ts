import * as dotenv from 'dotenv';
import ImageKit from 'imagekit';
import express, {Request, Response } from 'express'

dotenv.config();

const router = express.Router();

const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY || '';


//client request for token
router.get("/api/imagekit-auth", async (req: Request, res: Response) => {
  
  const imageKit = new ImageKit({publicKey: 'public_33FjszinEBzlgrIz8+HbC3JVASM=', privateKey:IMAGEKIT_KEY, urlEndpoint:'https://ik.imagekit.io/jfpi8d5c5/capstone/'});

  const authParams = imageKit.getAuthenticationParameters();

  res.status(200).send(authParams);
})

export { router as imageKitRouter }

//getting token back for imagekit. 
//private key used to authenticate public key/client key and generate token. The clients upload is requesting token needed for image kit to store photo.






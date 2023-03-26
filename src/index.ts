import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {userRouter} from '../controllers/user';
import {friendRouter} from '../controllers/friend';
import {photoRouter} from '../controllers/photo';
import {sharedToRouter} from '../controllers/sharedTo';
import {imageKitRouter} from '../controllers/imageKit';

import StartMongoose from '../models/connection';
const { PORT: number = 3000, DATABASE_URL } = process.env;

/////////////////////////
// DEPENDENCIES
/////////////////////////

/////////////////////////
// The Application Object
/////////////////////////
const app: Application = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRouter);
app.use(friendRouter);
app.use(photoRouter);
app.use(sharedToRouter);
app.use(imageKitRouter);

/////////////////////////
// Routes
/////////////////////////

// home route that says "hello world" to test server is working
app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World")
  //res.json let's us send a response as JSON data
  res.json({response: "Hello World 3"})
});

StartMongoose();
/////////////////////////
// Listener
/////////////////////////
//const port = process.env.PORT || 3000;

app.listen(4040, () => console.log("Listening on port 4040"))
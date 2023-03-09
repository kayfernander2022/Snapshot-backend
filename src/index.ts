
import express from 'express';
// import cors from 'cors';
import morgan from 'morgan'
import mongoose from 'mongoose';
import {userRouter} from '../controllers/user';
import {friendRouter} from '../controllers/friend';
import {photoRouter} from '../controllers/photo';
import StartMongoose from '../models/connection';
const { PORT = 3000, DATABASE_URL } = process.env
/////////////////////////
// DEPENDENCIES
/////////////////////////
//const express = require("express")  //typescript uses ES Module System

/////////////////////////
// The Application Object
/////////////////////////
const app = express();
// app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRouter);
app.use(friendRouter);
app.use(photoRouter);




/////////////////////////
// Routes
/////////////////////////

// home route that says "hello world" to test server is working
app.get("/", (req, res) => {
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
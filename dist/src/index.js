"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////////
// DEPENDENCIES
/////////////////////////
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = require("../controllers/user");
const friend_1 = require("../controllers/friend");
const photo_1 = require("../controllers/photo");
const sharedTo_1 = require("../controllers/sharedTo");
const imageKit_1 = require("../controllers/imageKit");
const connection_1 = __importDefault(require("../models/connection"));
const { PORT: number = 3000, DATABASE_URL } = process.env;
/////////////////////////
// The Application Object / middleware / routers
/////////////////////////
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(user_1.userRouter);
app.use(friend_1.friendRouter);
app.use(photo_1.photoRouter);
app.use(sharedTo_1.sharedToRouter);
app.use(imageKit_1.imageKitRouter);
/////////////////////////
// Routes
/////////////////////////
// home route that says "hello world" to test server is working
app.get("/", (req, res) => {
    //res.send("Hello World")
    //res.json let's us send a response as JSON data
    res.json({ response: "Hello World 3" });
});
(0, connection_1.default)();
/////////////////////////
// Listener
/////////////////////////
app.listen(4040, () => console.log("Listening on port 4040"));
//# sourceMappingURL=index.js.map
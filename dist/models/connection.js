"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Dependencies
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
//connect to DB // Database Connection
const connectionOptions = {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
};
// Export the Connection
function StartMongoose() {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(DATABASE_URL || '');
    mongoose_1.default.connection
        .on("open", () => console.log("You are connected to mongoose"))
        .on("close", () => console.log("You are disconnected from mongoose"))
        .on("error", (error) => console.log(error));
}
exports.default = StartMongoose;
//# sourceMappingURL=connection.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose_1.default.model('User', UserSchema);
UserSchema.statics.build = (attr) => {
    return new User(attr);
};
exports.default = User;
//# sourceMappingURL=user.js.map
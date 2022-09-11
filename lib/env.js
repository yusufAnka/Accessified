"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URI = exports.JWT_SECRET = exports.saltRounds = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.saltRounds = process.env.saltRounds;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.DATABASE_URI = process.env.DATABASE_URI;
//# sourceMappingURL=env.js.map
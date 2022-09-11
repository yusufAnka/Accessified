"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils/utils");
const filePath = path_1.default.resolve(__dirname, '../model/user.json');
const createUser = (data) => {
    const userList = JSON.parse((0, utils_1.readData)(filePath));
    let userExist = userList.find((user) => user.email === data.email);
    if (userExist) {
        throw new Error('User Already Exist');
    }
    data.id = userList.length + 1;
};
exports.createUser = createUser;
//# sourceMappingURL=adminServices.js.map
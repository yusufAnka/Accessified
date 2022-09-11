"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = exports.readData = void 0;
const fs_1 = __importDefault(require("fs"));
const readData = (filePath) => {
    try {
        let data = fs_1.default.readFile(filePath, 'utf8', (err, data) => {
            return data;
        });
    }
    catch (_a) {
        fs_1.default.writeFile(filePath, '[]', (err) => {
            if (err) {
                return err;
            }
        });
        let data = fs_1.default.readFile(filePath, 'utf8', (err, data) => {
            return data;
        });
    }
};
exports.readData = readData;
const writeData = (filePath, data) => {
    try {
        fs_1.default.writeFile(filePath, data, (err) => {
            if (err) {
                return err;
            }
        });
    }
    catch (err) {
        return err;
    }
};
exports.writeData = writeData;
//# sourceMappingURL=utils.js.map
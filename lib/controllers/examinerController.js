"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbout = exports.getExaminer = exports.getStudent = exports.getRegisterUser = exports.logoutUserController = exports.loginUserController = exports.createUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("../model/schema");
const userService_1 = require("../middleware/userService");
// import { signInWithGooglePopup } from '../utils/firebase.utils';
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userExist = yield (0, userService_1.checkUser)(req.body);
        if (userExist.length > 0) {
            throw new Error('User already exists');
        }
        const User = mongoose_1.default.model('User', schema_1.userSchema);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password
        });
        const result = yield newUser.save();
        console.log(result);
        res.render('createdUser', { user: newUser });
    }
    catch (error) {
        res.render('error', { error: error });
    }
});
exports.createUser = createUser;
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_1.loginFunction)(req.body);
    if (user) {
        res.cookie('token', user.token);
        res.cookie('role', user.role);
        res.cookie('id', user.id);
        res.cookie('count', 1);
        if (user.role === 'examiner') {
            res.render('examinerDashboard', { user: user, count: 1 });
        }
        if (user.role === 'student') {
            res.render('studentDashboard', { user: user, count: 1 });
        }
    }
});
exports.loginUserController = loginUserController;
//logout controller
const logoutUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', '');
    res.cookie('role', '');
    res.cookie('id', '');
    res.render('login');
});
exports.logoutUserController = logoutUserController;
const getRegisterUser = (req, res, next) => {
    res.render('createUser');
};
exports.getRegisterUser = getRegisterUser;
const getStudent = (req, res, next) => {
    res.render('student');
};
exports.getStudent = getStudent;
const getExaminer = (req, res, next) => {
    res.render('examiner');
};
exports.getExaminer = getExaminer;
const getAbout = (req, res, next) => {
    res.render('about');
};
exports.getAbout = getAbout;
//# sourceMappingURL=examinerController.js.map
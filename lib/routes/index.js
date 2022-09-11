"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//var express = require('express');
const express_1 = __importDefault(require("express"));
const examController_1 = require("../controllers/examController");
const examinerController_1 = require("../controllers/examinerController");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
//route landing page
router.get('/home', examController_1.getLanding);
router.get('/examiner', examinerController_1.getExaminer);
router.get('/student', examinerController_1.getStudent);
router.get('/about', examinerController_1.getAbout);
exports.default = router;
//# sourceMappingURL=index.js.map
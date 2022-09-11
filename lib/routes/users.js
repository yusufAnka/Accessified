"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//var express = require('express');
const router = express_1.default.Router();
const examinerController_1 = require("../controllers/examinerController");
const validator_1 = require("../middleware/validator");
const examController_1 = require("../controllers/examController");
const resultController_1 = require("../controllers/resultController");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//Registration
router.get('/register', examinerController_1.getRegisterUser);
router.post('/createUser', validator_1.validateNewUser, examinerController_1.createUser);
//login
router.get('/login', examController_1.getLoginPage);
router.post('/login', examinerController_1.loginUserController);
//logout
router.get('/logout', examinerController_1.logoutUserController);
//Examinations---Examiner
router.get('/setExam', validator_1.validateExaminer, examController_1.getExamPage);
router.get('/setAlgorithm', validator_1.validateExaminer, examController_1.getAlgorithmPage);
router.post('/setExam', validator_1.validateExaminer, examController_1.createExamController);
router.post('/setAlgorithm', validator_1.validateExaminer, examController_1.createAlgorithmController);
router.get('/markExam', validator_1.validateExaminer, resultController_1.getMarkExam);
router.post('/markExam', validator_1.validateExaminer, resultController_1.getExamAnswersController);
router.get('/markExam/:studentId', validator_1.validateExaminer, resultController_1.getExamAnswersControllerById);
router.post('/markExam/:examinerId/:studentId/:examName/:examId/:studentName', validator_1.validateExaminer, resultController_1.gradeExamController, resultController_1.updateAnswersController);
//Examinations---Student
router.get('/selectAlgorithm', validator_1.validateStudent, examController_1.getSelectAlgorithmPage); //should return a form requesting algorithm name
router.post('/algorithm', validator_1.validateStudent, examController_1.setAlgorithmController);
router.post("/submitAlgoResult", examController_1.submitAlgoResult);
router.get('/selectExam', validator_1.validateStudent, examController_1.getSelectExamPage); //should return a form requesting algorithm name
router.post('/exam', validator_1.validateStudent, examController_1.setExamController);
router.post('/submitExam', validator_1.validateStudent, examController_1.submitExamController);
router.get('/viewGrade', validator_1.validateStudent, resultController_1.getGradePage);
router.post('/grade', resultController_1.checkResultController);
exports.default = router;
//# sourceMappingURL=users.js.map
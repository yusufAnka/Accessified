import express, {NextFunction, Request, Response } from 'express';
//var express = require('express');
const router = express.Router();
import {createUser, getRegisterUser, loginUserController, logoutUserController} from "../controllers/examinerController"
import {validateNewUser, validateExaminer, validateStudent} from "../middleware/validator"

import {createExamController, getLoginPage, getExamPage, getAlgorithmPage, createAlgorithmController, getLanding, setAlgorithmController, getSelectAlgorithmPage, getSelectExamPage, setExamController, submitExamController, submitAlgoResult} from "../controllers/examController"

import {getMarkExam, getExamAnswersController, getExamAnswersControllerById, gradeExamController, updateAnswersController, getGradePage, checkResultController } from "../controllers/resultController"


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Registration
router.get('/register', getRegisterUser)
router.post('/createUser', validateNewUser, createUser);

//login
router.get('/login', getLoginPage)
router.post('/login', loginUserController);

//logout
router.get('/logout', logoutUserController)


//Examinations---Examiner
router.get('/setExam', validateExaminer, getExamPage);
router.get('/setAlgorithm', validateExaminer, getAlgorithmPage); 
router.post('/setExam', validateExaminer, createExamController);
router.post('/setAlgorithm', validateExaminer, createAlgorithmController); 
router.get('/markExam', validateExaminer, getMarkExam);
router.post('/markExam', validateExaminer, getExamAnswersController);
router.get('/markExam/:studentId', validateExaminer, getExamAnswersControllerById);
router.post('/markExam/:examinerId/:studentId/:examName/:examId/:studentName', validateExaminer, gradeExamController, updateAnswersController);

//Examinations---Student
router.get('/selectAlgorithm', validateStudent, getSelectAlgorithmPage); //should return a form requesting algorithm name
router.post('/algorithm', validateStudent, setAlgorithmController);
router.post("/submitAlgoResult", submitAlgoResult)
router.get('/selectExam', validateStudent, getSelectExamPage); //should return a form requesting algorithm name
router.post('/exam', validateStudent, setExamController);
router.post('/submitExam', validateStudent, submitExamController);
router.get('/viewGrade', validateStudent, getGradePage);
router.post('/grade', checkResultController);
export default router;


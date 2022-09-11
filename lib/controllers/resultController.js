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
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewResultController = exports.getGradePage = exports.checkResultController = exports.updateAnswersController = exports.gradeExamController = exports.getMarkExam = exports.getExamAnswersControllerById = exports.getExamAnswersController = void 0;
const schema_1 = require("../model/schema");
const userService_1 = require("../middleware/userService");
const getExamAnswersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const examSetterArr = yield (0, userService_1.checkExamById)(req.body.examId);
        if (examSetterArr.length < 1) {
            throw new Error('Exam Records not Found');
        }
        let examSetter = examSetterArr[0];
        if (examSetter.examiner !== req.cookies.id) {
            throw new Error("You dont have permission to grade this examination");
        }
        const answers = yield (0, userService_1.getExamAnswers)(req.body.examId);
        if (answers.length === 0) {
            console.log(answers);
            throw new Error('There are no ungraded entries for this exam');
        }
        res.cookie('examId', req.body.examId);
        console.log(answers);
        res.render('answerList', { students: answers });
    }
    catch (error) {
        res.render("error", { error });
    }
});
exports.getExamAnswersController = getExamAnswersController;
const getExamAnswersControllerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentId = req.params.studentId;
        let examId = req.cookies.examId;
        let answer = yield (0, userService_1.getExamAnswersByStudentId)(studentId, examId);
        let questionArr = yield (0, userService_1.getQuestionArrayByExamId)(examId);
        res.render('markExamById', { student: answer, question: questionArr });
    }
    catch (error) {
        // throw new Error(error.message)
    }
});
exports.getExamAnswersControllerById = getExamAnswersControllerById;
const getMarkExam = (req, res, next) => {
    res.render('markExam');
};
exports.getMarkExam = getMarkExam;
const gradeExamController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examinerId, studentId, examName, examId, studentName } = req.params;
        const graded = yield (0, userService_1.alreadyGraded)(studentId, examId);
        if (graded.length > 0) {
            throw new Error('Exam already Graded');
        }
        let questions = yield (0, userService_1.getQuestionArrayByExamId)(examId);
        let answers = yield (0, userService_1.getExamAnswersByStudentId)(studentId, examId);
        let grades = [];
        for (let i = 0; i < answers.answer.length; i++) {
            let num = Number(req.body[`grade${i}`]);
            grades.push(num);
        }
        console.log(questions);
        const newGrade = new schema_1.Grade;
        newGrade.examinerId = examinerId;
        newGrade.studentId = studentId;
        newGrade.examName = examName;
        newGrade.examId = examId;
        newGrade.studentName = studentName;
        newGrade.comment = req.body.comments;
        newGrade.grade = grades;
        newGrade.questions = questions;
        newGrade.answers = answers.answer;
        newGrade.totalGrade = req.body.totalGrade;
        newGrade.dateMarked = Date.now();
        let result = yield newGrade.save();
        next();
    }
    catch (error) {
        throw new Error('Could not grade exam successfully.');
    }
});
exports.gradeExamController = gradeExamController;
const updateAnswersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examinerId, studentId, examName, examId, studentName } = req.params;
        const update = yield (0, userService_1.updateAnswer)(studentId, examId);
        const answers = yield (0, userService_1.getExamAnswers)(examId);
        if (answers.length > 1) {
            res.render('answerList', { students: answers });
        }
        let userArr = yield (0, userService_1.checkUserId)(examinerId);
        let user = userArr[0];
        res.render('examinerDashboard', { user: user, count: 1 });
    }
    catch (error) {
        throw new Error('Error Updating Answers DB');
    }
});
exports.updateAnswersController = updateAnswersController;
const checkResultController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.cookies.id;
        const examId = req.body.examId;
        const graded = yield (0, userService_1.alreadyGraded)(studentId, examId);
        if (graded.length < 1) {
            throw new Error('Exam Not Yet Graded');
        }
        let grade = graded[0];
        res.render('gradedExam', { grade: grade });
    }
    catch (error) {
        res.render('error', { error: error });
    }
});
exports.checkResultController = checkResultController;
const getGradePage = (req, res, next) => {
    res.render('selectGrade');
};
exports.getGradePage = getGradePage;
const viewResultController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const examinerId = req.cookies.id;
        const examId = req.body.id;
        const grades = schema_1.Grade.find({ examId: examId });
        if (grades.length < 1)
            throw new Error("Error fetching exam");
        if (grades[0].examinerId !== examinerId)
            throw new Error("You dont ave permission to view these grades");
        res.render('viewGrades', { grade: grades });
    }
    catch (error) {
        res.render('error', { error });
    }
});
exports.viewResultController = viewResultController;
//# sourceMappingURL=resultController.js.map
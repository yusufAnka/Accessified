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
exports.getLanding = exports.submitAlgoResult = exports.setAlgorithmController = exports.setExamController = exports.getAlgorithmPage = exports.getExamPage = exports.getLoginPage = exports.createAlgorithmController = exports.createExamController = exports.submitExamController = exports.getSelectExamPage = exports.getSelectAlgorithmPage = exports.setExam = exports.setAlgorithm = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("../model/schema");
const userService_1 = require("../middleware/userService");
// import { signInWithGooglePopup } from '../utils/firebase.utils';
const setAlgorithm = (req, res, next) => {
    res.render('setAlgorithm');
};
exports.setAlgorithm = setAlgorithm;
const setExam = (req, res, next) => {
    res.render('setExam');
};
exports.setExam = setExam;
const getSelectAlgorithmPage = (req, res, next) => {
    res.render('selectAlgorithm');
};
exports.getSelectAlgorithmPage = getSelectAlgorithmPage;
const getSelectExamPage = (req, res, next) => {
    res.render('selectExam');
};
exports.getSelectExamPage = getSelectExamPage;
const submitExamController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userArr = yield (0, userService_1.checkUserId)(req.cookies.id);
        console.log(req.cookies.id);
        if (userArr.length < 1) {
            throw new Error("Student Not Found");
        }
        let user = userArr[0];
        console.log(user);
        console.log(`controller`);
        let answer = yield (0, userService_1.checkSubmission)(req.cookies.examId, req.cookies.id);
        if (answer.length > 0) {
            throw new Error('There is a submitted Answer Already');
        }
        let newAnswerArr = [];
        for (let i = 0; i < Number(req.cookies.answerLength); i++) {
            newAnswerArr.push(req.body[`answer${i}`]);
        }
        const newAnswer = new schema_1.ExamAnswer({
            examId: req.cookies.examId,
            examinerId: req.cookies.examinerId,
            studentId: req.cookies.id,
            examName: req.cookies.examName,
            answer: newAnswerArr,
            score: 0,
            studentName: user.name
        });
        const result = yield newAnswer.save();
        // console.log(result);
        res.render('studentDashboard', { user: user });
    }
    catch (error) {
        res.render('error', { error: error });
    }
});
exports.submitExamController = submitExamController;
const createExamController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let examArrCheck = yield (0, userService_1.checkExam)(req.body.examName);
        if (examArrCheck.length > 0) {
            throw new Error('Exam with that name in Database. \n Please start over with a different exam name');
        }
        let examArr = [];
        for (let i = 1; i <= Number(req.body.count); i++) {
            const test = req.body[`question${i}`];
            examArr.push(test);
        }
        const Exam = mongoose_1.default.model('Exam', schema_1.examSchema);
        const newExam = new Exam({
            examName: req.body.examName,
            week: req.body.week,
            examiner: req.cookies.id,
            numberOfQuestion: req.body.count,
            question: examArr
        });
        const result = yield newExam.save();
        res.render('createdExam', { exam: newExam });
    }
    catch (error) {
        res.render('error', { error: error });
    }
});
exports.createExamController = createExamController;
const createAlgorithmController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let algoExist = yield (0, userService_1.checkAlgorithm)(req.body.name);
        if (algoExist.length > 1) {
            throw new Error('Algorithm with this name Exist');
        }
        let testArr = [];
        let resultArr = [];
        for (let i = 1; i <= Number(req.body.count); i++) {
            const result1 = req.body[`result${i}`];
            const test = req.body[`testcase${i}`];
            testArr.push(test);
            resultArr.push(result1);
        }
        const Algo = mongoose_1.default.model('Algo', schema_1.algoSchema);
        const newAlgorithm = new Algo({
            examName: req.body.examName,
            week: req.body.week,
            examiner: req.cookies.id,
            count: Number(req.body.count),
            instruction: req.body.instruction,
            testcase: testArr,
            result: resultArr,
            testcaseType: req.body.testcaseType,
            resultType: req.body.resultType
        });
        const result = yield newAlgorithm.save();
        res.render('createdAlgorithm', { exam: newAlgorithm });
    }
    catch (error) {
        res.render('error', { error: error });
    }
});
exports.createAlgorithmController = createAlgorithmController;
const getLoginPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('login');
});
exports.getLoginPage = getLoginPage;
const getExamPage = (req, res) => {
    res.render('setExam');
};
exports.getExamPage = getExamPage;
const getAlgorithmPage = (req, res) => {
    res.cookie('count', 1);
    res.render('setAlgorithm', { count: 1 });
};
exports.getAlgorithmPage = getAlgorithmPage;
const setExamController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, userService_1.checkUserId)(req.cookies.id);
        console.log(user);
        const exam = yield (0, userService_1.getExam)(req.body.examId);
        res.cookie('examId', exam.id);
        res.cookie('examinerId', exam.examiner);
        res.cookie('answerLength', exam.question.length);
        res.cookie('examName', exam.examName);
        res.render('exam', { exam: exam });
    }
    catch (error) {
        res.render('error');
    }
});
exports.setExamController = setExamController;
const setAlgorithmController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const algorithmArr = yield (0, userService_1.checkAlgorithm)(req.body.id);
        // console.log(algorithmArr[0].result)
        if (algorithmArr.length < 1) {
            throw new Error('No Such algorithm Available');
        }
        const algorithm = yield algorithmArr[0];
        const algorithmOut = {
            examId: algorithm.id,
            instruction: algorithm.instruction,
            tests: []
        };
        for (let i = 0; i < algorithm.count; i++) {
            const test = {
                testCaseValue: '',
                testCaseAnswerValue: '',
                testCaseAnswerType: ''
            };
            test.testCaseValue = algorithm.testcase[i];
            test.testCaseAnswerValue = algorithm.result[i];
            test.testCaseAnswerType = algorithm.resultType;
            algorithmOut.tests.push(test);
        }
        console.log(algorithmOut);
        res.status(200).render("exampage", { question: algorithmOut, student: { username: "student", room: "assessifiedAdmin" } });
    }
    catch (error) {
        // throw new Error (error.message)
        res.render('error');
    }
});
exports.setAlgorithmController = setAlgorithmController;
function submitAlgoResult(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const examResult = {
                studentID: req.body.studentID,
                questionID: req.body.questionID,
                score: req.body.score,
                solution: req.body.solution,
                demeanours: req.body.demeanours,
                examDate: new Date()
            };
            const savedResult = yield new schema_1.AlgoResult(examResult).save();
            console.log(req.body);
            return res.status(201).send({ result: true, message: "Exam recorded successfully" });
        }
        catch (ex) {
            console.log(ex.message + " " + JSON.stringify(req.body));
            return res.status(500).send({ result: false, message: "failed to record exam: " + ex.message });
        }
    });
}
exports.submitAlgoResult = submitAlgoResult;
function getLanding(req, res) {
    res.render('landingPage');
}
exports.getLanding = getLanding;
// export{getLanding}
//Generate view Exams for Examiner
// export const viewStudentAnsweredExam = async (req: Request, res: Response, next: NextFunction) => {
//     let answerExam = await viewExam(req.body.answer);
//     if
// }
//# sourceMappingURL=examController.js.map
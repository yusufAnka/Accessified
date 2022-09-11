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
exports.alreadyGraded = exports.getAlgorithm = exports.checkSubmission = exports.getExam = exports.loginFunction = exports.checkAlgorithm = exports.getQuestionArrayByExamId = exports.updateAnswer = exports.getExamAnswersByStudentId = exports.getExamAnswers = exports.checkExamById = exports.checkExam = exports.checkUserId = exports.checkUser = void 0;
const schema_1 = require("../model/schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = require("./validator");
const checkUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = yield schema_1.User.find({ email: user.email });
    return userEmail;
});
exports.checkUser = checkUser;
const checkUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield schema_1.User.find({ _id: userId });
    return user;
});
exports.checkUserId = checkUserId;
const checkExam = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const examArr = yield schema_1.Exam.find({ examName: name });
    return examArr;
});
exports.checkExam = checkExam;
const checkExamById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const examArr = yield schema_1.Exam.find({ _id: id });
    return examArr;
});
exports.checkExamById = checkExamById;
const getExamAnswers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answerArr = yield schema_1.ExamAnswer.find({ examId: id });
        return answerArr;
    }
    catch (error) {
        throw new Error("No records for Answers from students on this exam");
    }
});
exports.getExamAnswers = getExamAnswers;
const getExamAnswersByStudentId = (studentId, examId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answerArr = yield schema_1.ExamAnswer.find({ studentId: studentId, examId: examId });
        return answerArr[0];
    }
    catch (error) {
        throw new Error("No records for Answers from students on this exam");
    }
});
exports.getExamAnswersByStudentId = getExamAnswersByStudentId;
const updateAnswer = (studentId, examId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield schema_1.ExamAnswer.deleteOne({ studentId: studentId, examId: examId });
        console.log(update);
        return update[0];
    }
    catch (error) {
        throw new Error('Couldnt Update Answers DB');
    }
});
exports.updateAnswer = updateAnswer;
const getQuestionArrayByExamId = (examId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questions = yield schema_1.Exam.find({ _id: examId });
        if (questions.length < 1) {
            throw new Error('Cant find exam Questions');
        }
        return questions[0].question;
    }
    catch (error) {
        throw new Error('Encountered problem fetching questions for this exam');
    }
});
exports.getQuestionArrayByExamId = getQuestionArrayByExamId;
const checkAlgorithm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const algorithmArr = yield schema_1.Algo.find({ _id: id });
        // console.log(algorithmArr[0].testcase)
        return algorithmArr;
    }
    catch (error) {
        throw new Error('Cant find exam in Database');
    }
});
exports.checkAlgorithm = checkAlgorithm;
const loginFunction = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userDetails = yield (0, exports.checkUser)(user);
        if (userDetails.length < 1) {
            throw new Error(`Username or password incorrect`);
        }
        let person = userDetails[0];
        let truthy = yield bcrypt_1.default.compare(user.password, person.password);
        if (truthy) {
            const LoggedInUser = {
                token: (0, validator_1.generateToken)(person.id),
                role: person.role,
                name: person.name,
                id: person.id
            };
            return LoggedInUser;
        }
    }
    catch (error) {
        throw new Error('Username or password mismatch');
    }
});
exports.loginFunction = loginFunction;
const getExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const examArr = yield (0, exports.checkExamById)(id);
        if (examArr.length < 1) {
            throw new Error('No Such Exam Available');
        }
        return examArr[0];
    }
    catch (error) {
        throw new Error('Problem fetching your exam. Please check with your examiner');
    }
});
exports.getExam = getExam;
const checkSubmission = (exam, student) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield schema_1.ExamAnswer.find({ examId: exam, studentId: student });
    return answer;
});
exports.checkSubmission = checkSubmission;
const getAlgorithm = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const algorithmArr = yield (0, exports.checkAlgorithm)(name);
        return algorithmArr;
    }
    catch (error) {
        throw new Error('Problem fetching your exam. Please check with your examiner');
    }
});
exports.getAlgorithm = getAlgorithm;
const alreadyGraded = (studentId, examId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grades = yield schema_1.Grade.find({ studentId: studentId, examId: examId });
        return grades;
    }
    catch (error) {
        throw new Error('Error checking if exams previously marked');
    }
});
exports.alreadyGraded = alreadyGraded;
//# sourceMappingURL=userService.js.map
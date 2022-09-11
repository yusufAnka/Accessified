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
exports.createUser = exports.Grade = exports.ExamAnswer = exports.Algo = exports.Exam = exports.User = exports.AlgoResult = exports.gradeSchema = exports.algoResultSchema = exports.examAnswerSchema = exports.algoSchema = exports.examSchema = exports.userSchema = void 0;
const mongoose = require('mongoose');
exports.userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    password: String
});
exports.examSchema = new mongoose.Schema({
    examName: String,
    week: String,
    examiner: String,
    numberOfQuestion: String,
    question: [String]
});
exports.algoSchema = new mongoose.Schema({
    examName: String,
    week: String,
    examiner: String,
    count: Number,
    instruction: String,
    testcase: [String],
    result: [String],
    testcaseType: String,
    resultType: String
});
exports.examAnswerSchema = new mongoose.Schema({
    examId: String,
    examinerId: String,
    studentId: String,
    examName: String,
    studentName: String,
    answer: [String],
    score: Number
});
exports.algoResultSchema = new mongoose.Schema({
    studentID: String,
    questionID: String,
    score: String,
    solution: String,
    demeanours: String
});
exports.gradeSchema = new mongoose.Schema({
    examinerId: String,
    studentId: String,
    examName: String,
    examId: String,
    studentName: String,
    comment: String,
    grade: [Number],
    questions: [String],
    answers: [String],
    totalGrade: Number,
    dateMarked: Date
});
exports.AlgoResult = mongoose.model("AlgoResult", exports.algoResultSchema);
exports.User = mongoose.model('User', exports.userSchema);
exports.Exam = mongoose.model('Exam', exports.examSchema);
exports.Algo = mongoose.model('Algo', exports.algoSchema);
exports.ExamAnswer = mongoose.model('Answer', exports.examAnswerSchema);
exports.Grade = mongoose.model('Grade', exports.gradeSchema);
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new exports.User({
            name: "Decagon",
            email: "decagon@gmail.com",
            role: "examiner",
            password: "password"
        });
        const result = yield user.save();
        console.log(result);
    });
}
exports.createUser = createUser;
// createUser();
//# sourceMappingURL=schema.js.map
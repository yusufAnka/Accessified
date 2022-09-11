import { string } from "joi";
import { mongo } from "mongoose";

const mongoose = require('mongoose');
export const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    password: String
})
export const examSchema = new mongoose.Schema({
    examName: String,
    week: String,
    examiner: String,
    numberOfQuestion: String,
    question: [String]
    
})
export const algoSchema = new mongoose.Schema({
    examName: String,
    week: String,
    examiner: String,
    count: Number,
    instruction: String,
    testcase: [String],
    result: [String],
    testcaseType: String,
    resultType: String
})

export const examAnswerSchema = new mongoose.Schema({
    examId: String,
    examinerId: String,
    studentId: String,
    examName: String,
    studentName: String,
    answer: [String],
    score: Number
})

export const algoResultSchema = new mongoose.Schema({
    studentID: String,
    questionID: String,
    score: String,
    solution: String,
    demeanours: String


})

export const gradeSchema = new mongoose.Schema({
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
})

export const AlgoResult = mongoose.model("AlgoResult", algoResultSchema);
export const User = mongoose.model('User', userSchema);
export const Exam = mongoose.model('Exam', examSchema);
export const Algo = mongoose.model('Algo', algoSchema);
export const ExamAnswer = mongoose.model('Answer', examAnswerSchema);
export const Grade = mongoose.model('Grade', gradeSchema);
export async function createUser(){
    const user = new User({
        name: "Decagon",
        email: "decagon@gmail.com",
        role: "examiner",
        password: "password"
    })
    const result = await user.save();
    console.log(result);
}

// createUser();
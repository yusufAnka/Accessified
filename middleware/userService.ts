import {Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import {ILogin, IloggedIn, Iexam} from "../model/model"
import { User, Exam, Algo, ExamAnswer, Grade } from '../model/schema';
import bcrypt from "bcrypt";
import { generateToken } from './validator';

export const checkUser = async (user: ILogin)=>{
    const userEmail = await User.find({email: user.email});
    return userEmail;
}

export const checkUserId = async (userId: string)=>{
    const user = await User.find({_id: userId});
    
    return user;
}

export const checkExam = async (name: string)=>{
    const examArr = await Exam.find({examName: name})
    return examArr;
}

export const checkExamById = async (id: string)=>{
    const examArr = await Exam.find({_id: id})
    return examArr;
}

export const getExamAnswers = async (id: string) => {
    try {
        const answerArr = await ExamAnswer.find({examId: id});
        return answerArr; 
    } catch (error) {
        throw new Error ("No records for Answers from students on this exam")
    }
    
}

export const getExamAnswersByStudentId = async (studentId: string, examId: string) => {
    try {
        const answerArr = await ExamAnswer.find({studentId: studentId, examId: examId});
        return answerArr[0]; 
    } catch (error) {
        throw new Error ("No records for Answers from students on this exam")
    }
    
}

export const updateAnswer = async (studentId: string, examId: string) =>{
    try {
        const update = await ExamAnswer.deleteOne({studentId: studentId, examId: examId});
        console.log(update);
        return update[0];
    } catch (error) {
        throw new Error ('Couldnt Update Answers DB')
    }
    
}

export const getQuestionArrayByExamId = async (examId: string)=>{
    try {
        let questions = await Exam.find({_id: examId})
        if(questions.length < 1){
            throw new Error ('Cant find exam Questions')
        }
        return questions[0].question;
    } catch (error) {
        throw new Error('Encountered problem fetching questions for this exam')
    }
}

export const checkAlgorithm = async (id: string)=>{
    try {
        const algorithmArr = await Algo.find({_id: id})
        // console.log(algorithmArr[0].testcase)
        return algorithmArr;
    } catch (error) {
        throw new Error('Cant find exam in Database')
    } 
}

export const loginFunction = async (user: ILogin)=>{
    try {
        let userDetails = await checkUser(user);
        if(userDetails.length < 1) {
        throw new Error(`Username or password incorrect`);
        }
        let person = userDetails[0];
        let truthy = await bcrypt.compare(user.password, person.password);
        if(truthy){
            const LoggedInUser: IloggedIn = {
                token: generateToken(person.id),
                role: person.role,
                name: person.name,
                id: person.id
            }
            return LoggedInUser;
        }
    } catch (error) {
        throw new Error('Username or password mismatch');
    }
}

export const getExam = async (id: string) =>{
    try {
        const examArr = await checkExamById(id);
        if(examArr.length < 1){
            throw new Error('No Such Exam Available');
        }
        return examArr[0];
    } catch (error) {
        throw new Error('Problem fetching your exam. Please check with your examiner')
    }

}

export const checkSubmission = async (exam: string, student: string)=>{
    const answer = await ExamAnswer.find({examId: exam, studentId: student});
    return answer
}

export const getAlgorithm = async (name: string) =>{
    try {
        const algorithmArr = await checkAlgorithm(name);
        
        return algorithmArr;
    } catch (error) {
        throw new Error('Problem fetching your exam. Please check with your examiner')
    }

}

export const alreadyGraded = async (studentId: string, examId: string)=>{
    try {
        const grades = await Grade.find({studentId: studentId, examId: examId});
        return grades;
    } catch (error) {
        throw new Error ('Error checking if exams previously marked')
    }
    
}


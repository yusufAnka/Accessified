import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { examSchema, algoSchema, examAnswerSchema, ExamAnswer, Exam, Grade, gradeSchema } from '../model/schema';
import { checkAlgorithm, getExam, getAlgorithm, checkUserId, checkSubmission, checkExamById, getExamAnswers, getExamAnswersByStudentId, getQuestionArrayByExamId, updateAnswer, alreadyGraded  } from '../middleware/userService';
import { Iexam, ItestCase } from '../model/model';

export const getExamAnswersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const examSetterArr = await checkExamById(req.body.examId);
        if(examSetterArr.length < 1){
            throw new Error ('Exam Records not Found');
        }
        let examSetter = examSetterArr[0];
        if(examSetter.examiner !== req.cookies.id){
            throw new Error ("You dont have permission to grade this examination");
        }
        const answers = await getExamAnswers(req.body.examId);
        if(answers.length === 0){
            console.log(answers)
            throw new Error ('There are no ungraded entries for this exam')
        }
        res.cookie('examId', req.body.examId)
        console.log(answers);
        res.render('answerList', {students: answers})

    } catch (error) {
        res.render("error", {error})
    }
    
};

export const getExamAnswersControllerById = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        let studentId = req.params.studentId;
        let examId = req.cookies.examId;
         let answer = await getExamAnswersByStudentId(studentId, examId);
         let questionArr = await getQuestionArrayByExamId(examId)
         res.render('markExamById', {student: answer, question: questionArr})
    } catch (error) {
        // throw new Error(error.message)
    }
    
    

}

export const getMarkExam = (req: Request, res: Response, next: NextFunction)=>{
    res.render('markExam');
}

export const gradeExamController = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {examinerId, studentId, examName, examId, studentName} = req.params;
    const graded = await alreadyGraded(studentId, examId);
    if(graded.length > 0){
        throw new Error ('Exam already Graded')
    }
    let questions = await getQuestionArrayByExamId(examId);
    let answers = await getExamAnswersByStudentId(studentId, examId);
    let grades: Number[] = [];
    for (let i = 0; i < answers.answer.length; i++){
        let num =Number(req.body[`grade${i}`])
            grades.push(num);
    }
    console.log(questions);
    const newGrade = new Grade;
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
    let result = await newGrade.save();
    next();
    } catch (error) {
        throw new Error('Could not grade exam successfully.')
    } 
}

export const updateAnswersController = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {examinerId, studentId, examName, examId, studentName} = req.params;
        const update = await updateAnswer(studentId, examId);
        const answers = await getExamAnswers(examId);
        if(answers.length > 1){
            res.render('answerList', {students: answers})
        }
        let userArr = await checkUserId(examinerId);
        let user = userArr[0];
        res.render('examinerDashboard', {user: user, count: 1})
    } catch (error) {
        throw new Error('Error Updating Answers DB')
    }
}

export const checkResultController = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const studentId = req.cookies.id;
        const examId = req.body.examId;
        const graded = await alreadyGraded(studentId, examId);
        if(graded.length < 1){
            throw new Error ('Exam Not Yet Graded')
        }
        let grade = graded[0];
        res.render('gradedExam', {grade: grade})
    } catch (error) {
        res.render('error', {error: error})
    }
  
}

export const getGradePage = (req: Request, res: Response, next: NextFunction)=>{
    res.render('selectGrade');
}

export const viewResultController = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const examinerId = req.cookies.id;
        const examId = req.body.id;
        const grades = Grade.find({examId: examId});
        if (grades.length < 1) throw new Error ("Error fetching exam");
        if(grades[0].examinerId !== examinerId) throw new Error ("You dont ave permission to view these grades")
        res.render('viewGrades', {grade: grades})
    } catch (error) {
        res.render('error', {error})
    }
    

}

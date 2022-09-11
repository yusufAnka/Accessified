import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { examSchema, algoSchema, examAnswerSchema, ExamAnswer, Exam, AlgoResult } from '../model/schema';
import { AlgoResultInterface, Iexam, ItestCase } from '../model/model';
import { checkAlgorithm, getExam, getAlgorithm, checkUserId, checkSubmission, checkExam  } from '../middleware/userService';
// import { signInWithGooglePopup } from '../utils/firebase.utils';






export const setAlgorithm = (req: Request, res: Response, next: NextFunction) => {
        res.render('setAlgorithm')
}
export const setExam = (req: Request, res: Response, next: NextFunction) => {
    res.render('setExam')
}

export const getSelectAlgorithmPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('selectAlgorithm');
}

export const getSelectExamPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('selectExam');
}

export const submitExamController = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        let userArr = await checkUserId(req.cookies.id)
        console.log(req.cookies.id)
        if(userArr.length < 1){
            throw new Error ("Student Not Found");
        }
        let user = userArr[0];
        console.log(user);
        console.log(`controller`)
        let answer = await checkSubmission(req.cookies.examId, req.cookies.id);
        if(answer.length > 0){
            throw new Error ('There is a submitted Answer Already');
        }
        let newAnswerArr: string[] = [];
        for (let i = 0; i < Number(req.cookies.answerLength); i++){
            newAnswerArr.push(req.body[`answer${i}`]);
        }
        const newAnswer = new ExamAnswer({
            examId: req.cookies.examId,
            examinerId: req.cookies.examinerId,
            studentId: req.cookies.id,
            examName: req.cookies.examName,
            answer: newAnswerArr,
            score: 0,
            studentName: user.name
        })
        
        const result = await newAnswer.save();
        // console.log(result);
        res.render('studentDashboard', {user: user});
    } catch (error) {
        res.render('error', {error: error});
    }
    
}

export const createExamController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let examArrCheck = await checkExam(req.body.examName);
        if(examArrCheck.length > 0){
            throw new Error('Exam with that name in Database. \n Please start over with a different exam name')
        }
        let examArr: string[] = [];
        for (let i = 1; i <= Number(req.body.count); i++){
            const test = req.body[`question${i}`]
            examArr.push(test);
        }
        const Exam = mongoose.model('Exam', examSchema);
        const newExam = new Exam({
        examName: req.body.examName,
        week: req.body.week,
        examiner: req.cookies.id,
        numberOfQuestion: req.body.count,
        question: examArr
        
    })
    const result = await newExam.save();
    res.render('createdExam', { exam: newExam });
    } catch (error) {
        res.render('error', { error: error });
    }
}
export const createAlgorithmController = async (req: Request, res: Response, next: NextFunction) => {
    try {
    let algoExist = await checkAlgorithm(req.body.name);
    if(algoExist.length > 1){
        throw new Error ('Algorithm with this name Exist')
    }
    let testArr: string[] = []
    let resultArr: string[] = []
   
    for (let i = 1; i <= Number(req.body.count); i++){
        const result1 = req.body[`result${i}`]
        const test = req.body[`testcase${i}`]
        testArr.push(test);
        resultArr.push(result1);
    }
    const Algo = mongoose.model('Algo', algoSchema);
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
    })
    const result = await newAlgorithm.save();
    res.render('createdAlgorithm', { exam: newAlgorithm });
    } catch (error) {
        res.render('error', { error: error });
    }
}
export const getLoginPage = async (req: Request, res: Response)=>{
   
    res.render('login')
}
export const getExamPage = (req: Request, res: Response)=>{
    res.render('setExam');
}
export const getAlgorithmPage = (req: Request, res: Response)=>{
    res.cookie('count', 1)
    res.render('setAlgorithm', {count: 1});
}

export const setExamController = async (req: Request, res: Response)=>{
    try {
        let user = await checkUserId(req.cookies.id);
        console.log(user);
        const exam = await getExam(req.body.examId);
        res.cookie('examId', exam.id);
        res.cookie('examinerId', exam.examiner);
        res.cookie('answerLength', exam.question.length);
        res.cookie('examName', exam.examName);
        res.render('exam', {exam: exam});
    } catch (error) {
        res.render('error')
    }
}



export const setAlgorithmController = async (req: Request, res: Response)=>{
    try {
        const algorithmArr = await checkAlgorithm(req.body.id);
        // console.log(algorithmArr[0].result)
        if(algorithmArr.length < 1){
            throw new Error('No Such algorithm Available');
        }
        const algorithm = await algorithmArr[0];
        const algorithmOut: Iexam = {
            examId: algorithm.id,
            instruction: algorithm.instruction,
            tests: []
        }
        for (let i = 0; i < algorithm.count; i++){
            const test: ItestCase = {
                testCaseValue: '',
                testCaseAnswerValue: '',
                testCaseAnswerType: ''
            }
            test.testCaseValue = algorithm.testcase[i];
            test.testCaseAnswerValue = algorithm.result[i];
            test.testCaseAnswerType = algorithm.resultType
            algorithmOut.tests.push(test)
        }
        console.log(algorithmOut);
        res.status(200).render("exampage", {question: algorithmOut, student: {username: "student", room: "assessifiedAdmin"}})
    } catch (error) {
        // throw new Error (error.message)
        res.render('error')
    }
}


export async function submitAlgoResult(req: Request, res: Response) {
    try{
        const examResult: AlgoResultInterface = {
            studentID: req.body.studentID,
            questionID: req.body.questionID,
            score: req.body.score,
            solution: req.body.solution,
            demeanours: req.body.demeanours,
            examDate: new Date()
        };
    
        const savedResult = await new AlgoResult(examResult).save()
        console.log(req.body)
        return res.status(201).send({result: true, message: "Exam recorded successfully"});

    
    }catch(ex: any){ console.log(ex.message + " "+ JSON.stringify(req.body));  return res.status(500).send({result: false, message: "failed to record exam: "+ ex.message}) }

}

export function getLanding(req: Request, res: Response){
    res.render('landingPage')
}
// export{getLanding}


//Generate view Exams for Examiner
// export const viewStudentAnsweredExam = async (req: Request, res: Response, next: NextFunction) => {
//     let answerExam = await viewExam(req.body.answer);
//     if
// }
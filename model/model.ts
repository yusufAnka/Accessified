interface Iuser {
    id: Number;
    name: string;
    email: string;
    password: string;
    repeat_password: string;
    role: string;
}
interface ILogin {
    email: string;
    password: string;
}
interface IloggedIn {
    token: string,
    role: string,
    name: string,
    id: string
}

interface ItestCase {
    testCaseValue: string,
    testCaseAnswerValue: string,
    testCaseAnswerType: string
}
interface Iexam {
    examId: string,
    instruction: string,
    tests: ItestCase[]
}

export interface AlgoResultInterface{
    studentID: string,
    questionID: string,
    score: string,
    solution: string,
    demeanours: string,
    examDate: Date
}

export {Iuser, ILogin, IloggedIn, Iexam, ItestCase}
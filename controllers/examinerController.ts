import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import {userSchema} from "../model/schema";
import { checkUser, loginFunction } from '../middleware/userService';
import { isConditionalExpression } from 'typescript';
import { generateToken } from '../middleware/validator';
//import {createExaminer, loginFunction} from '/'
import { IloggedIn } from '../model/model';
// import { signInWithGooglePopup } from '../utils/firebase.utils';
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userExist = await checkUser(req.body);
    if (userExist.length > 0) {
        throw new Error('User already exists');
    }
    const User = mongoose.model('User', userSchema);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
    }) 
    const result = await newUser.save();
    console.log(result);
    res.render('createdUser', { user: newUser });
    } catch (error) {
        res.render('error', { error: error });
    }
}

export const loginUserController = async(req: Request, res: Response, next: NextFunction) => {
    
   const user = await loginFunction(req.body);
   if(user){
    res.cookie('token', user.token);
    res.cookie('role', user.role);
    res.cookie('id', user.id);
    res.cookie('count', 1)
    if(user.role === 'examiner'){
        res.render('examinerDashboard', {user: user, count: 1})
    }
    if(user.role === 'student'){
        res.render('studentDashboard', {user: user, count: 1})
    }
   }
}
//logout controller

export const logoutUserController = async(req: Request, res: Response, next: NextFunction) => {
res.cookie('token', '');
res.cookie('role', '');
res.cookie('id', '');
res.render('login');

}


export const getRegisterUser = (req: Request, res: Response, next: NextFunction) => {
    res.render('createUser')
};

export const getStudent = (req: Request, res: Response, next: NextFunction) => {
    res.render('student')
};

export const getExaminer = (req: Request, res: Response, next: NextFunction) => {
    res.render('examiner')
};

export const getAbout = (req: Request, res: Response, next: NextFunction) => {
    res.render('about')
};
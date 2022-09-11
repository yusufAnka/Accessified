import {Response, Request, NextFunction } from 'express';
import Joi, { string } from 'joi';
import bcrypt from "bcrypt";
import {saltRounds, JWT_SECRET } from "../env";
import jwt from "jsonwebtoken";
export const validateNewUser = (req: Request, res: Response, next: NextFunction) => {
    let {name, email, password, repeat_password, role} = req.body;
    const schema = Joi.object({
        password : Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        repeat_password: Joi.ref('password'),
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org']}})
            .required(),
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        role: Joi.string()
                .required()
    })
    const {error, value} = schema.validate({name, email, password, repeat_password, role})
    if(error){
        throw new Error(error.message)
    }
    const salt = bcrypt.genSaltSync(Number(saltRounds));
    const hash = bcrypt.hashSync(value.password, salt);
    req.body.password = hash;
    req.body.email = value.email;
    next()
}
export const generateToken = (id:string)=>{
    return jwt.sign({id}, `${JWT_SECRET}`, {expiresIn: '5h'})
}
export const validateExaminer = (req: Request, res: Response, next: NextFunction) => {
    try {
        const decoded = jwt.verify(req.cookies.token, `${JWT_SECRET}`);
        if(decoded && req.cookies.role === 'examiner') {
            next();
        }
    } catch (error) {
        throw new Error('No permission');
    }
}


export const validateStudent = (req: Request, res: Response, next: NextFunction) => {
    try {
        const decoded = jwt.verify(req.cookies.token, `${JWT_SECRET}`);
        if(decoded && req.cookies.role === 'student') {
            next();
        }
    } catch (error) {
        throw new Error('No permission');
    }
}
//var express = require('express');
import express, {Request, Response, NextFunction } from 'express';
import { getLanding } from '../controllers/examController';
import { getExaminer, getStudent, getAbout } from '../controllers/examinerController';
const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});
//route landing page
router.get('/home', getLanding)
router.get('/examiner', getExaminer);
router.get('/student', getStudent);
router.get('/about', getAbout)


export default router;

import createError, {HttpError} from 'http-errors'
import express, {Express, NextFunction, Request, Response } from 'express';
var path = require('path');
import dotenv from 'dotenv'
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
import { DATABASE_URI } from "./env"
import { any } from 'joi';
import { createUser } from './model/schema';
// const accessifiedDB = require('./utils/dbConnect')

import indexRouter from './routes/index'
import usersRouter from './routes/users'


const dotENV = dotenv.config();




var app = express();
const Socket = require('socket.io')
const http = require('http').createServer(app);
const chatUsers: any = [];

const io = Socket(http);
io.on('connection', (socket: any) => {
  console.log("connected "+ socket.id)

  socket.on('joinRoom', (user: any) => {
    
    socket.join(`${user.room}`);
    const userObj = {userSocketID: socket.id, username: user.username, room: user.room};
    chatUsers.push(userObj);
    const message = `${user.username} just joined room ${user.room}`
    console.log(message)

    socket.broadcast.to(user.room).emit("joinedRoom", `${user.username} just joined`);

    

  })

  socket.on("chatMessage", (postData: any) => {
    console.log(JSON.stringify(postData))
    
    socket.broadcast.to(postData.room).emit("serverChatMessage", JSON.stringify(postData))
  })

})

io.on("disconnetion", (socket: any) => {
  const userIndex = chatUsers.findIndex((user: any) => { return user.userSocketID == socket.id})
  if(userIndex !== -1){
    chatUsers.splice(userIndex, 1);
    socket.broadcast.to(chatUsers[userIndex].room).emit("serverDisconnectionMessage", `${chatUsers[userIndex].usernae} just left`);
  }
  socket.emit("serverDisconnectionMessage", "Someone left"); 
})







//connecting database
// accessifiedDB();
mongoose.connect(DATABASE_URI)
.then(()=> {
  // createUser();
  console.log('DB Connected')
})
.catch((error: any) =>  console.log(error))


// view engine setup
app.set('views', path.join(__dirname, "..", path.sep, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", path.sep, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res:Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const errorStatusCode = err.status ?err.status : 500;
  res.status(errorStatusCode);
  res.status(err.status || 500);
  res.render('error');

});

http.listen(process.env.PORT);


module.exports = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
var path = require('path');
const dotenv_1 = __importDefault(require("dotenv"));
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const env_1 = require("./env");
// const accessifiedDB = require('./utils/dbConnect')
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const dotENV = dotenv_1.default.config();
var app = (0, express_1.default)();
const Socket = require('socket.io');
const http = require('http').createServer(app);
const chatUsers = [];
const io = Socket(http);
io.on('connection', (socket) => {
    console.log("connected " + socket.id);
    socket.on('joinRoom', (user) => {
        socket.join(`${user.room}`);
        const userObj = { userSocketID: socket.id, username: user.username, room: user.room };
        chatUsers.push(userObj);
        const message = `${user.username} just joined room ${user.room}`;
        console.log(message);
        socket.broadcast.to(user.room).emit("joinedRoom", `${user.username} just joined`);
    });
    socket.on("chatMessage", (postData) => {
        console.log(JSON.stringify(postData));
        socket.broadcast.to(postData.room).emit("serverChatMessage", JSON.stringify(postData));
    });
});
io.on("disconnetion", (socket) => {
    const userIndex = chatUsers.findIndex((user) => { return user.userSocketID == socket.id; });
    if (userIndex !== -1) {
        chatUsers.splice(userIndex, 1);
        socket.broadcast.to(chatUsers[userIndex].room).emit("serverDisconnectionMessage", `${chatUsers[userIndex].usernae} just left`);
    }
    socket.emit("serverDisconnectionMessage", "Someone left");
});
//connecting database
// accessifiedDB();
mongoose.connect(env_1.DATABASE_URI)
    .then(() => {
    // createUser();
    console.log('DB Connected');
})
    .catch((error) => console.log(error));
// view engine setup
app.set('views', path.join(__dirname, "..", path.sep, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, "..", path.sep, 'public')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    const errorStatusCode = err.status ? err.status : 500;
    res.status(errorStatusCode);
    res.status(err.status || 500);
    res.render('error');
});
http.listen(process.env.PORT);
module.exports = app;
//# sourceMappingURL=app.js.map
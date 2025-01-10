const express = require('express');
const {config} = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dbconnection = require('./database/dbconnection.js');
const messageRouter = require('./router/messageRouter.js')
const {errorMiddleware} = require('./middlewares/error.js');
const userRouter = require('./router/userRouter.js')
const appointmentRouter = require('./router/appointmentRouter.js')

const app = express();
config({path: "./config/config.env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/appointment', appointmentRouter)

dbconnection()


app.use(errorMiddleware);
module.exports = app;
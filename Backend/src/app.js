import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

import webHookRoute from './routes/webHook.routes.js';
app.use("/api/v1/webhook", express.raw({type: 'application/json'}), webHookRoute);


// app.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:3000'],
//     credentials: true
// }));
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json()); //parse json object from client in req 
app.use(express.urlencoded({ extended: true })); //parse string or array req from client in url
app.use(express.static("public"));
app.use(cookieParser());

// Importing Routes
import blogRoutes from './routes/blog.routes.js';
import userRoutes from './routes/user.routes.js';
import professionalRoutes from './routes/professionals.routes.js';
import sessionRoutes from './routes/session.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import chatRoutes from './routes/supportGpt.routes.js';
import quizRoutes from './routes/quiz.routes.js';

// Routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/professionals", professionalRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1/appointment", appointmentRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/quiz", quizRoutes);


//http:localhost:3000/users/register

export { app };

import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { sendEmail } from './utils/sendEmail.js';

const app = express();
const router = express.Router();

config({ path: './.env' });

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST"],
        credentials: true
    })
); // cors is used to allow the frontend to access the backend

// used to parse the incoming request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

router.post("/send/mail", async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return next(
            res
                .status(400)
                .json({succes:false, message: "All fields are required" })
        );
    };

    try {
        await sendEmail({
            email: "rohailahmed303@gmail.com",
            subject: "Good Day!",
            message,
            userEmail: email
        })
        res
            .status(200)
            .json({ succes: true, message: "Email sent successfully" });
    } catch (error) {
        res
            .status(501)
            .json({
                success: false,
                message: "Error while sending email"
            })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import errorHandler from '../middlewares/error.js'
import {User} from '../models/userSchema.js'
import {v2 as cloudinary} from 'cloudinary'
import { generateToken } from '../utils/jwtToken.js';

export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length===0) {
        return next(new errorHandler("Please upload Avatar and Resume", 400));
    };

    const {avatar, resume} = req.files;

    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {folder: "AVATARS"}
    );

    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
        console.error (
            "Cloudinary Error: ", cloudinaryResponseForAvatar.error || "Unknown Cloundinary Error !"
        );
    };

    //for resume
    const cloudinaryResponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {folder: "RESUME"}
    );

    if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
        console.error (
            "Cloudinary Error: ", cloudinaryResponseForResume.error || "Unknown Cloundinary Error !"
        );
    };

    //other data
    const {fullName, email, phone, aboutMe, password, portfolio_url, githubURL, instagramURL, facebookURL, twitterURL, linkedinURL} = req.body;

    const user = await User.create({fullName, email, phone, aboutMe, password, portfolio_url, githubURL, instagramURL, facebookURL, twitterURL, linkedinURL,
        avatar: {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url
        },
        resume: {
            public_id: cloudinaryResponseForResume.public_id,
            url: cloudinaryResponseForResume.secure_url
        }
    })

    generateToken(user, "User Registered", 200, res);

    // res.status(200).json({
    //     success: true,
    //     message: "User Registered Successfully."
    // })
});

export const login = catchAsyncErrors(async (req, res,next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next (new errorHandler("Please enter Email and Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if (!user) {
        return next(new errorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new errorHandler("Invalid Email or Password", 401));
    }

    generateToken(user, "Logged in", 200, res);
})
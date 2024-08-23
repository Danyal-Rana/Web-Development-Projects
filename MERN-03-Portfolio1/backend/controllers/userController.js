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

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie ("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json ({
            success: true,
            message: "Logged Out"
        });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        portfolio_url: req.body.portfolio_url,
        githubURL: req.body.githubURL,
        instagramURL: req.body.instagramURL,
        facebookURL: req.body.facebookURL,
        twitterURL: req.body.twitterURL,
        linkedinURL: req.body.linkedinURL,
    };

    if (req.files && req.files.avatar) {
        const {avatar} = req.files;

        const user = await User.findById(req.user.id);
        const avatarId = user.avatar.public_id;
        await cloudinary.uploader.destroy(avatarId);
        const newAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, {
            folder: "AVATARS",
        });

        newUserData.avatar = {
            public_id: newAvatar.public_id,
            url: newAvatar.secure_url,
        };
    }

    if (req.files && req.files.resume) {
        const {resume} = req.files.resume;

        const user = await User.findById(req.user.id);
        const resumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);

        const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: "RESUME",
        });

        newUserData.resume = {
            public_id: newResume.public_id,
            url: newResume.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully.",
        user,
    });
});
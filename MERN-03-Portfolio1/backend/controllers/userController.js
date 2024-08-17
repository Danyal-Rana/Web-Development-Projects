import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import errorHandler from '../middlewares/error.js'
import {User} from '../models/userSchema.js'
import {v2 as cloudinary} from 'cloudinary'

export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length===0) {
        return next(errorHandler("Please upload Avatar and Resume", 400));
    };

    const {avatar, resume} = req.files;

    const cloudinaryResponseForAvatar = cloudinary.uploader.upload(
        avatar.tempFilePath,
        {folder: "AVATARS"}
    );

    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
        console.error (
            "Cloudinary Error: ", cloudinaryResponseForAvatar.error || "Unknown Cloundinary Error !"
        );
    };
});
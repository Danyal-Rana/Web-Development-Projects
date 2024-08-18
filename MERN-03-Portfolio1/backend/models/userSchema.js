import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    aboutMe: {
        type: String,
        required: [true, "Please enter about yourself"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password must contain atleast 8 charaters."],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    portfolio_url: {
        type: String,
        required: [true, "Portfolio url is required!"]
    },
    githubURL: String,
    instagramURL: String,
    facebookURL: String,
    twitterURL: String,
    linkedInURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPasswrod) {
    return await bcrypt.compare(enteredPasswrod, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this_id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES })
};

export const User = mongoose.model("User", userSchema);
import {User} from '../models/userSchema.js'
import {catchAsyncErrors} from './catchAsyncErrors.js'
import jwt from 'jsonwebtoken'
import ErrorHandler from './error.js'

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return next(new ErrorHandler("User not authorized.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
})
import User from "../model/user_model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "Email already Registered."});
        }

        // for securing the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        const creatingNewUser = new User ({
            fullname: fullname,
            email: email,
            password: hashedPassword
        });
        await creatingNewUser.save();

        return res.status(201).json({message: "User registered Successfully.", 
            user: {
                _id: creatingNewUser._id,
                fullname: creatingNewUser.fullname,                
                email: creatingNewUser.email
            }        
        });
    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({message: "Internal Server Error."});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid Credentials." });
        } else {
            res.status(200).json({
                message: "Login Successful.",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            });
        }
        
        /*
        if (!user) {
            return res.status(400).json({message: "Invalid credentials."});
        }

        const isMatching = await bcryptjs.compare(password, user.password);

        if (!isMatching) {
            return res.status(400).json({message: "Invalid credentials."});
        } else {
            return res.status(200).json({message: "Login Successful.", user: {
                _id: user._id,
                email: user.email, 
                fullname: user.fullname
            }});
        }
        */
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};
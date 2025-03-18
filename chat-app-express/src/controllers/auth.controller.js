import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res)=> {
    const {email, fullName, password} = req.body;

    try {
        if(!email || !fullName || !password) {
            return res.status(400).json({message: 'All fields is required!'});
        }
        if(password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 character!'});
        }

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: 'Email already exists!'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        })

        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(200).json({message: 'Signup successfully!'});
        }else {
            return res.status(400).json({message: 'Invalid user data!'});
        }

    }catch (error) {
        console.log("Error in signup controller: ", error);
        return res.status(500).json({message: 'Internal server Error!'});
    }
}
export const login = async (req, res)=> {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Incorrect email or password!'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: 'Incorrect email or password!'});
        }

        generateToken(user._id, res);
        return res.status(200).json({message: 'Login successfully!'});

    }catch (error) {
        console.log("Error in login controller: ", error);
        return res.status(500).json({message: 'Internal server Error!'});
    }
}
export const logout = (req, res)=> {
   try {
       res.cookie("jwt", "", {maxAge: 0});
       return res.status(200).json({message: 'Logout successfully!'});
   }catch (error) {
       console.log("Error in logout controller: ", error);
       return res.status(500).json({message: 'Internal server Error!'});
   }
}

export const updateProfile = async (req, res)=> {
    try {

        const {avatar} = req.body;
        const userId = req.user._id;

        if(!avatar) {
            return res.status(400).json({message: 'Avatar is required!'});
        }

        const uploadResponse = await cloudinary.uploader.upload(avatar);
        const updateUser = await User.findByIdAndUpdate(
            userId, {avatar: uploadResponse.secure_url}, {new: true}
            );
        return res.status(200).json({message: 'Update profile successfully!'});
    }catch (error) {
        console.log("Error in updateProfile controller: ", error);
        return res.status(500).json({message: 'Internal server Error!'});
    }
}

export const getProfile = (req, res)=> {
    try {
        return res.status(200).json(req.user);
    }catch (error) {
        console.log("Error in updateProfile controller: ", error);
        return res.status(500).json({message: 'Internal server Error!'});
    }
}
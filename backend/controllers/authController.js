import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const { TokenExpiredError } = jwt;

export const loginUser = async (req,res) => {
    try{
        const {employeeId, password} = req.body;

        const user = await User.findOne({employeeId});
        if(!user){
            return res.status(404).json({message: 'User not found!'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invailid credentials!'});
        }

        const token = jwt.sign(
            {id: user._id, role: user.role, employeeId: user.employeeId},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        const userData = {...user._doc};
        delete userData.password;

        res.status(200).json({
            message: 'Welcome Back, Login Successful',
            token,
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({message: 'Server error during login'})
    }
}

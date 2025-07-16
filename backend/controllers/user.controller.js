import User from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const register = async( req, res) => {
    try{
        const { userName, email, password, role="user" } = req.body;
        console.log("registering:-", req.body);

        if(!userName || !email || !password || !role ){
            return res.status(400).json ({message: "All fields are required"});
        }
        if(password.length<8){
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

        if(existingUser){
            return res.status(400).json({message: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            role
        });
        console.log("NewUser:-",newUser);

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }
    catch(error){
        res.status(500).json({message:"Interal server error"});
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log("login :-", req.body);

        if(!email || !password){
            return res.status(400).json({message:"email and password are required"});
        }

        const user = await User.findOne({ $or: [{ email }, { userName: email }]});

        console.log("user:-", user);

        if(!user){
            return res.status(400).json({message: "Invalid email"});
        }
        const isValidPass = await bcrypt.compare(password, user.password);

        if(!isValidPass){
            return res.status(400).json({message:"Invalid password"});
        }
        let token;
        token = jwt.sign(
            {userId: user._id, email: user.email, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: '10h'}
        )

        res.status(200).json({
            message:"Login Sucessfull",
            token,
            user:{
                userId: user._id,
                userName: user.userName,
                email: user.email,
                role:user.role,
            }
        })

    }
    catch(error){
        res.status(500).json({message:"Internal server error while Loggin in"});
    }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.status(200).json({
      success: true,
      message: "Fetched all users successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching users",
    });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (req.user._id.toString() === userId) {
      return res.status(400).json({ success: false, message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error while deleting user" });
  }
};
export {
    register,
    login,
    getAllUsers,
    deleteUser
}
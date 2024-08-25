import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

export const Register = async (req, res) => {
  try {
    
    const userExists = await User.findOne({email: req.body.email});
    if (userExists) {
     return res.send({ status: false, message: "User already exists!" });
    }
    //hash password

    const hashedPassword = await bcrypt.hash(req.body.password,10);
    req.body.password = hashedPassword;

    //save user
    const user = new User(req.body);
    await user.save();

    return res.send({ status: true, message: "User registered successfully!" });
  } catch (err) {
   return res.send({ status: false, error: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (!userExists) {
      return res.send({ status: false, message: "User not found!" });
    }

    const { password } = req.body;
    const compare = await bcrypt.compare(password, userExists.password);

    if (!compare) {
      return res.send({ status: false, message: "Invalid password" });
    }
    console.log(userExists._id);
    //generate token
    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.send({
      status: true,
      message: "user loggedin successfully!",
      data: token,
      
    });
  } catch (err) {
    return res.send({ status: false, error: err });
  }
};


export const getCurrentUser = async(req,res) =>{
  try{
      const user = await User.findOne({_id:req.body.userId});

      return res.send({status:true,message:'User fetched successfully',data:user});
  }catch(error){
    return res.send({status:false,message:error.message})
  }
}
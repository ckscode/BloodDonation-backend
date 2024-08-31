import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import Inventory from "../Models/inventoryModel.js";
import mongoose from "mongoose";

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

    if(userExists.userType !== req.body.type){
      return res.send({status:false,message:`User not register as a ${req.body.type}`})
    }

    const { password } = req.body;
    const compare = await bcrypt.compare(password, userExists.password);

    if (!compare) {
      return res.send({ status: false, message: "Invalid password" });
    }
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


export const getAllDonorOfOrg = async(req,res) =>{
  try{
  const organisation = new mongoose.Types.ObjectId(req.body.userId)
  const uniqueDonors = await Inventory.distinct('donor',{organisation})
  
   const donorIn = await User.find({
    _id:{$in:uniqueDonors}
   }
   )    
 
    return res.send({status:true,message:'Donors fetched successfully',data:donorIn});
}catch(error){
  return res.send({status:false,message:error.message})
}
}

export const getAllHospitalsOfOrg = async(req,res) =>{
  try{
    const organisation = new mongoose.Types.ObjectId(req.body.userId)
    const uniqueHospitals = await Inventory.distinct('hospital',{organisation})
    
     const hospitals = await User.find({
      _id:{$in:uniqueHospitals}
     }
     )    

      return res.send({status:true,message:'Hospitals fetched successfully',data:hospitals});
}catch(error){
  return res.send({status:false,message:error.message})
}
}


export const getAllOrganisationOfOrg = async(req,res) =>{
  try{
    const donor = new mongoose.Types.ObjectId(req.body.userId)
    const uniqueOrg = await Inventory.distinct('organisation',{donor})
    
     const organisations = await User.find({
      _id:{$in:uniqueOrg}
     }
     )    
     
      return res.send({status:true,message:'Organisations fetched successfully',data:organisations});
}catch(error){
  return res.send({status:false,message:error.message})
}
}


export const getAllOrganisationForHos = async(req,res) =>{
  try{
    const hospital = new mongoose.Types.ObjectId(req.body.userId)
    const uniqueOrg = await Inventory.distinct('organisation',{hospital})
    
     const organisations = await User.find({
      _id:{$in:uniqueOrg}
     }
     )    

      return res.send({status:true,message:'Organisations fetched successfully',data:organisations});
}catch(error){
  return res.send({status:false,message:error.message})
}
}



import Inventory from "../Models/inventoryModel.js";
import User from "../Models/userModel.js";
import mongoose from "mongoose";

export const addInventory = async(req,res) =>{
     try{
        const user =await User.findOne({email:req.body.email});
        if(!user){
            throw new Error('Invalid Email');
        }

        if(req.body.inventoryType === 'in' && user.userType !== 'donor'){
            throw new Error('This email is not registered as donor')
        }

        if(req.body.inventoryType === 'out' && user.userType !== 'hospital'){
            throw new Error('This email is not registered as hospital')
        }

        if(req.body.inventoryType === 'in'){
            req.body.donor = user._id;
        }else{
            req.body.hospital = user._id;
        }

       
        if(req.body.inventoryType === 'out'){
             const requestedGroup = req.body.bloodgroup;
             const requestQuantity = req.body.quantity;
             const organisation = new mongoose.Types.ObjectId(req.body.userId);
             const totalInOfRequestedGroup = await Inventory.aggregate([
                {
                    $match:{
                        organisation,
                        inventoryType:"in",
                        bloodgroup:requestedGroup
                    },
                },
                {
                    $group:{
                        _id:"$bloodgroup",
                        total:{$sum:"$quantity"}
                    }
                }
             ])
           
         const totalIn = totalInOfRequestedGroup[0]?.total || 0;
         
         const totalOutOfRequestedGroup = await Inventory.aggregate([
            {
                $match:{
                    organisation,
                    inventoryType:"out",
                    bloodgroup:requestedGroup
                },
            },
            {
                $group:{
                    _id:"$bloodgroup",
                    total:{$sum:"$quantity"}
                }
            }
         ])

     const totalOut = totalOutOfRequestedGroup[0]?.total || 0;

   const availableQuantityOfRequestedGroup = totalIn - totalOut;


   if(availableQuantityOfRequestedGroup === 0){
    throw new Error(`${requestedGroup} is not available`);
   }

   if(requestQuantity>availableQuantityOfRequestedGroup){
     throw new Error(`Only ${availableQuantityOfRequestedGroup} units of ${requestedGroup} is available!`);
   }

   
            req.body.hospital = user._id;
        }else{
            req.body.donor = user._id;
        }

        const inventory = new Inventory(req.body);
        await inventory.save();

        return res.send({status:true,message:'Inventory Added Successfully'})

     }catch(error){
         return res.send({status:false,message:error.message})
     }
}

export const getInventory = async(req,res) =>{
    try{
        const inventory = await Inventory.find({organisation:req.body.userId}).populate([
            { path: 'donor' },   
            { path: 'hospital' }, 
          ]);
        return res.send({status:true,data:inventory})
    }catch(error){
        return res.send({status:false,message:error.message})
    }
}
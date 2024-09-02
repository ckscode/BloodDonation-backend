import Inventory from "../Models/inventoryModel.js"
import mongoose from "mongoose";


export const bloodgroupData = async(req,res) =>{
try{

const allBloodGroups = ['A+','A-','AB+','AB-','B+','B-','O+','O-'];
const organisation = new mongoose.Types.ObjectId(req.body.userId);
const bloodgroupsData=[];

await Promise.all(
    allBloodGroups.map(async(bloodgroup)=>{
        
        const totalIn = await Inventory.aggregate([
            {
                $match:{
                   bloodgroup:bloodgroup,
                   inventoryType:'in',
                   organisation
                }
             },
             {
               $group:{
                     _id:null,
                     total:{
                        $sum:'$quantity'
                     }
               }
             }
        ])

        const totalOut = await Inventory.aggregate([
            {
                $match:{
                   bloodgroup:bloodgroup,
                   inventoryType:'out',
                   organisation
                }
             },
             {
               $group:{
                     _id:null,
                     total:{
                        $sum:'$quantity'
                     }
               }
             }
        ])

        
        const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)

        bloodgroupsData.push({
            bloodgroup,
            totalIn:totalIn[0]?.total || 0,
            totalOut:totalOut[0]?.total || 0,
            available
        })
    })
)

res.send({
    status:true,
    message:"Blood Groups",
    data:bloodgroupsData
})
}catch(error){
    return res.send({status:false,message:error.message})
}
}
import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        inventoryType:{
            type:String,
            required:true,
            enum:['in','out']
        },
        bloodgroup:{
            type:String,
            required:true,
            enum:['A+','A-','AB+','AB-','B+','B-','O+','O-']
        },
        quantity:{
            type:Number,
            required:true,
        },
        organisation:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true
        },
        email:{
            type:String,
            required:true
        },

        //if inventory "out" Hospital will be set
        //if inventory "in" Donor will be set
        hospital:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:function(){
                if(this.inventoryType === "out"){
                    return true
                }
                return false
            }
        },
        donor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:function(){
                if(this.inventoryType === "in"){
                    return true
                }
                return false
            }
        }
    },
    {
        timestamps:true
    } 
)

const Inventory = mongoose.model('inventories',InventorySchema);

export default Inventory;
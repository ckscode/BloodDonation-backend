import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userType:{
        type:String,
        required:true,
        enum:['donor','organisation','hospital','admin']
    },
    name:{
        type:String,
        required:function(){
            if(this.userType === 'admin' || this.userType === 'donor'){
                return true;
            }
            return false;
        }
    },
    hospitalName:{
        type:String,
        required:function(){
            if(this.userType === 'hospital' ){
                return true;
            }
            return false;
        }
    },
    organisationName:{
        type:String,
        required:function(){
            if(this.userType==='organisation'){
                return true;
            }
            return false;
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    website:{
        type:String,
        required:function(){
            if(this.userType === 'hospital' || this.userType === 'organisation'){
                return true;
            }
            return false;
        }
    },
    address:{
        type:String,
        required:function(){
            if(this.userType === 'hospital' || this.userType === 'organisation'){
                return true;
            }
            return false;
        }
    }
},{
    timestamps:true
})

const User = mongoose.model('users',userSchema);

export default User;
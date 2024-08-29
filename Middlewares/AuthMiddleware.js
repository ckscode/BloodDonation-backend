import jwt from 'jsonwebtoken'

export const protect=(req,res,next)=>{
    try{
        const token =req.header("authorization").replace("Bearer ","");
        const decryptedData = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decryptedData.userId;
        next();
    }catch(error){
        return res.send({status:false,message:error.message})
    }
}
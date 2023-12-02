import UserModel from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
    static userRegistration=async(req,res)=>{
        const {name,email,password,password_conf,tc}=req.body
        const user=await UserModel.findOne({email:email});
        if(user)
        {
         res.send("staus:failed","email-already-exist");
        }
        else{
            if(name&& email && password && password_conf && tc)
            {
          if(password===password_conf)
            {
                try{
                const salt=await bcrypt.genSalt(10);
                const hashPass=await bcrypt.hash(password,salt);
                const doc=new UserModel({
                    name:name,
                    email:email,
                    password:hashPass,
                    tc:tc
                })
                await doc.save()
            }
            catch(err)
            {
                res.send("registarion-failed")
            }
            }
            else{
                res.send("password and confirm password donot match")
            }
            }
            else{
                res.send("all fields are required");
            }
        }
    }
}

export default UserController;
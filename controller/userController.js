import UserModel from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
    static userRegistration=async(req,res)=>{
        const {name,email,password,password_conf,tc}=req.body
        const user=await UserModel.findOne({email:email});
        console.log(user,"user")
        if(user)
        {
         res.send("staus:failed-email-already-exist");
        }
        else{
            if(name && email && password && password_conf && tc)
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
                const saved_user=await UserModel.findOne({email:email});
                //Generate token
                const token=jwt.sign({userID:saved_user._id},
                process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                res.status(201).send({"status":"success","message":"Registartion suc","token":token});
            }
            catch(err)
            {
                res.send("registarion-failed")
            }
            }
            else{
                res.send("password and confirm password do'not match");
            }
            }
            else{
                res.send("all fields are required");
            }
        }
    }
    static userLogin=async(req,res)=>{
        try{
        const {email,password}=req.body;
        if(email && password)
        {
            const user=await UserModel.findOne({email:email});
            if(user!=null)
            {
             const isMatch=await bcrypt.compare(password,user.password);
             if(isMatch && (email===user.email))
             {
             
                //Generate token
             const token=jwt.sign({userID:user._id},
            process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
            res.status(201).send({"status":"success","message":"login suc","token":token});
        }
             
             else
             {
                res.send("Passwword or email don't match");
             }
            }
            else{
                res.send("First register");
            }
        }
        else
        {
            res.send("All fields are required");
        }
        }catch(err)
        {
      res.send("Unable to login")
        }
    }
}

export default UserController;
import User,{validateStudent}from '../model/userShema.js'
import Payment from '../model/paymentSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv/config'
import user from '../middleware/user.js'
import mongoose from 'mongoose'

//registeration
const regUser=async(req,res)=>{
    
    const saltRounds=10;
    const cryptPass= await  bcrypt.hash(req.body.password,saltRounds)
    
        var add={
            registerNo:req.body.registerNo,
            name:req.body.name,
            course:req.body.course,
            batch:req.body.batch,
            email:req.body.email,
            password:cryptPass  ,
            }  
     const {error}=validateStudent(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //add user in users      
            try {
            const findUser= await User.findOne({email:req.body.email},{})//find email from user in user(db)
            // console.log(findUser)
             if(findUser){
                return res.status(400).send("user already in")
            }
            else{
                var insert=await User.insertMany([add])//insert new user in mca(db)
               
                res.send(insert)
            }
           
            } catch (error) {
                console.log(error.message)
            }
    
    }


 //login user
const loginUsers=async(req,res)=>{
        const email=req.body.email;
        const pwd=req.body.password
        // console.log(pwd);
        try {
            const logUser=await User.findOne({email:email},{})//find all user using and condition
            // console.log(logUser.password);
        
            if (logUser) {
              const bhash=await  bcrypt.compare(pwd, logUser.password).then(function(result) {
                    if(result) {
                        const token= jwt.sign({_id:logUser._id,isCashier:logUser.isCashier},"" + process.env.SECRET_KEY)
                        return res.header('x-auth',token).send(token)
                    }
                    else{
                          res.send("incorrect password")
                   }
                });
               
            }
            if(!logUser){
            res.send("email is not valid");
            }
            
        } catch (error) {
            console.log(error)
        }

}

//view profile
const viewUser=async(req,res)=>{
    try{
        const user=await User.find({registerNo:req.body.registerNo},{_id:0,__v:0,password:0,isCashier:0})
        res.send(user)
        
    } catch (error) {
        console.log(error.message);
    }
    
}

//edit profile
const editUser=async(req,res)=>{
    let registerNo=req.body.registerNo
try {
    
    const update=await User.findOneAndUpdate({registerNo:registerNo},{$set:{name:req.body.name,course:req.body.course}})
    res.send('update successfully')
    
    
} catch (error) {
    console.log(error.message);
}
}

//user view their transactions
const viewTrans=async(req,res)=>{
    const registerNo=req.body.registerNo
    const findUser=await User.find({registerNo:registerNo})
    console.log(findUser);

    try {
        const pay=await Payment.aggregate([ {$match:{paidBy:findUser[0]._id}},
            {$group:{_id:{paidFor:'$paidFor'},transaction:{$sum:1}}},
       ])
       const popQ=[{path:'paidBy',model:'Payment'}]
       const final=await Payment.populate(pay,popQ) 
        res.send(final);
    } catch (error) {
        console.log(error.message);
    }
}

//find total for the mca
const mcaTotal=async(req,res)=>{
    try {
        const totAmount=await Payment.aggregate([{$group:{_id:null,totalPaid:{$sum:'$paidAmount'}}}])
        res.send(totAmount)
        
    } catch (error) {
        console.log(error.message);
    }

}

export {regUser,loginUsers,viewUser,editUser,viewTrans,mcaTotal}
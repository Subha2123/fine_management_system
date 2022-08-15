import Cashier,{validateCashier} from '../model/cashierSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv/config'

const secret=process.env.SECRET_KEY
 //registeration
const regCashier=async(req,res)=>{
   
    const saltRounds=10;
    const cryptPass= await  bcrypt.hash(req.body.password,saltRounds)
    
        var add={
            email:req.body.email,
            password:cryptPass ,
            }  
     const {error}=validateCashier(req.body)
     if(error) return res.status(400).send(error.details[0].message);
     
            try {
            const findCashier= await Cashier.findOne({email:req.body.email},{})//find email from user in user(db)
            // console.log(findUser)
             if(findCashier){
                return res.status(400).send("user already in")
            }
            else{
                var insert=await Cashier.insertMany([add])//insert new user in mca(db)
               
                res.send(insert)
            }
           
            } catch (error) {
                console.log(error.message)
            }
    
    }


const loginCashier=async(req,res)=>{
        const email=req.body.email;
        const pwd=req.body.password
        // console.log(pwd);
        try {
            const logCashier=await Cashier.findOne({email:email},{})//find all user using and condition
            // console.log(logUser.password);
        
            if (logCashier) {
              const bhash=await  bcrypt.compare(pwd, logCashier.password).then(function(result) {
                    if(result) {
                        const token= jwt.sign({_id:logCashier._id,isCashier:logCashier.isCashier},secret)
                        return res.header('x-auth',token).send(token)
                    }
                    else{
                          res.send("incorrect password")
                   }
                });
               
            }
            if(!logCashier){
            res.send("email is not valid");
            }
            
        } catch (error) {
            console.log(error)
        }

    }




export {regCashier,loginCashier}
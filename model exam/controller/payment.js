import Payment from "../model/paymentSchema.js";
import Cashier from '../model/cashierSchema.js'
import User from '../model/userShema.js'
import express from 'express'



//add payment for user
// console.log(Payment.schema.path('paidBy').enumValues);

const addPayment=async(req,res)=>{
    let email=req.body.email
    
   try {
    const logCashier=await Cashier.findOne({email:email},{})
    if (logCashier) {
        const regNo=req.body.registerNo
        const findUser=await User.find({registerNo:regNo})

          let  paidBy=findUser[0].registerNo
          let paidAmount=req.body.paidAmount
          let  paidFor= req.body.paidFor
         
          var insert=await Payment.insertMany([{
                paidAmount,paidBy,paidFor
                }])  
                return res.send(insert) 
            }

      if(!logCashier){
      res.send("email is not valid");
      }
      
    
   } catch (error) {
    console.log(error.message);
   }
}

//update payment for user
const updatePayment=async(req,res)=>{
try {
    const regNo=req.body.registerNo
    const findUser=await User.find({registerNo:regNo})
    // const paidBy=req.body.paidBy

    if(findUser){
        const update=await Payment.findOneAndUpdate({paidBy:findUser[0]._id},{$set:{date:new Date(req.body.date)}},{new:true})
         return res.status(200).send(update)
    }
    else{
        res.send('there is no student in this id')
    }
} catch (error) {
    console.log(error.message);
}
}

//get total payment for tha users
const getAllpay=async(req,res)=>{

//get user input
 const totAmount=await Payment.aggregate([{$group:{_id:null,totalPaid:{$sum:'$paidAmount'}}},{$project:{_id:0}}])
 res.send(totAmount)
}

//get particular payment

const getOnePay=async(req,res)=>{
    const regNo=req.body.registerNo
    const findUser=await User.find({registerNo:regNo})
    const find_id=findUser[0]._id

    const findPay=await Payment.aggregate([
        {$match:{paidBy:find_id}},
        {$group:{_id:null,paid:{$sum:'$paidAmount'}}}
        ]) 
console.log(findPay); 
}

//get fine type wise
const fineType=async(req,res)=>{
    const paidFor=req.body.paidFor
    const pay=await Payment.aggregate([
        {$match:{paidFor:paidFor}},{$group:{_id:'$paidFor',total:{$sum:'$paidAmount'}}},
        {$project:{__v:0}} 
        ])  
        const popQ=[{path:'paidBy' ,select: '-_id  name registerNo',}]
        const final=await Payment.populate(pay,popQ)
        res.send(final);
}


//get fine date wise
const fineDate=async(req,res)=>{
    const from= new Date(req.body.date)
    const to=req.body.date
    console.log(from);
    console.log(to);
   
    const findTotal=await Payment.aggregate(
        [{$match: {date: { $gte:new Date(from),$lte:new Date(to)}}},
        {$group:{ _id:null,totalAmount:{ $sum:'$paidAmount' }}},
        {$project:{'_id':0}}
        ])
      res.send(findTotal);
}

// const extra=async(req,res)=>{
//     const getid=req.body.id
//     // do aggregation
//  const pay=await Payment.aggregate([
//      {$match:{paidBy:register}},
//      {$project:{_id:0,__v:0}} 
//      ])  
//  console.log(pay);
//  // for populate statement
//   const popQ=[{path:'paidBy' ,select: '-_id  name registerNo',}]
 
//  // combined aggregation and populate
//   const final=await Payment.populate(pay,popQ)
//   res.send(final);

// });


export {addPayment,updatePayment,getAllpay,getOnePay,fineType,fineDate}
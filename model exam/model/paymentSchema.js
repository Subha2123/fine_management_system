import mongoose from "mongoose";
import User from './userShema.js'


const paymentSchema={
    date:{
      type:Date,
      default:Date.now(),
      required:true
    },
    paidAmount:{
        type:Number,
        enum:[20,5,10],
        required:true
    },
    paidBy:{
      type:mongoose.Schema.Types.String,
      ref:'User',
      required:true,
      
    },
    paidFor:{
        type:String,
        enum:['Late comers','Late submission assignment','Informal dress code'],
        required:true
    }
 
}

const Payment=mongoose.model('Payment',paymentSchema)

export default Payment  

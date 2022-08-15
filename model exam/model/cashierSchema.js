import mongoose from "mongoose";
import Payment from "./paymentSchema.js";
import Joi from 'joi'


const CashierSchema={
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isCashier:{
        type:Boolean,
        default:true
    }
}

const Cashier=mongoose.model('Cashier',CashierSchema)

const validateCashier= (value) => {
    
    const schema = Joi.object({
     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required().min(3),
      isCashier: Joi.boolean()

    });
    const result = schema.validate(value)
  
    return result  
  };


export default Cashier

export {validateCashier}
import mongoose from 'mongoose'
import Joi from 'joi'

const userSchema={
    registerNo:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
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
        default:false
    }
}





const validateStudent= (value) => {
    const schema = Joi.object({
      registerNo:Joi.string().min(6),
      name: Joi.string().min(3),
      course:Joi.string().min(3),
      batch:Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required().min(3),
      isCashier:Joi.boolean()

    });
    const result = schema.validate(value)
  
    return result  
  };

const User=mongoose.model('User',userSchema)


export {validateStudent}
export default User
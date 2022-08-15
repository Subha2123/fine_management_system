import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv/config'



function user(req,res,next){
    if(req.user.isCashier!==false) return res.status(403).send('Access denied')
     next();
}

export default user
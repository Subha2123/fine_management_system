import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv/config'


function auth(req,res,next){
    const token=req.header('x-auth')
    if(!token) return res.status(401).send('Access denied')
    try {
    const decode=jwt.verify(token,"" + process.env.SECRET_KEY)
    req.user=decode
    next();   
    } catch (error) {
        console.log(error.message);
        res.status(400).send('invalid token')
    }

}

export default auth
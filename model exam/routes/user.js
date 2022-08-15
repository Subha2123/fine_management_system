import { regUser,loginUsers, viewUser ,editUser, viewTrans, mcaTotal} from "../controller/user.js";
import express from 'express'
import auth from '../middleware/auth.js'
import user from '../middleware/user.js'

const router=express.Router()




router.post('/register',regUser)
router.post('/login',loginUsers)
router.get('/view',[auth,user],viewUser)
router.put('/edit',[auth,user],editUser)
router.get('/view/transaction',[auth,user],viewTrans)
router.get('/mca/total',mcaTotal)

export default router
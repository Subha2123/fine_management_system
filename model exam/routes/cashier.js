import { regCashier,loginCashier } from '../controller/cashier.js';
import express from 'express'



const router=express.Router()




router.post('/register',regCashier)

router.post('/login',loginCashier)


export default router

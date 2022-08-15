import { addPayment ,getAllpay,updatePayment,getOnePay,fineType,fineDate} from "../controller/payment.js";
import express from 'express'
import auth from '../middleware/auth.js'
import cashier from "../middleware/cashier.js";


const router=express.Router()


router.post('/addpayment',[auth,cashier],addPayment)
router.put('/updatepayment',[auth,cashier],updatePayment)
router.get('/allpayment',[auth,cashier],getAllpay)
router.get('/onepayment',[auth,cashier],getOnePay)
router.get('/typewise',[auth,cashier],fineType)
router.get('/datewise',[auth,cashier],fineDate)
// router.get('/extra',extra)

export default router

 
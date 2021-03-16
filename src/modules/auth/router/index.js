import { Router } from "express";
import httpHandler from "../../commons";
import authServices from "../services";

const router = Router();

router.post('/register',httpHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    const code = await authServices.register({name, email, password});
    res.send({code});
}));

router.post('/verify',httpHandler(async(req,res,next)=>{
    const {code, email} = req.body;
    await authServices.verifyEmail({code,email});
    res.send({message:'successfully verified'});
}));

router.post('/login',httpHandler(async(req,res,next)=>{
    const {email,password} = req.body;
    await authServices.login({email,password});
    res.send({message:'logged in succcessfully'})
}));

router.get('/reset-password-request',httpHandler(async(req,res,next)=>{

}));

router.post('/reset-password',httpHandler(async(req,res,next)=>{

}));

router.post('/change-password',httpHandler(async(req,res,next)=>{

}));

export default router;


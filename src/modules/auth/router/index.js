import { Router } from "express";
import httpHandler from "../../commons";
import authServices from "../services";

const router = Router();

router.post('/register',httpHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    await authServices.register({name, email, password});
    res.send("registered successfully");
}))


router.post('/verify',httpHandler(async(req,res,next)=>{

}))


router.post('/login',httpHandler(async(req,res,next)=>{

}))

export default router;


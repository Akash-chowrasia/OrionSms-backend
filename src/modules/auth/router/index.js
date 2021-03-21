import assert from "assert";
import { Router } from "express";
import httpHandler from "../../commons";
import authServices, { getSession } from "../services";

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
    const code=await authServices.login({email,password});
    res.cookies('session_id',code);
    res.send({message:'logged in succcessfully'})
}));

router.get('/reset_password_request',httpHandler(async (req, res) => {
      const { email } = req.body;
      const code = await authService.reset_password_request(email);
      res.send({ code });
    })
  );



router.post('/reset_password',httpHandler(async(req,res,next)=>{
    const {code,newPassword}=req.body;
     

}));



router.put('/change-password',httpHandler(async(req,res,next)=>{
    const {email,password,newPassword}=req.body;
    console.log(req.body);
    await authServices.passwordChange({email,password,newPassword})
    res.send({message:"Password change succesfully"})

}));
router.get('/who-am-i',httpHandler(async(req,res,next)=>{
  const sessionId = req.cookies.session_id;
  const {email}=await getSession(sessionId);
  const record = await authServices.getData(email);
  res.send(record) 
}
 ))
 
export default router;


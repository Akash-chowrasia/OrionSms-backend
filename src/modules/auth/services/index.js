import authModels from "../models";
import md5 from 'md5';
import assert from "assert";
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import { nanoid } from "nanoid";

const authServices = {}

authServices.register = async({name,email,password})=>{
    assert(name!==null,createError(StatusCodes.CONFLICT,'name required'));
    const hashedPassword = md5(password);
    await authModels.user.create({name, email,password:hashedPassword});//db write 
    const code = nanoid(50);
    await authModels.verificationCodeModel.create({email,code});
    return code;
}

authServices.verifyEmail = async({code, email}) =>{
    const record = await authModels.verificationCodeModel.findOne({code});
    if(!record)createError(StatusCodes.BAD_REQUEST,'check your code ');
    await authModels.user.findOneAndUpdate({email},{is_verified:true});
    await authModels.verificationCodeModel.findOneAndDelete({code});
}

authServices.login = async({email,password}) =>{
    const record = await authModels.user.findOne({email});
    if(!record) createError(StatusCodes.BAD_REQUEST,'user nor registered');
    if(record.is_verified !== true)createError(StatusCodes.BAD_REQUEST,'verify your email');
    const hashpassword = md5(password);
    if(record.password !== hashpassword) createError(StatusCodes.UNAUTHORIZED,'enter correct password');
    const code=nanoid(50);
    await authModels.session.create({session_id:code,email});
    return code;

}

authServices.passwordChange=async({email,password,newPassword})=>{
    const record = await authModels.user.findOne({email,password});
    if(!record) createError(StatusCodes.BAD_REQUEST,'user not registered');
    if(record.password!==md5(newPassword)) createError(StatusCodes.BAD_REQUEST,'Your old and new password must be different')
    const hashnewPassword=md5(newPassword)
    await authModels.user.findOneAndUpdate({email},{password:hashnewPassword})
}
authServices.getData = async(email)=>{
    const record = await authModels.user.findOne({email},{password:0});
    assert(record !== null,createError(StatusCodes.BAD_REQUEST,'Email id not registered'));
    return record; 
}
export const getSession = async(session)=>{
    const sessionRecord =await authModels.session.findOne({session_id:session});
    assert(sessionRecord!==null,createError(StatusCodes.UNAUTHORIZED,'please login first'));
    return sessionRecord;
}
authServices.reset_password_request = async(email)=>{
    const code=nanoid(50);
    await authModels.reset_password.create({code,email});
    return code;
}
authServices.reset_password = async(code,newPassword)=>{
    const data = await authModels.resetPassword.findOne({ code });
    
}

export default authServices;  
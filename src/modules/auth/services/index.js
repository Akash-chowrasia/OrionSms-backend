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
    await authModels.user.create({name, email,password:hashedPassword});
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
}

export default authServices;
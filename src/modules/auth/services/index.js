import authModels from "../models";
import md5 from 'md5';
import assert from "assert";
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';

const authServices = {}

authServices.register = async({name,email,password})=>{
    assert(name!==null,createError(StatusCodes.CONFLICT,'name required'));
    const hashedPassword = md5(password);
    await authModels.user.create({name, email,password:hashedPassword});
}



export default authServices;
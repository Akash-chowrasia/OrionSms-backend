import authModels from "../models";
import md5 from 'md5';

const authServices = {}
authServices.register = async({name,email,password})=>{
    const hashedPassword = md5(password);
    await authModels.user.create({name, email,password:hashedPassword});
}



export default authServices;
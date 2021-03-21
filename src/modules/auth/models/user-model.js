import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    is_verified:{
        type:Boolean,
        default:false,
    },
    newPassword:{
        type:String,
    }
})

export default mongoose.model('user_records',schema);
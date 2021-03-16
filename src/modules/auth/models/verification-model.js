import mongoose from 'mongoose';

const schema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})


export default mongoose.model('verification_code_record',schema);
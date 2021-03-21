import mongoose from 'mongoose';
const schema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

});
export default mongoose.model('reset-password',schema);
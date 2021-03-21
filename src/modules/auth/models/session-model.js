import mongoose from 'mongoose';
const schema = mongoose.Schema({
    session_id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date
    }
});
export default mongoose.model('session_store',schema);
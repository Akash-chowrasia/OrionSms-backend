import mongoose from 'mongoose';

const URL = 'mongodb://localhost/ORION_SMS';

(async () =>{
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology:true
        });
        console.log('Database connected successfully');
    }catch (err){
        console.error('Database connection error');
    }
})();

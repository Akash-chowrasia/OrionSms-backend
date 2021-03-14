import { Router } from 'express';
import authRouter from './router';


const router = Router();

router.use('/auth',authRouter);


const authModule = {
    init:(app) =>{
        app.use(router);
        console.log('auth module loaded successfully');
    }
}

export default authModule;

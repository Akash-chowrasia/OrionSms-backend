import { Router } from 'express';
import studRouter from './router';

const router = Router();

router.use('/student',studRouter);

export default authModule = {
    init:(app) =>{
        app.use(router);
    }
}

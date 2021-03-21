import './modules/db';
import {generateApp,  finishApp } from './app';
import httpHandler from './modules/commons';
import authModule from './modules/auth';
const PORT = 3000;
const app = generateApp();
authModule.init(app);

app.get('/',httpHandler(async(req,res,next)=>{
    res.send("welcome to This new world, how can i help you ..... ");
}))

finishApp(app);



(async()=>{
    try{
        await app.listen(PORT);
        console.log('server is listening on port 3000...')
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
})();

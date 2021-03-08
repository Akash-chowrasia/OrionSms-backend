
import './modules/db';
import {generateApp,  finishApp } from './app';
import httpHandler from './modules/commons';

const PORT = 3000;


const app = generateApp();

app.get('/',httpHandler(async(req,res,next)=>{
    res.send('you are at the default path of OrionSMS......');
}));

finishApp(app);



(async()=>{
    try{
        await app.listen(PORT);
        console.log('server is listening on port 8080...')
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
})();

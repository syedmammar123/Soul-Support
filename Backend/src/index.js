import  dotenv from 'dotenv'
dotenv.config();
import connectDb from './db/index.js';
import { app } from './app.js';

const port = process.env.PORT || 3000;
connectDb().then(()=>{
    app.on("error",(error)=>{
        console.log("Error:",error);
        throw error;
    })
    app.listen(port,()=>{
        console.log(`Server running on http://localhost:${port}`);
    })
}).catch(
    (err)=>{console.log("MongoDb connection failed!",err)}
)
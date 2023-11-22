import express from 'express'
import  cookieParser from 'cookie-parser'
import  dotenv from 'dotenv'
dotenv.config();
import connectDb from './db/index.js';

const port = process.env.PORT || 3000;
connectDb()
const app = express();
app.use(express.json()); //parse json object from client in req 

app.use(express.urlencoded({extended:true})) //parse string or array req from client 

app.use(cookieParser())

app.get('/api/jokes',(req,res)=>{
	const jokes = [{
		id:"1",
		joke:"haha"
	},{
		id:"2",
		joke:"hah3"
	},{
		id:"3",
		joke:"heha"
	},]
	res.send(jokes)
})



app.listen(port,()=>{
	console.log(`Server running on http://localhost:${port}`);
});
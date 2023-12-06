import express from 'express'
import cors from 'cors'
import  cookieParser from 'cookie-parser'
import blogRoutes from './routes/blogRoutes.js'

const app = express();

app.use(cors(
    {origin:process.env.CORS_ORIGIN,
    credentials:true}
))

app.use(express.json()); //parse json object from client in req 
app.use(express.urlencoded({extended:true})) //parse string or array req from client in url
express.static("public")
app.use(cookieParser())

app.use("/api/blogs",blogRoutes)
app.use("/api/users",userRoutes)

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





export {app}




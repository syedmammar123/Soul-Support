import express from 'express'
import cors from 'cors'
import  cookieParser from 'cookie-parser'
// import  bodyParser from 'body-parser'


const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
    {origin:process.env.CORS_ORIGIN,
    credentials:true}
))

app.use(express.json()); //parse json object from client in req 
app.use(express.urlencoded({extended:true})) //parse string or array req from client in url
express.static("public")
app.use(cookieParser())


//importing Routes
import blogRoutes from './routes/blog.routes.js'
import userRoutes from './routes/user.routes.js'

//Routes declaration
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/blogs",blogRoutes)

//http:localhost:3000/users/register

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




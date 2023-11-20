import express from 'express'

const app = express();

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

const port = process.env.PORT || 3000;

app.listen(port,()=>{
	console.log(`Server running on http://localhost:${port}`);
});
const express = require('express');
const PORT = process.env.PORT || 3060;
const axios = require('axios');
const app = express();

var tokens = [];

app.use(express.json());
app.use(express.urlencoded({
	extended:true
}));

app.get('/',(req,res)=>{
	res.send('Listening API!');
})

app.post('/api/products',(req,res)=>{
	const id = req.body.id;
	tokens.forEach(contenido => {
		if(contenido[0] === id){
			var user = {id: id}
			let headConfig = {
				headers: {'authorization':contenido[1]}
			}
			axios.post('http://ec2-54-159-11-0.compute-1.amazonaws.com:3050/api/products',
				user,headConfig
			)
				.then(function(response){
					res.send(response.data)
				})
				.catch(function(error){
					res.send(error);
				})
		}
	});
});

app.post('/login',(req,res)=>{
	const id = req.body.id
	axios.post('http://ec2-54-159-11-0.compute-1.amazonaws.com:3050/api/register', {
    id: id
  })
  .then(function (response) {
		tokens.push([id,response.data.token]);
    res.send(response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });	
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))

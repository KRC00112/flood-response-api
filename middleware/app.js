const express=require("express");
const app=express();

const cors=require("cors");
const port=8080;

app.use(cors());
app.use(express.json())


app.get('/health',async(req,res)=>{
    const response=await fetch(`https://flood-response-api.onrender.com/health`);
    const data=await response.json();
    res.send(data);
})

app.get('/api/v1/disasters', async(req, res)=>{
    const response =await fetch(`https://flood-response-api.onrender.com/api/v1/disasters`);
    const data=await response.json();
    res.send(data);
})

app.get('/api/v1/disasters/{:id}', async(req, res)=>{
    const response =await fetch(`https://flood-response-api.onrender.com/api/v1/disasters/${req.params.id}`);
    const data=await response.json();
    res.send(data);
})


app.post('/api/v1/disasters', async(req, res)=>{
    const response =await fetch(`https://flood-response-api.onrender.com/api/v1/disasters`,{
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(req.body)
        });
    const data=await response.json();
    res.send(data);
})





app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/short-url")
.then(()=>{console.log("connected to mongodb")})
.catch((err)=>{
    console.log("Error in connection " + err);
})
const port = 3000
const urlRoute = require('./routes/url')



app.use(express.json());
app.use('/url' , urlRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

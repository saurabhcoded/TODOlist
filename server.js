const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
//databse configurations
const url = process.env.DATABASE_URL || `mongodb+srv://HEALTHBOOK:HEALTHBOOK@cluster.cirkd.mongodb.net/todo?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;

mongoose.connect(url,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Database connected successfully")
}).catch(err=>{
    console.log("error database is not connected")
    process.exit();
})





app.use("/",require('./routes/Item'))

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
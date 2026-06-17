const express = require('express');

require('dotenv').config();

const app = express();


const db = require('./db')

const bodyParser = require('body-parser');

app.use(bodyParser.json());



const PORT = process.env.PORT || 4000



// app.get('/' ,function (req,res){

//         res.send("hello")

// })

const userRoutes = require('./routes/userRoutes');


const messageRoutes = require('./routes/messageRoutes');

app.use('/user',userRoutes);

app.use('/message',messageRoutes);




app.listen(PORT,()=>{
        console.log("server is live")
})

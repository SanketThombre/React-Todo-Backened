

const express = require('express');
const {login,register} = require('./Controllers/AuthController')
const connect = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());

app.post("/register", register);
app.post("/login", login);

app.listen(8080, async() =>  { 
    try {
      await connect()
      
        console.log("listening to port 8080");
    }
    catch(err) {
        console.log(err)
    }
})

 
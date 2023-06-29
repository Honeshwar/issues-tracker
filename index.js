 
//plane nodejs server
// const http = require('http');//module use
// const server = http.createServer();

// server.listen(5000,(e)=>{
//     if(e){
//         console.log("error",error);
//         return;
//     }
//     console.log("server running on port: 5000");
// });

//set up express app
const express = require("express");
const app = express();
const db = require('./config/mongoose');
//MW to decode req
app.use(express.urlencoded());

//to setup ejs
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));//path views folder give to template engine , so it can find .render(file)

//MW for assets static file provider
app.use(express.static(path.join(__dirname,"/assets")));


//require router mw to use router
app.use('/',require("./routers/homeRouter")); //for any url start with '/' a router mw get called
app.listen(8000,(e)=>{
    if(e){
        console.log("error",error);
        return;
    }
    console.log("server running on port: 8000");
});
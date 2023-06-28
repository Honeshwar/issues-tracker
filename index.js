 
//plane nodejs server
// const http = require('http');
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

//MW for assets static file provide
app.use(express.static(path.join(__dirname,"/assets")));

// app.get('/',(req,res)=>{
//     res.render('home',{
//         projects:[
//             {title:"movie cart",author:"Xenim"},
//             {title:"shop cart",author:"hon"},
//             {title:"lens cart",author:"yon"},
//             {title:"food cart",author:"ok"},
//             {title:"shoes cart",author:"zin"},
//             {title:"movie cart",author:"Xenim"},
//             {title:"shop cart",author:"hon"},
//             {title:"lens cart",author:"yon"},
//             {title:"food cart",author:"ok"},
//             {title:"shoes cart",author:"zin"}
//         ]
//     })
// }) 

//router mw to use router
app.use('/',require("./routers/homeRouter")); //for any url start with '/' a router mw get called
app.listen(8000,(e)=>{
    if(e){
        console.log("error",error);
        return;
    }
    console.log("server running on port: 8000");
});
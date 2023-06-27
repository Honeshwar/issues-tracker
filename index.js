
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

app.listen(8000,(e)=>{
    if(e){
        console.log("error",error);
        return;
    }
    console.log("server running on port: 5000");
});
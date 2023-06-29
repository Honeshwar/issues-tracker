// import models
const Projects = require('../models/projectSchema');

// create project controller
module.exports.create = (req,res)=>{
    //create project and redirect back
    Projects.create(req.body,(err,createProject)=>{
        if(err){
            console.log("err white create project controller",err);
            return;
        }
    })
    res.redirect('/');
}



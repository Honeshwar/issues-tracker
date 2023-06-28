const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    //different fields defined
     name:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     author:{
        type:String,
        required:true
     },
     
},{timestamps:true});

const Projects = mongoose.model('Projects',projectSchema);

module.exports = Projects;
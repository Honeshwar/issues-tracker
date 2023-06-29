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
     issues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Issues",// refer to issues collection/model in db ,so we can populate in this collection using project collection, without using issues.find()
      }]
     
},{timestamps:true});

const Projects = mongoose.model('Projects',projectSchema);

module.exports = Projects;
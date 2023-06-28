const Projects = require('../models/projectSchema');// import Project model from projectSchema where i created this model

exports.home=function (req,res) {
  console.log('at home',req.body);//redirect req ,req.body empty
  Projects.find({},(err,projects)=>{//array of document(project)
      if(err){
        console.log('err',err);
        return;
      }
      console.log('Projects at home',projects);
    res.render('home',{projects:projects});
  })
  }



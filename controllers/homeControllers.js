// import Project model from projectSchema where i created this model
const Projects = require('../models/projectSchema');

// home controller
exports.home=function (req,res) {
    Projects.find({},(err,projects)=>{// return array of document(project)
        if(err){
          console.log('err',err);
          return;
        }
      res.render('home',{projects:projects});
    });
}



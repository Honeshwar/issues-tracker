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

// create project controller
exports.createProjectPage=function (req,res) {
  res.render('createProject');
}

// details page controller
module.exports.details = async (req,res)=>{
   
  try {
  const id = req.params.projectId;
  const project = await Projects.findById(id).populate('issues');//populate, fill issue array with document related to dave id of issue

 // find authors
 console.log(project,project.issues);
 const issues =  project.issues;
 const authors=[];
 for (let i = 0; i <issues.length; i++) {
      if(!authors.includes(issues[i].author)){
          authors.push(issues[i].author);
      }
  }

  return res.render('details',{
      project:project,
      issues:issues,
      authors
  });


 } catch (error) {
      return console.log("error while details page controller",error);
 }

}



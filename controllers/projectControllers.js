const Projects = require('../models/projectSchema');// import Project model from projectSchema where i created this model
console.log("model...",Projects);

module.exports.create = (req,res)=>{
    console.log(req.body);
    Projects.create(req.body,(err,createProject)=>{
        if(err){
            console.log("err",err);
            return;
        }
        console.log("createProject",createProject);
    })
    res.redirect('/');

    // Projects.deleteOne({author:"df"});
    // res.redirect('/'); 
}

module.exports.createIssue = (req,res)=>{
    res.redirect('/');
}

module.exports.details = (req,res)=>{
   const id = req.params.id;
   console.log(id);
    Projects.findById(id,(err,project)=>{//array of document(project)
        if(err){
          console.log('err in details project finding....',err);
          return;
        }
        console.log('Projects at details',project);
      res.render('details',{project:project});
    })
}
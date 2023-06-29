// import models
const Issues = require('../models/issueSchema');
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

// create issue controller
module.exports.createIssue = async (req,res)=>{
   
    try {
        // get data from request
        const formData = req.body;
        const projectId = req.params.projectId;
        
        //write program  to convert string separated by comas to an array
        const labels = req.body.labels//(string)
        let value="";
        let labelsArray = [];

        //iterate entire string and delimiter encounter
        for(let i=0;i<=labels.length;i++){

                if(labels.charAt(i) === ',' || i === labels.length){//labels[i] or 
                    value = value.trim();
                    labelsArray.push(value);
                    value=""; 
                    continue;
                }
                value += labels.charAt(i);
            }

        //create issue and find project by id and add issue to project.issues array
        const issue = await Issues.create({...formData,labels:labelsArray});
        const project = await Projects.findById(projectId);
    
        project.issues.push(issue.id);//over ram or memory saved
        project.save(); // on db get saved

        res.redirect('back');
    } catch (err) {
        if(err){
            console.log("error while creating issue controller",err);
            return;
        }
    }
}
// details page controller
module.exports.details = async (req,res)=>{
   
    try {
    const id = req.params.projectId;
    const project = await Projects.findById(id).populate('issues');//populate, fill issue array with document related to dave id of issue

   // find authors
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
        return console.log("error while details controller",error);
   }

}

// search issue by title or label controller
module.exports.searchByTitleOrLabel = async (req,res)=>{
   
    try {
        const searchText = req.body.search;
        const id = req.params.projectId;
        //find project by id
        const project = await Projects.findById(id).populate('issues');//populate in issue array that created in project schema

        //search searchText in issues array for title or label 
        const issues = project.issues;
        const searchIssues = [];
        for (let i = 0; i < issues.length; i++) {
            if(issues[i].title === searchText || issues[i].labels.includes(searchText)){
                searchIssues.push(issues[i]);
            }   
        }

        //send ajax response
        if(req.xhr){
            return res.status(200).json({
                message:"request successfully",
                data:{
                   issues:searchIssues
                }
            });
        }

    } catch (error) {
        return console.log('error while search by title or label controller',error);
        
    }

}

// search issue by author name controller
module.exports.searchByAuthor = async (req,res)=>{
   
    try {
        const searchAuthor = req.body.author;
        const id = req.params.projectId;
        //find project by id
        const project = await Projects.findById(id).populate('issues');//populate in issue array that created in project schema

        //search searchText in issues array for author
        const issues = project.issues;
        const newIssues = [];

        for (let i = 0; i < issues.length; i++) {
            if(issues[i].author === searchAuthor){
                newIssues.push(issues[i]);
            }  
        }

        //send ajax response
        if(req.xhr){
            return res.status(200).json({
                message:"request successfully",
                data:{
                   issues:newIssues
                }
            });
        }
    } catch (error) {
        return console.log('error while search by author controller',error);
    }

}

// clear all search filter controller
module.exports.clearFilter = async (req,res)=>{
   
    try {
        const id = req.params.projectId;
        //find project by id
        const project = await Projects.findById(id).populate('issues');//populate in issue array that created in project schema

        //send ajax response
        if(req.xhr){
            return res.status(200).json({
                message:"request successfully",
                data:{
                   issues:project.issues
                }
            });
        }
    } catch (error) {
        return console.log('error while clear filter controller',error);
    }

}
const Projects = require("../models/projectSchema");

// create Issue Page controllers
module.exports.createIssuePage = function (req,res) {
    const id = req.params.projectId;
    console.log("hi i am at create issue page");
   return res.render('createIssue.ejs',{projectId:id});
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




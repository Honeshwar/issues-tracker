const Issues = require('../models/issueSchema');
const Projects = require('../models/projectSchema');// import Project model from projectSchema where i created this model
console.log("model...",Projects);

module.exports.create = (req,res)=>{
    console.log(req.body);
    Projects.create(req.body,(err,createProject)=>{
        if(err){
            console.log("err",err);
            return;
        }
        // console.log("createProject",createProject);
    })
    res.redirect('/');

    // Projects.deleteOne({author:"df"});
    // res.redirect('/'); 
}

module.exports.createIssue = async (req,res)=>{
   
    try {
        const formData = req.body;
        const projectId = req.params.projectId;

         //code at create issue time
        //  const labels =

         const labels = req.body.labels//(string)
 
         //program write
         let value="";
         let labelsArray = [];
         //iterate entire string and delimiter encounter
        for(let i=0;i<=labels.length;i++){
                if(labels.charAt(i) === ',' || i === labels.length){//labels[i] or 
                   value = value.trim();
                   console.log('trim value', value);
                    labelsArray.push(value);
                    value=""; 
                }else{
                    value += labels.charAt(i);
                }
            console.log('label array',labelsArray,value);

            }

        const issue = await Issues.create({...formData,labels:labelsArray});
        const project = await Projects.findById(projectId);
        console.log(" created issues ",issue,"projects",project);
    
        project.issues.push(issue.id);//over ram or memory saved
        project.save(); // on db get saved

        console.log(" created issues ",issue,"projects",project);
        res.redirect('back');



    } catch (err) {
        if(err){
            console.log("error while creating issue document in db",err);
            return;
        }
    }
}

module.exports.details = async (req,res)=>{
   const id = req.params.projectId;
//    console.log(id);
   try {

    console.log(req.body,res.issues);
    const project = await Projects.findById(id).populate('issues');//populate, fill issue array with document related to dave id of issue

   // find authors
   const issues =  project.issues;
   const authors=[];
   for (let i = 0; i <issues.length; i++) {
    if(!authors.includes(issues[i].author)){
        authors.push(issues[i].author);
    }
    
   }

    // console.log('Projects at details',project,"issues",issues);
    res.render('details',{
        project:project,
        issues:issues,
        authors});

   } catch (error) {
    console.log("error while details page get",error);
   }



//    Projects.findById(id,(err,project)=>{//array of document(project)
//     if(err){
//       console.log('err in details project finding....',err);
//       return;
//     }
//     console.log('Projects at details',project);
//   res.render('details',{project:project});
// })

}


module.exports.searchByTitleOrLabel = async (req,res)=>{
   
    try {
        const searchText = req.body.search;
        const id = req.params.projectId;
        console.log(searchText,req.body);

        const project = await Projects.findById(id).populate('issues');//populate in issue array that created in project schema
        // const issues = await Issues.find({author:searchText});

        const issues = project.issues;
        const searchIssues = [];
        console.log('searched author text',issues);
        for (let i = 0; i < issues.length; i++) {
           if(issues[i].title === searchText || issues[i].labels.includes(searchText)){
            searchIssues.push(issues[i]);
           }
            
        }
        // search

        // const issues = project.issues;
        // const searchIssues = [];
        // let i = 0;
        // while(i<issues.length){
        //     if(issues[i].title === req.body.search || issues[i].labels.includes(req.body.search)){
        //     searchIssues.push(issues[i]);
        //     }
        // }

        //send ajax response
        if(req.xhr){
            return res.status(200).json({
                message:"request successfully",
                data:{
                   issues:searchIssues
                }
            })
        }

    } catch (error) {
        
    }

}

module.exports.searchByAuthor = async (req,res)=>{
   
    try {
        //only payload data in req.body (post)
        const searchAuthor = req.body.author;
        const id = req.params.projectId;
        console.log(searchAuthor,req.body);

        const project = await Projects.findById(id).populate('issues');//populate in issue array that created in project schema
        // const issues = await Issues.find({author:searchText});

        const issues = project.issues;
        const newIssues = [];
        console.log('searched author text',issues);
        for (let i = 0; i < issues.length; i++) {
           if(issues[i].author === searchAuthor){
            newIssues.push(issues[i]);
           }
            
        }

        //logic to send data to client but not browser async/ajax 

        // console.log('searched text',issues,req.xhr);

        //send ajax response
        if(req.xhr){
            return res.status(200).json({
                message:"request successfully",
                data:{
                   issues:newIssues
                }
            })
        }
    } catch (error) {
        
    }

}

module.exports.clearFilter = async (req,res)=>{
   
    try {
        const id = req.params.projectId;
        console.log(req.url,id);
        const project = await Projects.findById(id).populate('issues');//populate in issue array that created in project schema

        console.log('searched author text',project);

        //logic to send data to client but not browser async/ajax 

        console.log('searched text',project,req.xhr);

        //send ajax response
        if(req.xhr){
            return res.status(200).json({
                message:"request successfully",
                data:{
                   issues:project.issues
                }
            })
        }
    } catch (error) {
        
    }

}
const Projects = require('../models/projectSchema');
const Issues = require('../models/issueSchema');

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

        res.redirect(`/details/${projectId}`);
    } catch (err) {
        if(err){
            console.log("error while creating issue controller",err);
            return;
        }
    }
}

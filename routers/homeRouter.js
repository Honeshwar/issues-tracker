//create router
const express = require('express');//nodejs a single instance of express access to all,that first time imported
const router = express.Router();//MW func return
const homeControllers = require("../controllers/homeControllers");//obj return that have all property that we exports
const detailsControllers = require("../controllers/detailsControllers");//obj return that have all property that we exports 



//all routes
router.get('/',homeControllers.home);
router.get('/create-project',homeControllers.createProjectPage);
router.use('/create-project',require('./projectRouter'));

router.get('/details/:projectId',homeControllers.details);
router.get('/create-issue',detailsControllers.createIssuePage);
router.use('/details',require("./detailsRouter"));

//export router MW
module.exports = router;
//create router
const express = require('express');//nodejs a single instance of express access to all,that first time imported
const router = express.Router();//MW func return
const homeControllers = require("../controllers/homeControllers");//obj return that have all property that we exports 

//all routes
router.get('/',homeControllers.home)
router.use('/project',require('./projectRouter'));

//export router MW
module.exports = router;
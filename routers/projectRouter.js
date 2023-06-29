//create router
const express = require('express');//nodejs a single instance of express access to all,that first time imported
const router = express.Router();//MW func return
const projectControllers = require("../controllers/projectControllers");//obj return that have all property that we exports 

//all routes
router.post('/create',projectControllers.create);

//export router MW
module.exports = router;
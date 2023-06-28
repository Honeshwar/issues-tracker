//create router
const express = require('express');//nodejs a single instance of express access to all,that first time imported
const router = express.Router();//MW func return
const projectControllers = require("../controllers/projectControllers");//obj return that have all property that we exports 

router.post('/create',projectControllers.create)
router.post('/create-issue',projectControllers.createIssue);

router.get('/details/:id',projectControllers.details)


module.exports = router;
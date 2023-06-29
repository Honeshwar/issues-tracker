//create router
const express = require('express');//nodejs a single instance of express access to all,that first time imported
const router = express.Router();//MW func return
const detailsControllers = require("../controllers/detailsControllers");//obj return that have all property that we exports 

//all routes
router.post('/search-by-title/:projectId',detailsControllers.searchByTitleOrLabel);
router.post('/search-by-author/:projectId',detailsControllers.searchByAuthor);
router.get('/clear-filter/:projectId',detailsControllers.clearFilter);

router.get('/create-issue/:projectId',detailsControllers.createIssuePage);
router.use('/create-issue',require('./issueRouter'));
//export router MW
module.exports = router;
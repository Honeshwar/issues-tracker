//create router
const express = require('express');//nodejs a single instance of express access to all,that first time imported
const router = express.Router();//MW func return
const projectControllers = require("../controllers/projectControllers");//obj return that have all property that we exports 

router.post('/create',projectControllers.create)
router.post('/create-issue/:projectId',projectControllers.createIssue);// use ../  current(location) url path one path back

router.get('/details/:projectId',projectControllers.details)

router.post('/search-by-title/:projectId',projectControllers.searchByTitleOrLabel);

router.post('/search-by-author/:projectId',projectControllers.searchByAuthor);

router.get('/clear-filter/:projectId',projectControllers.clearFilter);
module.exports = router;
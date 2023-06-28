//setup of db
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ISSUE_TRACKER_DEVELOPMENT').then((result) => {
        console.log('db is connected')
    }).catch((err) => {
        console.log('db is not connected, an error come',err);
    });;
mongoose.set('strictQuery', true);

const dbConnection = mongoose.connection;

// dbConnection.then((result) => {
//     console.log('db is connected')
// }).catch((err) => {
//     console.log('db is not connected, an error come',err);
// });

// dbConnection.on('error',console.bind(console.log("error")));
// dbConnection.once('open',() => {
//     console.log('db is connected')});

module.exports = dbConnection;
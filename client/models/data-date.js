
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// define the schema for our user model
var datadateSchema = mongoose.Schema({
    date: Date,
    frequency: Number
}, {
    timestamps: true
});


// create the model for users and expose it to our app
module.exports = mongoose.model('datadate', datadateSchema); // nama collection

var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
    letter : String,
    frequency : Number
});

module.exports = mongoose.model('Data', dataSchema);

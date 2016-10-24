const mongoose = require('mongoose');
const moment = require('moment');

var dataDateSchema = mongoose.Schema({
    date : Date,
    frequency : Number
});

dataDateSchema.methods.toJSON = function() {
    var obj = this.toObject()
    obj.letter = moment(obj.letter).format('YYYY-MM-DD')
    return obj
};

module.exports = mongoose.model('DataDate', dataDateSchema);

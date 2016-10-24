var mongoose = require('mongoose')
const moment = require('moment');
var Schema = mongoose.Schema;

var dateSchema = mongoose.Schema({
    letter:Date,
    freq:Number,
    dtCreated:Date
})
dateSchema.methods.toJSON = function() {
    var obj = this.toObject()
    obj.letter = moment(obj.letter).format('YYYY-MM-DD')
    return obj
};

module.exports= mongoose.model('dates', dateSchema)

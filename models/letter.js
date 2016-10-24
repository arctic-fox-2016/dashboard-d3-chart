var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var letterSchema = mongoose.Schema({
    letter:String,
    freq:Number,
    dtCreated:Date
})

module.exports= mongoose.model('letter', letterSchema)

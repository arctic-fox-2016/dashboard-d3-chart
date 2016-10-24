const fs = require('fs');
const mongoose = require('mongoose');
const datadate = require('../app/models/datadate');
const configDB = require('../config/database.js');

mongoose.connect(configDB.url);

var list = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'))

for(var i = 0; i < list.length; i++){
  list[i].letter = new Date(list[i].letter)
}

datadate.collection.insert(list, function(err){
  if(err){
    console.log(err);
    process.exit(1);
  }
  console.log("Seed Completed");
  process.exit();
})

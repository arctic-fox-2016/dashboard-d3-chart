

var Date = require('../models/letter')
var Date2 = require('../models/datadate')
module.exports = {
  display: display,
  display2:display2
}



function display(req,res,next){
    Date.find({},(err,result) => {
          res.json(result)
    })
}

function display2(req,res,next){
    Date2.find({},(err,result) => {
          res.json(result)
    })
}

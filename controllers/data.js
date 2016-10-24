

var Date = require('../models/letter')

module.exports = {
  display: display
}



function display(req,res,next){
    Date.find({},(err,result) => {
          res.json(result)
    })
}

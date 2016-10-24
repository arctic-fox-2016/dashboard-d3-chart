

var Dates = require('../models/dates')

module.exports = {
  insert: insert,
  displayAll: displayAll,
  update:update,
  deleteOne:deleteOne,
  detail:detail,
  deleteAll:deleteAll,
  search:search,
  search2:search2,
  search3:search3
}


function search(req,res,next){
    console.log(req.params.key);
    Dates.find({
      letter:req.params.key
    },(err,result) => {
      console.log(result);
          res.json(result)
    })
}

function search2(req,res,next){
    console.log(req.params.key);
    Dates.find({
      freq:req.params.key
    },(err,result) => {
      console.log(result);
          res.json(result)
    })
}

function search3(req,res,next){
    Dates.find({
      freq:req.params.key,letter:req.params.key2
    },(err,result) => {
      console.log(result);
          res.json(result)
    })
}

function insert(req,res,next){
    var items = new Dates({
      letter:req.body.letter,
      freq:req.body.freq,
      dtCreated:new Date()
    })
    items.save()
    res.json(items)
}


function update(req,res,next){
  Dates.findOne({
    _id:req.params.id
  },(err,items) => {
      items.letter = req.body.letter
      items.freq = req.body.freq
      items.dtCreated = new Date()

      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function deleteOne(req,res,next){
  Dates.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function displayAll(req,res,next){
    Dates.find({},(err,result) => {
          res.json(result)
    })
}

function deleteAll(req,res,next){
    Dates.find({},(err,result) => {
          res.json(result)
    })
}

function detail(req,res,next){
    Dates.findOne({
      _id:req.params.id
    },(err,result) => {
          res.json(result)
    })
}

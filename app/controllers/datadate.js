const models = require('../models/datadate'),
      _ = require('lodash')

module.exports = {
  createOne:createOne,
  findAll:findAll,
  findOne:findOne,
  updateOne:updateOne,
  deleteOne:deleteOne
}

function createOne(req, res, next){
  models.findOne({
    date:req.body.date,
    frequency:req.body.frequency
  },(err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(400).json({error:"Letter already exists"})
    } else {
      var record = new models({
        date:req.body.date,
        frequency:req.body.frequency
      })
      record.save()
      res.status(200).json(record)
    }
  })
}

function findAll(req, res, next){
  var query = null
  if(!_.isEmpty(req.query.date) && !_.isEmpty(req.query.frequency)){
    query = {
      $and : [
        {
          date: { $in: req.query.date }
        },
        {
          frequency: { $in: req.query.frequency }
        }
      ]
    }
  } else if(!_.isEmpty(req.query.date)){
    query = {
      date: {
        $in: req.query.date
      }
    }
  } else if(!_.isEmpty(req.query.frequency)){
    query = {
      frequency: {
        $in: req.query.frequency
      }
    }
  }

  models.find(query,(err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(200).json(record)
    } else {
      res.status(204).json({error:"Cannot find any record"})
    }
  })
}

function findOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(200).json(record)
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}

function updateOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(record){
      record.date = req.body.date
      record.frequency = req.body.frequency
      record.save((err)=> {
        if(err) throw err
        res.status(200).json(record)
      })
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}

function deleteOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(record){
      record.remove((err)=> {
        if(err) throw err
        res.status(200).json(record)
      })
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}

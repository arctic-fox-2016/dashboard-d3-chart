var DataDate = require('../models/data-date')

module.exports = {
    insert: insert,
    displays: displays,
    displayOne: displayOne,
    update: update,
    deleteitem: deleteitem,
    searchDataDate: searchDataDate
}

function insert(req, res, next) {

    var data = new DataDate({
        date: req.body.date,
        frequency: req.body.frequency

    })

    data.save((err) => {
        if (err)
            throw err
        res.json(data)
        console.log(data);
    })

}

function displays(req, res) {
    DataDate.find({}, (err, data) => {
        res.json(data)
    })
}

function displayOne(req, res) {
    DataDate.findOne({
        _id: req.params.id
    }, (err, data) => {
        //update the book
        res.json(data)
    })
}

function update(req, res) {

    //finding a current book
    DataDate.findOne({
        _id: req.params.id
    }, (err, data) => {
        //update the book
        data.date = req.body.date,
        data.frequency = req.body.frequency
        data.save((err) => {
            if (err)
                throw err;
            res.json(data)
        })
    })
}

function deleteitem(req, res) {
    DataDate.remove({
        _id: req.params.id
    }, (err, data) => {
        res.json({
            "messages": "File deleted"
        })
    })
}


function displayOne(req, res) {
    DataDate.findOne({
        _id: req.params.id
    }, (err, data) => {
        //update the book
        res.json(data)
    })
}

function searchDataDate(req, res) {
  if(req.query.date == ""){
    DataDate.find({frequency: req.query.frequency}, function(err,result){
      console.log('date null', result)
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  } else if (req.query.frequency == ""){
    DataDate.find({date: req.query.date}, function(err,result){
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  } else {
    DataDate.find({date: req.query.date, frequency: req.query.frequency}, function(err,result){
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  }
  //   //  console.log(req.params.query);
  //
  //   var re = new RegExp(req.params.search, 'i');
  //
  //   DataDate.find().or([{ 'date': { $regex: re }}, { 'frequency': req.params.}]).sort('title', 1).exec(function(err, users) {
  //     res.json(JSON.stringify(users));
  // });
  //
  //   // DataDate.find({
  //   //     $or: [{
  //   //         date: {
  //   //             $regex: req.params.query + '*',
  //   //             $options: 'i'
  //   //         }
  //   //     }]
  //   // }, (err, data) => {
  //   //
  //   //     if (err)
  //   //         throw err;
  //   //     res.json(data)
  //   // })
}
//
// router.get('/search', function(req,res,next){
//  if(req.query.date == ""){
//    DataDate.find({frequency: req.query.frequency}, function(err,result){
//      console.log('date null', result)
//      if(err){
//        res.json({message:"errorii", detail:err})
//      } else {
//        res.json(result)
//      }
//    })
//  } else if (req.query.frequency == ""){
//    DataDate.find({date: req.query.date}, function(err,result){
//      if(err){
//        res.json({message:"errorii", detail:err})
//      } else {
//        res.json(result)
//      }
//    })
//  } else {
//    DataDate.find({date: req.query.date, frequency: req.query.frequency}, function(err,result){
//      if(err){
//        res.json({message:"errorii", detail:err})
//      } else {
//        res.json(result)
//      }
//    })
//  }
// })

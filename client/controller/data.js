var Data = require('../models/data')

module.exports = {
    insert: insert,
    displays: displays,
    displayOne: displayOne,
    update: update,
    deleteitem: deleteitem,
    searchData: searchData
}

function insert(req, res, next) {

    var data = new Data({
        letter: req.body.letter,
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
    Data.find({}, (err, data) => {
        res.json(data)
    })
}

function displayOne(req, res) {
    Data.findOne({
        _id: req.params.id
    }, (err, data) => {
        //update the book
        res.json(data)
    })
}

function update(req, res) {

    //finding a current book
    Data.findOne({
        _id: req.params.id
    }, (err, data) => {
        //update the book
        data.letter = req.body.letter,
        data.frequency = req.body.frequency
        data.save((err) => {
            if (err)
                throw err;
            res.json(data)
        })
    })
}

function deleteitem(req, res) {
    Data.remove({
        _id: req.params.id
    }, (err, data) => {
        res.json({
            "messages": "File deleted"
        })
    })
}


function displayOne(req, res) {
    Data.findOne({
        _id: req.params.id
    }, (err, data) => {
        //update the book
        res.json(data)
    })
}

function searchData(req, res) {
  if(req.query.letter == ""){
    Data.find({frequency: req.query.frequency}, function(err,result){
      console.log('letter null', result)
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  } else if (req.query.frequency == ""){
    Data.find({letter: req.query.letter}, function(err,result){
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  } else {
    Data.find({letter: req.query.letter, frequency: req.query.frequency}, function(err,result){
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
  //   Data.find().or([{ 'letter': { $regex: re }}, { 'frequency': req.params.}]).sort('title', 1).exec(function(err, users) {
  //     res.json(JSON.stringify(users));
  // });
  //
  //   // Data.find({
  //   //     $or: [{
  //   //         letter: {
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
//  if(req.query.letter == ""){
//    Data.find({frequency: req.query.frequency}, function(err,result){
//      console.log('letter null', result)
//      if(err){
//        res.json({message:"errorii", detail:err})
//      } else {
//        res.json(result)
//      }
//    })
//  } else if (req.query.frequency == ""){
//    Data.find({letter: req.query.letter}, function(err,result){
//      if(err){
//        res.json({message:"errorii", detail:err})
//      } else {
//        res.json(result)
//      }
//    })
//  } else {
//    Data.find({letter: req.query.letter, frequency: req.query.frequency}, function(err,result){
//      if(err){
//        res.json({message:"errorii", detail:err})
//      } else {
//        res.json(result)
//      }
//    })
//  }
// })

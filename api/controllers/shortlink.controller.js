var mongoose = require('mongoose');
var moment = require('moment');
var Validations = require('../utils/validations');

var ShortLink = mongoose.model('ShortLink');


module.exports.getShortLinks = function(req, res, next) {
  ShortLink.find({}).exec(function(err, sLink) {
    if (err) {
      return next(err);
    }
    if (!sLink) {
      return res
        .status(404)
        .json({ err: null, msg: 'ShortLinks not found.', data: null });
    }

else{
    res.status(200).json({
      err: null,
      msg: 'ShortLinks retrieved successfully.',
      data: sLink
    }); }
  });

}

module.exports.addShortLinks = function(req, res, next) {

  if(req.body.slug == null){
  var ID = function () {
    return Math.random().toString(36).substr(2, 9);
  };
  req.body.slug=ID();}

  var valid =
    req.body.iosPrimary &&
 Validations.isString(req.body.iosPrimary) &&
 req.body.iosFallback &&
 Validations.isString(req.body.iosFallback) &&
    req.body.web &&
  Validations.isString(req.body.web) &&
    req.body.androidPrimary &&
   Validations.isString(req.body.androidPrimary) &&
   req.body.androidFallback &&
   Validations.isString(req.body.androidFallback) &&
    req.body.slug &&
   Validations.isString(req.body.slug);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'ios , android and web are required fields.',
      data: null
    });
  }
  ShortLink.create(req.body, function(err, sLink) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
 
        return res.status(422).json({ err: null, msg: 'Slug already exist!' , data:null });
      }
    return res.status(500).json({
      err:null,
      msg:"Other error",
      data:null

    })
    }if(!sLink){
  return  res.status(402).json({
        err: null,
        msg: 'Not successful',
        data: null});
      }
    else{
   return res.status(201).json({
      err: null,
      msg: 'ShortLink was created successfully.',
      data: sLink});
    }
    }

    );

  }


    
    

module.exports.updateShortLinks = function(req, res, next) {
  if (!Validations.isString(req.params.slug)) {
    return res.status(422).json({
      err: null,
      msg: 'slug parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
  (  req.body.ios &&
    Validations.isString(req.body.ios) ) &&
    (req.body.web &&
    Validations.isString(req.body.web))&&
    (req.body.android &&
      Validations.isString(req.body.android));
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'android , ios or web are required fields.',
      data: null
    });
  }
  ShortLink.findOneAndUpdate(
   {slug:req.params.slug},
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedSL) {
    if (err) {
      return next(err);
    }
    if (!updatedSL) {
      return res
        .status(404)
        .json({ err: null, msg: 'ShortLink not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'ShortLink was updated successfully.',
      data: updatedSL
    });
  });
};





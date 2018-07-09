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

};

module.exports.addShortLinks = function(req, res, next) {
if(req.body.slug == null){
  var ID = function () {
    return Math.random().toString(36).substr(2, 9);
  };
  req.body.slug=ID();}

  var valid =
    req.body.ios &&
 Validations.isString(req.body.ios) &&
    req.body.web &&
  Validations.isString(req.body.web) &&
    req.body.android &&
   Validations.isString(req.body.android) &&
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
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'ShortLink was created successfully.',
      data: sLink});
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





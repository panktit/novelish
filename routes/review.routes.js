var express = require('express');
var router = express.Router();
var Review = require('../models/review.model');

/* GET ALL REVIEWS */
router.get('/', function(req, res, next) {
  Review.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE REVIEW BY ID */
router.get('/:id', function(req, res, next) {
  Review.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET ALL REVIEWS BY A USER */
router.get('/user/:id', function(req, res, next) {
  Review.find({"user": req.params.id},function (err, reviews) {
    if (err) return next(err);
    res.json(reviews);
  });
});

/* SAVE BOOK REVIEW*/
router.post('/', function(req, res, next) {
  Review.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK REVIEW*/
router.put('/:id', function(req, res, next) {
  Review.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK REVIEW*/
router.delete('/:id', function(req, res, next) {
  Review.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
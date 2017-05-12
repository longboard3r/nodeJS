/* 
Node module leaderRouter implements an Express router for the /leadership REST API end point
 */
var express = require('express');
var bodyParser = require('body-parser');

var Leadership = require('../models/leadership');
var Verify = require('./verify');

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(Verify.verifyOrdinaryUser ,function(req, res, next){
    Leadership.find({}, function(err, leadership) {
        if (err) throw err; 
        res.json(leadership);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
    Leadership.create(req.body, function(err, leadership) {
        if(err) throw err;
        console.log('Promo created!');
        var id = leadership._id;

        res.writeHead(200, {'Content-Type': 'text/plain'}
        );
        res.end('Added a leadership with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Leadership.remove({}, function(err, resp) {
        if(err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
    Leadership.findById(req.params.leaderId, function(err, leadership) {
        if(err) throw err;
        res.json(leadership);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Leadership.findByIdAndUpdate(req.params.leaderId, {
         $set: req.body
    }, {
         new: true
    }, function(err, leadership) {
         if(err) throw err;
         res.json(leadership);
    })   
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Leadership.findByIdAndRemove(req.params.leaderId, function(err, resp) {
        if(err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;
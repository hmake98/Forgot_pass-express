var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/:token', function (req, res, next) {
    if (req.params.token) {
        token = req.params.token;
        User.find({
            resetToken: req.params.token
        }).then(user => {
            if (!user) {
                res.redirect('/forgot');
            }else{
                res.render('reset', { token: req.params.token });
            }
        })
    }
});

router.post('/submit', (req, res) => {
    if(req.body.password && req.body.cfrmpas){
        if(req.body.password !== req.body.cfrmpas){
            res.render('reset', { message: "Password didn't match."});
        }else{
            console.log({ resetToken: req.body.token });
            User.update({ resetToken: req.body.token }, {$set: { password: req.body.password } }, (err, res) => {
                if(err){
                    console.log(err);
                }else{
                    res.render('reset', { message: "Password changed successfully!"});
                }
            });
        }
    }else{
        res.render('reset', { message: "Enter password"});
    }
});

module.exports = router;
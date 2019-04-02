var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        User.find({
            username: req.body.username
        }).then(user => {
            if (user.length > 0) {
                res.render('login', {
                    message: "Account exists!"
                });
            } else {
                res.redirect('/home');
            }
        }).catch(err => {

        });
    }
});

module.exports = router;
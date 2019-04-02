var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/signup', (req, res) => {
  if (req.body.username && req.body.email && req.body.password) {
    User.create(req.body).then(user => {
      req.session.user = user
      res.redirect('/home');
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: "Unable to add user.",
        error: err
      });
    });
  }else{
    res.render('index', { message: "Please enter valid credentials."});
  }
});

module.exports = router;
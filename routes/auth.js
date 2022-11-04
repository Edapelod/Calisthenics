const router = require("express").Router();
const User = require('../models/User.model.js');
// const bcrypt = require('bcryptjs')

/* GET signup page */
router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
  });



    /* GET login page */
router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });

  module.exports = router;
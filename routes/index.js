const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
/* GET home page */
router.get("/", (req, res, next) => {
  if (req.session.user) {
    res.render("home")
  } else {
  res.render("index")}
});

module.exports = router;

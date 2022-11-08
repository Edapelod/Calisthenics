const router = require("express").Router();
const User = require("../models/User.model.js")
const {isLoggedIn} = require('../middleware/route-guard.js');

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("profile", { userConnected: req.session.user });
});

router.post("/", isLoggedIn, async (req, res) => {
  
  const updatedUser = await User.findByIdAndUpdate(req.session.user._id, req.body)
    res.redirect("routine")
})

module.exports = router;
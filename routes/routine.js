const User = require("../models/User.model");
const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


router.get("/", isLoggedIn, async (req, res, next) => {
    const data = await User.findById(req.session.user._id)
    console.log("here",data)
  res.render("routine", { userConnected: req.session.user, sum: data.pushup + data.squat });
  console.log("/routine",req.session)
});

router.post("/", async (req, res) => {
    
})

module.exports = router;
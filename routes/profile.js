const router = require("express").Router();
const userModel = require("../models/User.model")

router.get("/", (req, res, next) => {
  res.render("profile", { userConnected: req.session.user });
});

router.post("/", async (req, res) => {
  
  const updatedUser = await userModel.findByIdAndUpdate(req.session.user._id, req.body)
    res.redirect("routine")
})

module.exports = router;
const router = require("express").Router();


router.get("/", (req, res, next) => {
  res.render("routine", { userConnected: req.session.user });
  console.log("/routine",req.session)
});

router.post("/", (req, res) => {
    res.redirect("profile")
})

module.exports = router;
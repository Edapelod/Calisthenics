const router = require("express").Router();
const User = require("../models/User.model.js")
const {isLoggedIn} = require('../middleware/route-guard.js');


router.get("/", isLoggedIn, async (req, res, next) => {
  let date1 =  await User.findById(req.session.user._id)
  let date3 = date1.createdAt.toLocaleDateString()
  console.log(date3, date1)
  const sum = date1.pushup + date1.squat
  let level
  if (sum >= 1 && sum <30) {
    level = "Beginner ⭐️"
  } else if (sum >= 30 && sum <40) {
    level = "Intermediate ⭐️⭐️"
  } else if (sum >=40 && sum <60) {
    level = "Advanced ⭐️⭐️⭐️"
  } else if (sum > 60) {
    level = "Expert ⭐️⭐️⭐️⭐️"
  } else {
    level = "No routine yet"
  }
  let profileButton 
if (!date1.pushup) {
  profileButton = "Create Routine"
} else {
  profileButton = "Edit level"
}
  res.render("profile", { userConnected: req.session.user, date3, level, profileButton });
});

router.post("/", isLoggedIn, async (req, res) => {
  let date1 =  await User.findById(req.session.user._id)
  let date3 = date1.createdAt.toLocaleDateString()
  console.log(date3, date1)
  const sum = date1.pushup + date1.squat
  let level 
  if (sum >= 1 && sum <30) {
    level = "Beginner ⭐️"
  } else if (sum >= 30 && sum <40) {
    level = "Intermediate ⭐️⭐️"
  } else if (sum >=40 && sum <60) {
    level = "Advanced ⭐️⭐️⭐️"
  } else if (sum > 60) {
    level = "Expert ⭐️⭐️⭐️⭐️"
  } else {
    level = "No routine yet"
  }
  if (!date1.pushup) {
    profileButton = "Create Routine"
  } else {
    profileButton = "Edit level"
  }
  const updatedUser = await User.findByIdAndUpdate(req.session.user._id, req.body)
      res.redirect("/profile")
      res.render("profile", { userConnected: req.session.user, date3, level, profileButton})
})

module.exports = router;
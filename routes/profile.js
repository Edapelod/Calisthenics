const router = require("express").Router();
const User = require("../models/User.model.js");
const { isLoggedIn } = require("../middleware/route-guard.js");

router.get("/", isLoggedIn, async (req, res, next) => {
  let date1 = await User.findById(req.session.user._id);
  let date3 = date1.createdAt.toLocaleDateString();
  let updateDate = date1.updatedAt.toLocaleDateString();
  let goodUpdateDate = updateDate;

  const sum = date1.pushup + date1.squat;
  let level;
  if (sum >= 1 && sum < 30) {
    level = "Beginner ⭐️";
  } else if (sum >= 30 && sum < 40) {
    level = "Intermediate ⭐️⭐️";
  } else if (sum >= 40 && sum < 60) {
    level = "Advanced ⭐️⭐️⭐️";
  } else if (sum > 60) {
    level = "Expert ⭐️⭐️⭐️⭐️";
  } else {
    level = "No routine yet";
  }

  let profileText;
  if (!date1.pushup) {
    profileText = "Create Routine?";
  } else {
    profileText = "Edit Routine?";
  }

  let profileButton;
  if (!date1.pushup) {
    profileButton = "Create Routine";
  } else {
    profileButton = "Edit level";
  }
  res.render("profile", {
    userConnected: req.session.user,
    date3,
    level,
    profileButton,
    profileText,
    goodUpdateDate,
  });
});

router.post("/", isLoggedIn, async (req, res) => {
  let date1 = await User.findById(req.session.user._id);
  let date3 = date1.createdAt.toLocaleDateString();
  let updateDate = date1.updatedAt.toLocaleDateString();
  let goodUpdateDate = updateDate;

  const sum = date1.pushup + date1.squat;
  let level;
  if (sum >= 1 && sum < 30) {
    level = "Beginner ⭐️";
  } else if (sum >= 30 && sum < 40) {
    level = "Intermediate ⭐️⭐️";
  } else if (sum >= 40 && sum < 60) {
    level = "Advanced ⭐️⭐️⭐️";
  } else if (sum > 60) {
    level = "Expert ⭐️⭐️⭐️⭐️";
  } else {
    level = "No routine yet";
  }

  let profileText;
  if (!date1.pushup) {
    profileText = "Create Routine?";
  } else {
    profileText = "Edit Routine?";
  }

  if (!date1.pushup) {
    profileButton = "Create";
  } else {
    profileButton = "Edit";
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.session.user._id,
    req.body
  );
  res.redirect("/profile");
  res.render("profile", {
    userConnected: req.session.user,
    date3,
    level,
    profileButton,
    profileText,
    goodUpdateDate,
  });
});

module.exports = router;

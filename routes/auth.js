const router = require("express").Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


/* GET signup page */
router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut, async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(11);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    await User.create({
      username: req.body.username,
      password: passwordHash,
    });
    res.redirect("login");
  } catch (error) {
    console.log(error.message);
    res.render("auth/signup", { errorMessage: error.message });
  }
});

/* GET login page */
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, async (req, res) => {
  console.log("SESSION =====> ", req.session);
  try {
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username });
    if (!currentUser) {
      res.render("auth/login", { errorMessage: "No user with this username" });
    } else {
      if (bcrypt.compareSync(password, currentUser.password)) {
        req.session.user = currentUser;
        res.redirect("/profile");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.render("auth/signup", { errorMessage: error.message });
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;

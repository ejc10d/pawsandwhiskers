const router = require("express").Router();
const { Dog, Cat, User } = require("../models");
// const withAuth = require('../utils/auth'); withAuth not required on routes at this time

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login screen
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("homepage");
});

// GET all pets
router.get("/pets", async (req, res) => {
  try {
    const dogData = await Dog.findAll({});
    const catData = await Cat.findAll({});
    const dogs = dogData.map((dog) => dog.get({ plain: true }));
    const cats = catData.map((cat) => cat.get({ plain: true }));

    res.render("pets", {
      dogs, cats,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET dog by id/image link
router.get("/dogs/:id", async (req, res) => {
    try {
      const dogData = await Dog.findByPk(req.params.id);
  
      const dog = dogData.get({ plain: true });
  
      res.render('single-dog', { 
        ...dog,
        logged_in: req.session.logged_ing });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// GET cat by id/image link
router.get("/cats/:id", async (req, res) => {
  try {
    const catData = await Cat.findByPk(req.params.id);

    const cat = catData.get({ plain: true });

    res.render('single-cat', { 
      ...cat,
      logged_in: req.session.logged_ing });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

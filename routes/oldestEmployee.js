var express = require("express");
var router = express.Router();
const { Employees } = require("../models/employee");

/* GET Oldest Employee page. */
router.get("/", async function(req, res, next) {
  try {
    const male = await Employees.find({ gender: "M" })
      .sort({ birth_date: -1 })
      .limit(1);
    const female = await Employees.find({ gender: "F" })
      .sort({ birth_date: -1 })
      .limit(1);
    const oldest = { male: male[0], female: female[0] };
    res.render("oldestEmployee", { oldest: oldest });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

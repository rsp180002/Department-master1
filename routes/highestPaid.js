var express = require("express");
var router = express.Router();
const { Employees } = require("../models/employee");
const Salaries = require("../models/salaries");

/* GET Oldest Employee page. */
router.get("/", async function (req, res, next) {
  try {
    const highest = await Salaries
      .find()
      .sort({ salary: -1 })
      .populate({
        path: 'emp',
        populate: [
          {
            path: 'emp'
          },
          {
            path: 'dept'
          },
        ]
      })
      .limit(50); // This limit could be changes as per as demand of performance / case.
    // console.log(highest)

    const male = highest.filter(salary => salary.emp.emp.gender === 'M')[0];
    const female = highest.filter(salary => salary.emp.emp.gender === 'F')[0];


    // console.log(male, female)
    res.render("highestPaid", { male, female });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

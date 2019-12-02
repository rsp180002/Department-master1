var express = require("express");
var router = express.Router();
const { Departments } = require("../models/departments");
const DeptEmps = require("../models/dept_emp");

/* GET Oldest Employee page. */
router.get("/", async function (req, res, next) {
  try {
    const depts = await Departments.find({});

    const data = []

    await asyncForEach(depts, async (dept, index, orig) => {
      const count = await DeptEmps.find({ dept_no: dept.dept_no }).countDocuments()
      // console.log(count);
      data.push({ count, dept_name: dept.dept_name });
    })

    // console.log(data);

    res.render("numberOfEmployee", { depts: data });
  } catch (err) {
    // console.log(err);
  }
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = router;

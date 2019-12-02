var express = require("express");
var router = express.Router();
const Dept_emp = require("../models/dept_emp");
const { Employees } = require("../models/employee");
const { Departments } = require("../models/departments");
const DeptManagers = require("../models/dept_manager");

/* GET Oldest Employee page. */
router.get("/", async function (req, res, next) {
  try {
    let byDep = {}
    const managers = await DeptManagers.find({}).populate('dept').populate('emp');
    managers.map(manager => {
      let dept_no = manager.dept.dept_no;
      if (Object.keys(byDep).includes(dept_no)) {
        byDep[dept_no].emps.push(manager.emp)
      } else {
        byDep[dept_no] = { emps: [], dept_name: manager.dept.dept_name };
        byDep[dept_no].emps.push(manager.emp);
      }
    })

    Object.keys(byDep).forEach(dep => {
      // console.log(byDep[dep].emps.filter(emp => emp.gender == 'M').length)
      byDep[dep].femaleCount = byDep[dep].emps.filter(emp => emp.gender == 'F').length;
      byDep[dep].maleCount = byDep[dep].emps.filter(emp => emp.gender == 'M').length;
      // console.log(dep)
    });
    // console.log(byDep);

    res.render("managers", { manByDep: byDep });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

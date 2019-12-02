const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  dept_no: String,
  dept_name: String
});

const Departments = mongoose.model("departments", departmentSchema);

module.exports = { Departments, departmentSchema };

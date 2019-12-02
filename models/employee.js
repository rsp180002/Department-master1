const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  emp_no: Number,
  birth_date: { type: Date, index: true },
  first_name: String,
  last_name: String,
  gender: String,
  hire_date: { type: Date, index: true }
});

const Employees = mongoose.model("employees", employeeSchema);

module.exports = { Employees, employeeSchema };

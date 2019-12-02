const mongoose = require("mongoose");
const { departmentSchema } = require("./departments");
const { employeeSchema } = require("./employee");

const deptEmpSchema = mongoose.Schema({
  emp_no: Number,
  dept_no: String,
  from_date: Date,
  to_date: Date
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

deptEmpSchema.virtual('emp', {
  ref: 'employees',
  localField: 'emp_no',
  foreignField: 'emp_no',
  justOne: true
});

deptEmpSchema.virtual('dept', {
  ref: 'departments',
  localField: 'dept_no',
  foreignField: 'dept_no',
  justOne: true
})

const DeptEmps = mongoose.model("dept_emp", deptEmpSchema, "dept_emp");

module.exports = DeptEmps;

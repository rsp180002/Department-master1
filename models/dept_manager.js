const mongoose = require("mongoose");

const deptManagerSchema = mongoose.Schema({
  dept_no: String,
  emp_no: Number,
  from_date: { type: Date, index: true },
  to_date: { type: Date, index: true }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });


deptManagerSchema.virtual('emp', {
  ref: 'employees',
  localField: 'emp_no',
  foreignField: 'emp_no',
  justOne: true
});

deptManagerSchema.virtual('dept', {
  ref: 'departments',
  localField: 'dept_no',
  foreignField: 'dept_no',
  justOne: true
})

const DeptManagers = mongoose.model(
  "dept_manager",
  deptManagerSchema,
  "dept_manager"
);

module.exports = DeptManagers;

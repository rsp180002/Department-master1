const mongoose = require('mongoose');

const salariesSchema = mongoose.Schema({
    emp_no: Number,
    salary: Number,
    from_date: Date,
    to_date: Date
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } })

salariesSchema.virtual('emp', {
    ref: 'dept_emp',
    localField: 'emp_no',
    foreignField: 'emp_no',
    justOne: true
});

const Salaries = mongoose.model('salaries', salariesSchema);

module.exports = Salaries;
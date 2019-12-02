const mongoose = require('mongoose');

const titleSchema = mongoose.Schema({
    emp_no: Number,
    title: String,
    from_date: { type: Date, index: true },
    to_date: { type: Date, index: true }
})


const Titles = mongoose.model('titles', titleSchema);

module.exports = Titles;
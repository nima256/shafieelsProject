const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gradetestSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    studentcode: Number,
    day: String,
    time: String
});

module.exports = mongoose.model('Gradetest', gradetestSchema);
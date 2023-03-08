const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    fullname: String,
    username: String,
    phone: Number,
    birthdate: String,
    gender: String,
    classday: String,
    classtime: String,
    grade: String,
    payment: Boolean,
    reportcard: {
        assignment_10: {
            type: Number,
            min: 0,
            max: 10
        },
        quiz_5: {
            type: Number,
            min: 0,
            max: 5
        },
        participationFinalOralExam_30: {
            type: Number,
            min: 0,
            max: 30
        },
        midTermWrittenExam_10: {
            type: Number,
            min: 0,
            max: 10
        },
        attendance_15: {
            type: Number,
            min: 0,
            max: 15
        },
        finalWrittenExam_30: {
            type: Number,
            min: 0,
            max: 30
        }
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

module.exports = mongoose.model('Student', studentSchema);
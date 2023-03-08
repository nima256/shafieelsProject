const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const yeganeAlzSchema = new Schema({
    className: {
        type: String,
        required: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

module.exports = mongoose.model('yeganeAlz', yeganeAlzSchema);
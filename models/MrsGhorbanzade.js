const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MrsGhorbanzadeSchema = new Schema({
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

module.exports = mongoose.model('MrsGhorbanzade', MrsGhorbanzadeSchema);
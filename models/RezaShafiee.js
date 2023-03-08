const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RezaShafieeSchema = new Schema({
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

module.exports = mongoose.model('RezaShafiee', RezaShafieeSchema);
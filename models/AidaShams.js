const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AidaShamsSchema = new Schema({
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

module.exports = mongoose.model('AidaShams', AidaShamsSchema);
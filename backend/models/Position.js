const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    },
    gpa_required: {
        type: Number,
        require: true
    }
});

const Positions = mongoose.model("Position", positionSchema);

module.exports = Positions;
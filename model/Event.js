const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    name: {type: String, required:true},
    type: {type: String, required:true},
    deviceId: {type: Number, required:true},
    timeStamp: {type: Date, default: Date.now},
    details: {type: String, required:false},
});
module.exports = mongoose.model('Event', EventSchema, 'event');
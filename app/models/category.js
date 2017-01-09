var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    cover_image: {type: String, required: true},
    icon: {type: String, required: true},
    created_at: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Category', schema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');
var Category = require('../models/category');

var schema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    created_at: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Notification', schema);
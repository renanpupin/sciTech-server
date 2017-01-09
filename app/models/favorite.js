var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/User');
var News = require('../models/News');

var schema = new Schema({
    news: {type: Schema.Types.ObjectId, ref: 'News', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    created_at: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Favorite', schema);
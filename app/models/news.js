var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    cover_image: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    status: {type: String, required: true, default: 'draft'},   //draft, published
    created_at: {type: Date, required: true, default: Date.now},
    published_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('News', schema);
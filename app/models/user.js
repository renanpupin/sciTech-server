var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    type: {type: String, required: true},   //user, admin
    created_at: {type: Date, required: true, default: Date.now},
    is_confirmed: {type: Boolean, default: false},
    confirm_token: {type: String, select: false},
    reset_token: {type: String, select: false},
    profile_img: {type: String}
});

schema.pre('save',function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password);
    }
    next();
});
 
schema.methods.checkPassword = function(passwd){
    return bcrypt.compareSync(passwd,this.password);
};

module.exports = mongoose.model('User', schema);
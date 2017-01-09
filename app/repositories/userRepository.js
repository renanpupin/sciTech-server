var User = require('../models/user.js');

module.exports = {
    getAll: function(page, callback) {
        User
        .find()
        // .exec()
        .then(function(users) {
		  	callback(null, true, users);
		})
		.catch(function(err){
		  	console.log('error:', err);
		  	callback(new Error(err), false, null);
		});
    },
    get: function(id, callback) {
        
        User
        .findById(id)
        .then(function(user) {
		 	 callback(null, true, user);
		})
		.catch(function(err){
			console.log('error:', err);
		 	callback(new Error(err), false, null);
		});
    },
    create: function(body, callback) {

    	var user = new User({
			name: body.name,
			email: body.email,
			password: body.password,
			phone: body.phone,
			type: 'user',
			is_confirmed: false
		});

		user
        .save()
        .then(function(user) {
			callback(null, true);
			console.log(user);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    edit: function(id, body, callback) {

    	User
        .update({_id: id}, {$set:body})
        .then(function(user) {
        	console.log(user);
			callback(null, true);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    remove: function(id, callback) {

    	User
        .findById(id)
        .remove()
        .then(function(removed) {
        	console.log(removed);

        	if(removed.result.n > 0){
				callback(null, true);
			}else{
				callback(new Error("Usuário não encontrado"), false);
			}
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    }
};
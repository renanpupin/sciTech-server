var Notification = require('../models/notification.js');

module.exports = {
    getAll: function(page, callback) {
        Notification
        .find()
        // .exec()
        .then(function(notifications) {
		  	callback(null, true, notifications);
		})
		.catch(function(err){
		  	console.log('error:', err);
		  	callback(new Error(err), false, null);
		});
    },
    get: function(id, callback) {
        
        Notification
        .findById(id)
        .then(function(notification) {
		 	 callback(null, true, notification);
		})
		.catch(function(err){
			console.log('error:', err);
		 	callback(new Error(err), false, null);
		});
    },
    create: function(body, callback) {

    	var notification = new Notification({
			category: category,
			user: body.user,
			icon: body.icon
		});

		notification
        .save()
        .then(function(notification) {
			callback(null, true);
			console.log(notification);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    edit: function(id, body, callback) {

    	Notification
        .update({_id: id}, {$set:body})
        .then(function(notification) {
        	console.log(notification);
			callback(null, true);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    remove: function(id, callback) {

    	Notification
        .findById(id)
        .remove()
        .then(function(removed) {
        	console.log(removed);

        	if(removed.result.n > 0){
				callback(null, true);
			}else{
				callback(new Error("Notificação não encontrada."), false);
			}
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    }
};
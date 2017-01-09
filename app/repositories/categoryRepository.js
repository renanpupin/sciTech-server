var Category = require('../models/category.js');

module.exports = {
    getAll: function(page, callback) {
        Category
        .find()
        // .exec()
        .then(function(categories) {
		  	callback(null, true, categories);
		})
		.catch(function(err){
		  	console.log('error:', err);
		  	callback(new Error(err), false, null);
		});
    },
    get: function(id, callback) {
        
        Category
        .findById(id)
        .then(function(category) {
		 	 callback(null, true, category);
		})
		.catch(function(err){
			console.log('error:', err);
		 	callback(new Error(err), false, null);
		});
    },
    create: function(body, callback) {

    	var category = new Category({
			name: body.name,
			cover_image: body.cover_image,
			icon: body.icon
		});

		category
        .save()
        .then(function(category) {
			callback(null, true);
			console.log(category);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    edit: function(id, body, callback) {

    	Category
        .update({_id: id}, {$set:body})
        .then(function(category) {
        	console.log(category);
			callback(null, true);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    remove: function(id, callback) {

    	Category
        .findById(id)
        .remove()
        .then(function(removed) {
        	console.log(removed);

        	if(removed.result.n > 0){
				callback(null, true);
			}else{
				callback(new Error("Categoria não encontrada."), false);
			}
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    }
};
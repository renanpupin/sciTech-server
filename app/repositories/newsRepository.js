var News = require('../models/news.js');

module.exports = {
    getAll: function(page, callback) {
        News
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
        
        News
        .findById(id)
        .then(function(news) {
		 	 callback(null, true, news);
		})
		.catch(function(err){
			console.log('error:', err);
		 	callback(new Error(err), false, null);
		});
    },
    create: function(body, callback) {

    	var news = new News({
			title: body.title,
			cover_image: body.cover_image,
			content: body.content,
			category: body.category,
			status: body.status,
			icon: body.icon
		});

		news
        .save()
        .then(function(news) {
			callback(null, true);
			console.log(news);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    edit: function(id, body, callback) {

    	News
        .update({_id: id}, {$set:body})
        .then(function(news) {
        	console.log(news);
			callback(null, true);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
    remove: function(id, callback) {

    	News
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
    },
    setPublished: function(id, callback) {

    	News
        .findById(id)
        .then(function(news) {
        	var now = new Date();
        	news.published_at = now;
        	news.status = "published";
        	news.save();

        	//TODO: send notifications here
        	
			callback(null, true);
		})
		.catch(function(err){
			console.log('error:', err);
			callback(new Error(err), false);
		});
    },
};
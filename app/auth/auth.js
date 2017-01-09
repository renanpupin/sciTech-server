// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var User = require("../models/user.js");
var passportConfig = require("../config/passport.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
	secretOrKey: passportConfig.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {

	var strategy = new Strategy(params, function(payload, done) {
		User.findById(payload.id, '_id name email +password type', function(err, user) {
			if (err) return done(err, false);

			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	});
	
	passport.use(strategy);
	
	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
			return passport.authenticate("jwt", passportConfig.jwtSession);
		}
	};
};
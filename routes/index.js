exports.initialize = function(req, res) {   
	// Your code goes here
	var data = require("../data.json");
	if(req.session.userID != undefined){

		res.render('./homepage',data.Students[req.session.userID]);
	}
	res.render('index');

}
exports.logout = function(req,res){

	req.session.userID = undefined;
	console.log(req.session.studentID);
	res.render('index');
}

exports.authenticate = function(req, res) {
	var data = require("../data.json");
	var email = req.body.email;
	var password = req.body.password;
	var validated = false;


	for ( var i = 0; i < data.Students.length; i++ ) {
		var student = data.Students[i];
		if (student.email == email
			&& student.password == password) {
			req.session.userID = data.Students[i].id;
			validated = true;
			break;
		}
	}

	if ( validated ) {
		res.redirect('./homepage');
	}
	else {
		res.render('index', {
			'error': true 
		})
	}
}



var data = require("../data.json");

exports.initialize  = function(req, res) {  
	// Your code goes here
	res.render('sign-up');
}

exports.addUser = function(req, res) {

	var parameters = req.query;
    var newID = data.Students.length;

	var newClass = {
					"id": newID,
					"firstName": parameters.firstName,
					"lastName": parameters.lastName,
					"university": "University of California, San Diego",
					"email": parameters.email,
					"password": parameters.password,
					"imageURL": "http://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg",
					"quarters": { 
						"winter2014": [],
						"fall2013": [],
						"summer2013": [],
						"spring2013": [],
						"winter2013": [],
						"fall2013": []
						}
					};
    data.Students.push(newClass);
    req.query.id = newID;
    req.session.userID =  newID;
	res.render('./homepage', data.Students[newID]);
}
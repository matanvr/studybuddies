var data = require("../data.json");

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
function capitalize(s)
{
  return s[0].toUpperCase() + s.slice(1);
}

exports.initialize = function(req, res) {    
	// Your code goes here
	
	var studentID = req.session.userID;

	if(studentID == undefined){
		res.render('./index');
	}

    data.Students[studentID].allClasses = [];
    for (var current in data.Students[studentID].quarters){

		for (var i = 0; i < data.Students[studentID].quarters[current].length;i++){
			    var classEntry = data.Students[studentID].quarters[current][i];
			    classEntry.quarter = capitalize(current.replace(/([a-z])(?=[0-9])/ig, '$1 '));
				data.Students[studentID].allClasses.push(classEntry);
			
		}
	}
	



	res.render('homepage',data.Students[studentID]);

 }
exports.addClass = function(req,res) {



	var parameters = req.query;
	var newClass = {
							"id": parameters.classID,
							"name": parameters.className,
							"section": parameters.sectionID
					};

	var studentID = req.session.userID;

	if(studentID == undefined){
		res.render('./index');
	}


	data.Students[studentID].quarters[parameters.term].push(newClass);

	var classAdded = false;

	for (var i = 0; i <data.Classes.length; i++)
	{
		if(data.Classes[i].section == parameters.sectionID){
			data.Classes[i].students.push({"id": studentID});
			classAdded = true;

		}

	}
	if(!classAdded){
		newClass.students = [{"id": studentID}];
		data.Classes.push(newClass);

	}		
	//console.log(data.Students[0].quarters[parameters.term]);
	res.json({"result" : "success"});

} 

exports.removeClass = function(req,res) {
	var parameters = req.query;
	var removedClass = {
							"id": parameters.className,
							"name": parameters.className,
							"section" : parameters.sectionID
					};
	var studentID = req.session.userID;
	console.log(removedClass);
	if(studentID == undefined){
		res.render('./index');
	}
	for (var quarterName in data.Students[studentID].quarters){
		var currentQuarter= data.Students[studentID].quarters[quarterName];
		//console.log(currentQuarter);
		for (var curCl = 0; curCl < currentQuarter.length; curCl++){
			
			currentClass = currentQuarter[curCl];
			if(removedClass.section == currentClass.section){
				console.log("removing" + removedClass);
				data.Students[studentID].quarters[quarterName].remove(curCl);

				//remove the student from the class
				for (var curr in data.Classes){

					console.log(data.Classes[curr].section + "  " + removedClass.section);
					if(data.Classes[curr].section == removedClass.section){
						for (var i = 0; i< data.Classes[curr].students.length;i++){
							if(studentID == data.Classes[curr].students[i].id){
								
								console.log(data.Classes[curr].students);
								data.Classes[curr].students.remove(i);
								console.log(data.Classes[curr].students);
								return {"result" : "success"};
							}
						}
					}
				}
				
			}
		}	
	}
	return {"result" : "failed"};

}



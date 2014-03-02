
$('.clickable').click(function() {
	var courseName = $(this).parent().find('td').html();
	var className = $(this).parent().find('td').eq(1).html();
	var sectionID = $(this).parent().find('td').eq(2).html();
	window.location.href = "class?courseName=" + courseName + "&className=" + className 
	+ "&sectionID=" + sectionID;
});


$('.classes tr td .remove').click(function(){
	//Remove Classs
});

$('#editToggle').click(function(){

	
	$('#winter2014table tr td').each(function (i){
		if(i%4 == 3)
			$(this).toggle();
	});
	$("#winter2014table th").eq(3).toggle();
	$("#togglewinter2014").toggle();

});

$('#winter2014table tr td').each(function (i){
	if(i%4 == 3)
		$(this).hide();
});
$("#winter2014table th").eq(3).hide();
$("#togglewinter2014").hide();




$('#editToggleFall2013').click(function(){

	
	$('#fall2013table tr td').each(function (i){
		if(i%4 == 3)
			$(this).toggle();
	});
	$("#fall2013table th").eq(3).toggle();
	$("#togglefall2013").toggle();

});
	$('#fall2013table tr td').each(function (i){
		if(i%4 == 3)
			$(this).hide();
	});
	$("#fall2013table th").eq(3).hide();
	$("#togglefall2013").hide();




$('#editToggleSummer2013').click(function(){
	
	$('#summer2013table tr td').each(function (i){
		if(i%4 == 3)
			$(this).toggle();
	});
	$("#summer2013table th").eq(3).toggle();
	$("#togglesummer2013").toggle();

});

	$('#summer2013table tr td').each(function (i){
		if(i%4 == 3)
			$(this).toggle();
	});
	$("#summer2013table th").eq(3).toggle();
	$("#togglesummer2013").toggle();




$('#editToggleSpring2013').click(function(){
	
	$('#spring2013table tr td').each(function (i){
		if(i%4 == 3)
			$(this).toggle();
	});
	$("#spring2013table th").eq(3).toggle();
	$("#togglespring2013").toggle();

});

	$('#spring2013table tr td').each(function (i){
		if(i%4 == 3)
			$(this).toggle();
	});
	$("#spring2013table th").eq(3).toggle();
	$("#togglespring2013").toggle();	


$('.remove').click(function(){
	var courseName = $(this).parent().find('td').html();
	var className = $(this).parent().find('td').eq(1).html();
	var sectionID = $(this).parent().find('td').eq(2).html();
	$.get('./removeClass?courseName=' + courseName + '&className=' + className + '&sectionID=' + sectionID, removeClass);
	$(this).parent().remove();



});

$('.addclass').click(function(){
	
	var courseName = $(this).parent().find(".classID").eq(0).val();
	var className = $(this).parent().find(".className").eq(0).val();
	var sectionID = $(this).parent().find(".sectionID").eq(0).val(); 
	var term = $(this).parent().find(".term").eq(0).val(); 
	$(this).parent().find(".className").eq(0).val('');
	$(this).parent().find(".sectionID").eq(0).val(''); 
	$(this).parent().find(".classID").eq(0).val('');
	$.get('./addClass?classID=' + courseName + '&className=' + className + '&sectionID=' + sectionID + '&term=' + term, addClass);
	var termTable = "#"+ term + "table";
	var newRow = "<tr><td class ='clickable' >"+ courseName+"</td><td class ='clickable'>"+className+"</td><td class ='clickable'>"+ sectionID  +"</td> <td class='remove'>  <span class='glyphicon glyphicon-remove'></span></td></tr>";
	var newRow2 = "<tr><td class ='clickable' >"+ courseName+"</td><td class ='clickable'>"+className+"</td><td class ='clickable'>"+ sectionID  +"</td> <td >" + term+"</td></tr>";
	$(termTable).append(newRow);
    $(".AllClasses").append(newRow2);
	$('.remove').click(function(){
	var courseName = $(this).parent().find('td').html();
	var className = $(this).parent().find('td').eq(1).html();
	var sectionID = $(this).parent().find('td').eq(2).html();
	$.get('./removeClass?courseName=' + courseName + '&className=' + className + '&sectionID=' + sectionID, removeClass);
	$(this).parent().remove();



	});
	$('.clickable').click(function() {
	var courseName = $(this).parent().find('td').html();
	var className = $(this).parent().find('td').eq(1).html();
	var sectionID = $(this).parent().find('td').eq(2).html();
	window.location.href = "class?courseName=" + courseName + "&className=" + className 
	+ "&sectionID=" + sectionID;
	});


});

function removeClass(result){
	console.log("success");
}

function addClass(result){
	console.log("success");
}

$(document).ready(function(event) {
	classes = $('table.AllClasses tbody tr');
	classes.filter = filterClasses;
	//console.log(students);

	$('#filter').keyup(function(e) {
		classes.filter($('#filter').val());
	});
});
function filterClasses(name) {
	name = name.toLowerCase();
	this.each(function() {
		var properties = $(this).find('td');
		var header = ($(this).find('th'))[0];
		//console.log(properties);
		var fullname = ($(properties[0]).text() + " " + $(properties[1]).text() + " " + $(properties[2]).text() + " " + $(properties[3]).text()).toLowerCase();
		
		if ( fullname.search(name) == -1 && !header) {
			console.log(header);
			$(this).hide();
		}
		else {

			$(this).show();
		}
	});
}


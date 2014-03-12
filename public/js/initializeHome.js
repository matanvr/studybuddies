


$('.clickable').click(function() {
	var courseName = $(this).parent().find('td').html();
	var className = $(this).parent().find('td').eq(1).html();
	var sectionID = $(this).parent().find('td').eq(2).html();
	window.location.href = "class?courseName=" + courseName + "&className=" + className 
	+ "&sectionID=" + sectionID;
});

$('.class-click').click(function(){
	var parentDiv = $(this).parent().parent();
	var courseName = parentDiv.find('.info .class-id').html();
	var className = parentDiv.find('.info .class-name').html();
	var sectionID = parentDiv.find('.info .section').html();
	var url = "class?courseName=" + courseName + "&className=" + className 
	+ "&sectionID=" + sectionID;
	window.location.href=url;
	
});

$('.edit-toggle').click(function(){
     var parentDiv = $(this).parent().parent().parent();
	if($(this).hasClass('on')){
		var classes = parentDiv.find('.list-group a .pull-right').html('<button class="btn btn-primary class-click"> View </button>');
		$('.class-click').click(function(){
			var parentDiv = $(this).parent().parent();
			var courseName = parentDiv.find('.info .class-id').html();
			var className = parentDiv.find('.info .class-name').html();
			var sectionID = parentDiv.find('.info .section').html();
			var url = "class?courseName=" + courseName + "&className=" + className 
			+ "&sectionID=" + sectionID;
			window.location.href=url;
			
		});
	}
	else{
		var classes = parentDiv.find('.list-group a .pull-right').html('<button class="btn btn-danger remove-click"> Remove </button>');
		$('.remove-click').click(function(){
			//console.log('1');
			var parentDiv = $(this).parent().parent();
			var courseName = parentDiv.find('.info .class-id').html();
			var className = parentDiv.find('.info .class-name').html();
			var sectionID = parentDiv.find('.info .section').html();
			$.get('./removeClass?courseName=' + courseName + '&className=' + className + '&sectionID=' + sectionID, removeClass);
			console.log($(this).parent().parent().attr('class'));
			$(this).parent().parent().remove();
		});
	}
	$(this).toggleClass('on');
	$(this).parent().parent().parent().parent().find('.toggle-menu').toggle();
	//$("#togglewinter2014").toggle();
});


$('.toggle-menu').hide();


$('.add-class').click(function(){
	
	var courseName = $(this).parent().find(".classID").eq(0).val();
	var className = $(this).parent().find(".className").eq(0).val();
	var sectionID = $(this).parent().find(".sectionID").eq(0).val(); 
	var term = $(this).parent().find(".term").eq(0).val(); 
	$(this).parent().find(".className").eq(0).val('');
	$(this).parent().find(".sectionID").eq(0).val(''); 
	$(this).parent().find(".classID").eq(0).val('');
	$.get('./addClass?classID=' + courseName + '&className=' + className + '&sectionID=' + sectionID + '&term=' + term, addClass);
		
	var parentDiv = $(this).parent().parent().parent().parent().find('.list-group');
    
    var htmlClass = "<a class='list-group-item' id='sectionID' > " +
     "<span class='pull-right'>"+
        "<button class='btn btn-primary class-click'> View </button>" + 
     "</span>"+
      "<span class='info'><h4 class='class-id'>"+courseName + "</h4> <span class='class-name'>" + className+" </span> <br> Section <span class='section'>"+ sectionID + " </span></span>" + 
    "</a>";

    var htmlClass2 = "<a class='list-group-item' id='sectionID' > " +
     "<span class='pull-right'>"+
        "<button class='btn btn-primary class-click'> View </button>" + 
     "</span>"+
      "<span class='info'><h4 class='class-id'>"+courseName + "</h4> <span class='class-name'>" + className+" </span> <br> Section <span class='section'> "+ sectionID + " </span> <br><span> "+term+"</span></span>" + 
    "</a>";
    parentDiv.append(htmlClass);
    $("#AllClasses").append(htmlClass2);

    //adding clicks to class
    $('.class-click').click(function(){
		var parentDiv = $(this).parent().parent();
		var courseName = parentDiv.find('.info .class-id').html();
		var className = parentDiv.find('.info .class-name').html();
		var sectionID = parentDiv.find('.info .section').html();
		var url = "class?courseName=" + courseName + "&className=" + className 
		+ "&sectionID=" + sectionID;
		window.location.href=url;
	
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


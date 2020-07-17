function openNav(element) {
	//console.log(element.value);
	if (element.id == "active"){
		closeNav();
	}
	else if (document.getElementById("active")){
		closeNav();	
		openNav(element);
	}
	else{
		element.setAttribute("id", "active");
		element.style.backgroundColor = "#23ACD6";
		element.style.color = "#222831";
		if (document.getElementById(element.value+"Nav")){
			document.getElementById(element.value+"Nav").style.width = "16%";	
		}
		
	}
}

function closeNav() {
		closeOptions();
		var element = document.getElementById("active")
		//console.log(element.value);
		element.style.backgroundColor = "#222831";
		element.style.color = "#FFF";
		element.setAttribute("id", "");
		if (document.getElementById(element.value+"Nav")){
			document.getElementById(element.value+"Nav").style.width = "0";	
		}
}

function showOptions(element) {
	if (element.id == "active1"){
		closeOptions();
	}
	else if (document.getElementById("active1")){
		closeOptions();	
		showOptions(element);
	}
	else{
		element.setAttribute("id", "active1");
		element.style.backgroundColor = "#23ACD6";
		element.style.color = "#222831";
		var pname = element.getAttribute("data-pname");
		console.log("#"+pname+element.value);
		$("#"+pname+element.value).slideToggle("0.4s");
	}
}

function closeOptions() {
	if (document.getElementById("active1")){
		var element = document.getElementById("active1");
		var pname = element.getAttribute("data-pname");
		console.log("#"+pname+element.value);
		element.style.backgroundColor = "#222831";
		element.style.color = "#FFF";
		element.setAttribute("id", "");
		$("#"+pname+element.value).slideToggle("0.4s");
	}
}

function zoom(element){
		var zoom=$(element).val();
		console.log(zoom);
		var canvas = $("#Canvas");
		canvas.width(width*zoom/50);
		canvas.height(height*zoom/50);
}

function zoomless(){
		var zoom=$("#zoom").val();
		var i = Math.ceil(parseInt(zoom)/10)*10-10;
		console.log(i);
		if (i>0) {
			var canvas = $("#Canvas");
			canvas.width(width*i/50);
			canvas.height(height*i/50);
			$('#zoom').append($('<option>', {
				value: i,
				text: i+"%",
				style: "display:none;"
			}));
			$("#zoom").val(i);
		}
}

function zoommore(){
		var zoom=$("#zoom").val();
		var i = Math.floor(parseInt(zoom)/10)*10+10;
		console.log(i);
		var canvas = $("#Canvas");
		canvas.width(width*i/50);
		canvas.height(height*i/50);
		$('#zoom').append($('<option>', {
			value: i,
			text: i+"%",
			style: "display:none;"
		}));
		$("#zoom").val(i);
}

function postdata(op,img,values = null){
	var objectData =
		     {
		         Operation: op,
				 Image: img,
			     Values: values   
		     };
	$.ajax({
		        type: "POST",
		        url: "/edit",
		        dataType: "json",
		        data: objectData,
		        success: function (data) {
					if (data['status']=="Ok"){
						console.log("Success");
						console.log(data['file']);
						window.location.reload();
					}
					else if (data['status']=="Error"){
						console.log("Some error occured");
						console.log(data['error']);
					}
		        },
		        error: function () {
		         alert('There is an issue with the internet connections');
		        }
		    });
}

function resizep(img,inph,inpv,check,h=true){
	console.log("ResizeP");
	if (check.attr("value")=="true"){
		if (h) inpv.val(inph.val()); 
		else inph.val(inpv.val());
	}	
	img.width((imgw*(inph.val()/100))+"px");
	img.height((imgh*(inpv.val()/100))+"px");
}
function resized(img,inph,inpv,check,h=true){
	postdata("Download");
}

function undo(){
	postdata("Undo");
}

function redo(){
	postdata("Redo");
}

function save(){
	postdata("Save");
}

function crop(){
	postdata("Crop");
}

function rotate90(clockwise=true){
	if(clockwise){
		postdata("Rotate 90 deg clockwise");
	}
	else{
		postdata("Rotate 90 deg anti-clockwise");
	}
}

function mirror(){
	postdata("Rotate mirror");
}

function rotate(){
	postdata("Rotate custom");
}

function blur(){
	postdata("Blur");
}
function sharpen(){
	postdata("Sharpen");
}
function grayscale(){
	img = document.getElementById("image").src.replace('http://127.0.0.1:5000/','');
	postdata("Grayscale",img);
}
function negative(){
	postdata("Negative");
}

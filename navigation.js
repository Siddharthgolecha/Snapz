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
		if (zoom=="100"){
			canvas.width("80%");
			canvas.height("90%");
		}
		else{
			canvas.width(width*zoom/100);
			canvas.height(height*zoom/100);
		}
}

function zoomless(){
		var zoom=$("#zoom").val();
		var i = zoom-10;
		console.log(i);
		var canvas = $("#Canvas");
		w = $('#Canvas').width();
		h = $("#Canvas").height();
		canvas.width(w*i/100);
		canvas.height(h*i/100);
		$('#zoom').append($('<option>', {
			value: i,
			text: i+"%",
			style: "display:none;"
		}));
		$("#zoom").val(i);
}

function zoommore(){
		var zoom=$("#zoom").val();
		var i = zoom+10;
		console.log(i);
		var canvas = $("#Canvas");
		w = $('#Canvas').width();
		h = $("#Canvas").height();
		canvas.width(w*i/100);
		canvas.height(h*i/100);
		$('#zoom').append($('<option>', {
			value: i,
			text: i+"%",
			style: "display:none;"
		}));
		$("#zoom").val(i);
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
	console.log("ResizeD");
	if (check.attr("value")=="true"){
		if (h) inpv.val(Math.round(inph.val()*ratio)); 
		else inph.val(Math.round(inpv.val()/ratio));
	}	
	img.width(inph.val()+"px");
	img.height(inpv.val()+"px");
}

function download(){
	console.log("Download");
}

function undo(){
	console.log("Undo");
}

function redo(){
	console.log("Redo");
}

function save(){
	console.log("Save");
}

function crop(){
	console.log("Crop");
}

function rotate90(clockwise=true){
	if(clockwise){
		console.log("Rotate 90 deg clockwise");
	}
	else{
		console.log("Rotate 90 deg anti-clockwise");
	}
}

function mirror(){
	console.log("Rotate mirror");
}

function rotate(){
	console.log("Rotate custom");
}

function blur(){
	console.log("Blur");
}
function sharpen(){
	console.log("Sharpen");
}
function grayscale(){
	console.log("Grayscale");
}
function negative(){
	console.log("Negative");
}

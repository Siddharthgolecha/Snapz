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

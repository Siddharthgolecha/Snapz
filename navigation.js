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
			document.getElementById(element.value+"Nav").style.width = "220px";	
		}
		
	}
}

function closeNav() {
		var element = document.getElementById("active")
		//console.log(element.value);
		element.style.backgroundColor = "#222831";
		element.style.color = "#FFF";
		element.setAttribute("id", "");
		if (document.getElementById(element.value+"Nav")){
			document.getElementById(element.value+"Nav").style.width = "0";	
		}
}

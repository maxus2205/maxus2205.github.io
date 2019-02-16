menu.onclick = function myFunction() {
	var x = document.getElementById("menu");

	if(x.className === "nav_menu") {
		x.className += " responsive";
	}
	else{
		x.className = "nav_menu";
	}
}
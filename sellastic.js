window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("nav").style.height = "80px";
	document.getElementById("cartCount").style.top="0.6rem";
  } else {
    document.getElementById("nav").style.height = "120px";
	document.getElementById("cartCount").style.top="1.6rem";
  }
}

//Bottom Nav//

function openmenu(){

	document.getElementById("menu").style.display="block";
	document.getElementById("category").style.display="none";
	document.getElementById("side-search").style.display="none";
	document.getElementById("side-cart").style.display="none";
	document.getElementById("nav2-panel").style.width="100%";
	document.getElementById("sidepanel").style.display="block"
}

function opencategory(){

	document.getElementById("menu").style.display="none";
	document.getElementById("category").style.display="block";
	document.getElementById("side-search").style.display="none";
	document.getElementById("side-cart").style.display="none";
	document.getElementById("nav2-panel").style.width="100%";
	document.getElementById("sidepanel").style.display="block"
}

function opensidesearch(){

	document.getElementById("menu").style.display="none";
	document.getElementById("category").style.display="none";
	document.getElementById("side-search").style.display="block";
	document.getElementById("side-cart").style.display="none";
	document.getElementById("nav2-panel").style.width="100%";
	document.getElementById("sidepanel").style.display="block"
}

function opensidecart(){

	document.getElementById("menu").style.display="none";
	document.getElementById("category").style.display="none";
	document.getElementById("side-search").style.display="none";
	document.getElementById("side-cart").style.display="block";
	document.getElementById("nav2-panel").style.width="100%";
	document.getElementById("sidepanel").style.display="block"
}

function exit(){
	document.getElementById("sidepanel").style.display="none";
	document.getElementById("nav2-panel").style.width="0";
	

}









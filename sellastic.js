window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("nav").style.height = "80px";
	document.getElementById("cartCount").style.top="0.9rem";
	document.querySelector(".wishCount").style.top="0.9rem";
  } else {
    document.getElementById("nav").style.height = "120px";
	document.getElementById("cartCount").style.top="1.9rem";
	document.querySelector(".wishCount").style.top="1.9rem";
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


// let card=document.querySelectorAll('.card');
// let wish=document.querySelector('.go-corner .btn');

// alert(typeof(wish));
// if(wish){
// 	for (let i = 0; i < card.length; i++) {
// 		card[i].addEventListener('mouseover',(e)=>{
// 			const ele=card[i]
// 			alert(ele);
// 		});
		
		
// 	}
// }









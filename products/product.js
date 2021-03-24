window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("nav").style.height = "80px";
  } else {
    document.getElementById("nav").style.height = "120px";
  }
}

function checkavailability(){
	var arr = [147001,147111,147203,140406,143001,140118];
	var pincode=document.getElementById("delivery").value;
	var time = new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString();
	var regex = /^[a-zA-Z0-9 !@#$%\^&*)(+=._-]*$/
	var regexnum = /^[0-9]*$/
	for(i=0;i<arr.length;i++){
		if(pincode==arr[i]){
			document.getElementById("output").innerHTML="<b>Delivery in 2 Days | Free <strike>₹40</strike></b> <br> Only if you order before "+time;
			document.getElementById("output").style.color="#198754";
			break
		}
		else if(regexnum.test(pincode)){document.getElementById("output").innerHTML="<b>Sorry, We are expanding,<br> We will be there soon</b>";
		document.getElementById("output").style.color="red";
		if(pincode.length<6){document.getElementById("output").innerHTML="<b>Not a valid pincode<b/>";
		document.getElementById("output").style.color="red";}
	}
		else if(pincode==""|| regex.test(pincode)){document.getElementById("output").innerHTML="<b>Not a valid pincode<b/>";
		document.getElementById("output").style.color="red";
	}

}
}

function reviewform(){
	document.getElementById("btn-review").style.display="none";
	document.getElementById("review-form").style.display="flex";
}

function reviewformcancle(){
	document.getElementById("review-form").style.display="none";
	document.getElementById("btn-review").style.display="block";
}

var preload = document.getElementById('loading');



const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});





var signupdata=[
{Username:"Username",Email:"abc@mail.com",Password:"Password"}
];

function registercheck() {
	var register_user = document.getElementById("register-username");
	var register_pass = document.getElementById("register-password");
	var register_Cpass = document.getElementById("register-Cpassword");
	var register_email = document.getElementById("register-email");

	var check_pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*0-9]{8,20}$/;

	if (register_pass.value.length == " ") {
        alert("Must Contain Password.")
    }
    else if(register_pass.value.match(check_pass)){
    	alert("strong password");
    	if (register_pass.value == register_Cpass.value) {
    		signupdata.push({Username:register_user.value, Email:register_email.value , Password:register_pass.value});
    		console.log(signupdata);
    	} else {
    		alert("Password Doesn't Match")
    	}
    }

}

function logincheck() {
	var login_user = document.getElementById("login-username");
	var login_pass = document.getElementById("login-password");
	
	var usercheck = signupdata.filter(function(ele){
		return (ele.Username == login_user) && (ele.Password == login_pass);
	});
	if (login_user.value.length == " " || login_pass.value.length == " ") {
        alert("Invalid Credentials.")
    }else{
    	if (usercheck=true) {
		console.log("yes");
		window.open("../index.html");
	} else {
		console.log("no");
	}
}
	
}
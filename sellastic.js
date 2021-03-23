window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("nav").style.height = "80px";
  } else {
    document.getElementById("nav").style.height = "120px";
  }
}







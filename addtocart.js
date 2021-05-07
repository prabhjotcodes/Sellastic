console.log("addtocart done!");
let carts = document.querySelectorAll('.add-cart');
var names=document.getElementById('product-name');

if (names) {
	var products=[
		{
			name:document.getElementById("product-name").textContent,
			tag:document.getElementById("product-name").textContent.slice(0,4),
			image:$('.product-sm').children('img').attr('src'),
			disprice:document.getElementById('pricea').textContent,
			orgprice:document.getElementById('priceb').textContent,
			dispercentage:document.getElementById('pricec').textContent,
			inCart:0,
		}
	];
} else {
	
}

// var products=[
// 	{
// 		name:document.getElementById("product-name").textContent,
// 		tag:document.getElementById("product-name").textContent.slice(0,4),
// 		image:$('.product-sm').children('img').attr('src'),
// 		disprice:document.getElementById('pricea').textContent,
// 		orgprice:document.getElementById('priceb').textContent,
// 		dispercentage:document.getElementById('pricec').textContent,
// 		inCart:0,
// 	}
// ];

//console.log(products[0]);
for (var i = 0; i < carts.length; i++) {
	carts[i].addEventListener('click',(e)=>{
		cartNumbers(products[0]);
		totalCost(products[0]);
	});

}

function onloadCartNumber(){
	let productNumbers=localStorage.getItem('cartNumbers');
	if(productNumbers){
		document.querySelector("#hidecart span").textContent= productNumbers;
	}
};

function cartNumbers(product){
	let productNumbers=localStorage.getItem('cartNumbers');
	productNumbers=parseInt(productNumbers);
	if(productNumbers){
		localStorage.setItem("cartNumbers",productNumbers+1);
		document.querySelector("#hidecart span").textContent= productNumbers+1;
	}
	else{
		localStorage.setItem("cartNumbers",1);
		document.querySelector("#hidecart span").textContent= 1;


	}
	setItems(product);
}

function setItems(product){
	let cartItems = localStorage.getItem('productInCart');
	cartItems=JSON.parse(cartItems);

	if (cartItems != null) {
		if(cartItems[product.tag] == undefined){
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1; 
	} else {
		product.inCart=1;
		cartItems={
			[product.tag]: product
		}
	}

	localStorage.setItem("productInCart", JSON.stringify(cartItems));
}
 function totalCost(price){
	var reg=/[₹ ,]/gm;
	var disprice=price.disprice;
	if(disprice.match(reg)){
		console.log("true");
		var disprice=disprice.replace(/₹/i,"");
		var disprice=disprice.replace(/,/i,"");
		disprice=parseInt(disprice);
	}
	let cartCost=localStorage.getItem("totalCost");
	
	if (cartCost != null) {
		cartCost=parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost+ disprice)
	} else {
		localStorage.setItem("totalCost", disprice)
	}
 }

onloadCartNumber();


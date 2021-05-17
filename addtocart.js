console.log("addtocart done!");

// ===============Getting Some Values===============
let carts = document.querySelectorAll('.add-cart');
var names = document.getElementById('product-name');
var increase = document.querySelectorAll('.inc');
console.log(increase)


// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

// ==========================Creating An Object To set in localStorage and Display in WishList========================
if (names) {
	var products = [
		{
			name: document.getElementById("product-name").textContent,
			tag: document.getElementById("product-name").textContent.slice(0, 4),
			image: $('.product-sm').children('img').attr('src'),
			rating: document.getElementById('rating').textContent,
			disprice: document.getElementById('pricea').textContent,
			orgprice: document.getElementById('priceb').textContent,
			dispercentage: document.getElementById('pricec').textContent,
			inCart: 0,
			inWish: 0,
		}
	];
}

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}


// ================= Searching For button Clicked Add to Cart Which will call functions for further Process================

for (var i = 0; i < carts.length; i++) {
	carts[i].addEventListener('click', (e) => {
		cartNumbers(products[0]);
		totalCost(products[0]);
	});
}

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}



// ========================This Function will check if the number is present in local Storage=======================
// ======================== and if found ,this will update the html page with the number ===========================

function onloadCartNumber() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers) {
		console.log("Somthing In Cart")
		document.querySelector("#hidecart span").textContent = productNumbers;
	} else {
		console.log("Nothing In Cart")
	}
};

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}



// ========================This Function will Increase the number of the cart item and update in local Storage=======================

function cartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Added To Cart!',
		text: 'Your Product Successfully Added To Cart',
		showConfirmButton: false,
		timer: 1500
	})
	if (productNumbers) {
		localStorage.setItem("cartNumbers", productNumbers + 1);
		document.querySelector("#hidecart span").textContent = productNumbers + 1;
	}
	else {
		localStorage.setItem("cartNumbers", 1);
		document.querySelector("#hidecart span").textContent = 1;
	}
	setItems(product);
}

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}


//======================== This function will set Product in the Cart and Updated In the LocalStorage ==================

function setItems(product) {
	let cartItems = localStorage.getItem('productInCartOrg');
	cartItems = JSON.parse(cartItems);


	if (cartItems != null) {
		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}

	localStorage.setItem("productInCartOrg", JSON.stringify(cartItems));
	displayCart();
}

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{======= Deleting Item From LocalStorage=============}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}


// ==================This Function will Count the total price 

function totalCost(price) {
	var reg = /[₹ ,]/gm;
	var disprice = price.disprice;
	if (disprice.match(reg)) {
		console.log("true");
		var disprice = disprice.replace(/₹/i,"");
		var disprice = disprice.replace(/,/i,"");
		disprice = parseInt(disprice);
	}
	let cartCost = localStorage.getItem("totalCost");
	
	if (cartCost != null) {
		console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
		cartCost = parseInt(cartCost);
		if(price.inCart){
			disprice= price.inCart * disprice;
			console.log("disprice",disprice)
			localStorage.setItem("totalCost", cartCost + disprice)
		}
		localStorage.setItem("totalCost", cartCost + disprice)
	} else {
		localStorage.setItem("totalCost", disprice)
	}
}

function totalCostRed(price) {
	console.log(price)
	var reg = /[₹ ,]/gm;
	var disprice = price.disprice;
	if (disprice.match(reg)) {
		var disprice = disprice.replace(/₹/i,"");
		var disprice = disprice.replace(/,/i,"");
		disprice = parseInt(disprice);
	}
	let cartCost = localStorage.getItem("totalCost");
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		console.log(typeof(price.inCart));
		if(price.inCart){
			console.log(disprice)
			disprice= disprice * price.inCart;
			console.log("disprice",disprice)
			localStorage.setItem("totalCost", cartCost - disprice)
		}
		
	}
}
var sum=9;
console.log(9*sum);

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{======= Deleting Item From LocalStorage=============}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}



function getKeyValue(object) {
	var keys = Object.keys(object)
	for (let i = 0; i < keys.length; i++) {
		const element = keys[i];
		return element;
	}
}




function remove(data) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	console.log(productNumbers)
	var id = data;
	console.log(id);
	let cartItems = localStorage.getItem('productInCartOrg');
	cartItems = JSON.parse(cartItems);
	totalCostRed(cartItems[id]);
	decCartNumbers(cartItems[id]);
	delete cartItems[id];
	deleteProductCart(id);
	displayCart();
	
	localStorage.setItem("productInCartOrg", JSON.stringify(cartItems));
	var my = isEmptyObject(cartItems);
	if (my) {
		console.log("my")
		delete localStorage.productInCartOrg;
		delete localStorage.cartNumbers;
		delete localStorage.totalCost;
		delete localStorage.productInCart;
		$(document).ready(function () {
			setTimeout(function () {
				window.location.reload();
			}, 500);
		});
	}

}
function isEmptyObject(obj) {
	return JSON.stringify(obj) === '{}';
}
function deleteProductCart(rem) {
	console.log(rem);
	var remo = "rem" + rem;
	var x = document.getElementById(remo);
	x.parentNode.removeChild(x);
}

function decCartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	let cartItems = localStorage.getItem('productInCartOrg');
	cartItems = JSON.parse(cartItems);
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'Remove From Cart!',
		text: 'Your Product Successfully Removed From Cart',
		showConfirmButton: false,
		timer: 1500
	})
	var inCartvalue = product.inCart;
	console.log(inCartvalue);
	console.log(product.tag);
	if (productNumbers) {
		localStorage.setItem("cartNumbers", productNumbers - inCartvalue);
		document.querySelector("#hidecart span").textContent = productNumbers - inCartvalue;
	}
	else {
		localStorage.setItem("cartNumbers", 0);
		document.querySelector("#hidecart span").textContent = 0;
	}
}

function increaseCart(id){
	console.log("increase",id);
	let productInc= localStorage.getItem('productInCartOrg');
	productInc=JSON.parse(productInc);
	var productInCartInc= productInc[id];
	console.log("with id incart",productInCartInc.inCart);
	IncNumbers(productInCartInc,id);
	totalCostMax(productInCartInc);
	// $(document).ready(function () {
	// 	setTimeout(function () {
	// 		window.location.reload();
	// 	}, 500);
	// });
	displayCost();

}

function IncNumbers(product,id) {
	console.log(product)
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	let cartItems = localStorage.getItem('productInCartOrg');
	cartItems = JSON.parse(cartItems);
	
	var inCartvalue = product.inCart;
	console.log(inCartvalue);
	console.log(product.tag);
	if (productNumbers) {
		localStorage.setItem("cartNumbers", productNumbers + 1);
		document.querySelector("#hidecart span").textContent = productNumbers + 1;
	}
	else {
		localStorage.setItem("cartNumbers", 0);
		document.querySelector("#hidecart span").textContent = 0;
	}
	if (cartItems != null) {
		console.log(cartItems[id])
		console.log(cartItems[id].inCart)
		console.log(cartItems[id].inCart > 0)
		if(cartItems[id].inCart > 0){
			cartItems[id].inCart +=1;
			console.log(cartItems[id]);

			Swal.fire({
				position: 'center',
				icon: 'info',
				title: 'Quantity Increased!',
				text: 'Your Product Quantity Successfully Added In Cart',
				showConfirmButton: false,
				timer: 1500
			});
			
		}
	}else{
		delete cartItems[id];
	}


	localStorage.setItem("productInCartOrg", JSON.stringify(cartItems));
	var empty = isEmptyObject(cartItems);
	if (empty) {
		delete localStorage.productInCartOrg;
		$(document).ready(function () {
			setTimeout(function () {
				window.location.reload();
			}, 500);
		});
		delete localStorage.cartNumbers;
		delete localStorage.productInCart;
	}



	displayCart();
}

function totalCostMax(price) {
	console.log(price)
	var reg = /[₹ ,]/gm;
	var disprice = price.disprice;
	if (disprice.match(reg)) {
		var disprice = disprice.replace(/₹/i,"");
		var disprice = disprice.replace(/,/i,"");
		disprice = parseInt(disprice);
	}
	let cartCost = localStorage.getItem("totalCost");
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		console.log(typeof(price.inCart));
		if(price.inCart){
			console.log(disprice)
			console.log("disprice",disprice)
			localStorage.setItem("totalCost", cartCost + disprice)
		}
		
	}
}




function decreaseCart(id){
	let productDec= localStorage.getItem('productInCartOrg');
	productDec=JSON.parse(productDec);
	var productInCartDec= productDec[id];
	console.log("with id incart",productInCartDec.inCart);
	decNumbers(productInCartDec,id);
	totalCostMin(productInCartDec);
	// $(document).ready(function () {
	// 	setTimeout(function () {
	// 		window.location.reload();
	// 	}, 500);
	// });
	displayCost();


}
function decNumbers(product,id) {
	console.log(product)
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	let cartItems = localStorage.getItem('productInCartOrg');
	cartItems = JSON.parse(cartItems);
	
	var inCartvalue = product.inCart;
	console.log(inCartvalue);
	console.log(product.tag);
	if (productNumbers) {
		localStorage.setItem("cartNumbers", productNumbers - 1);
		document.querySelector("#hidecart span").textContent = productNumbers - 1;
	}
	else {
		localStorage.setItem("cartNumbers", 0);
		document.querySelector("#hidecart span").textContent = 0;
	}
	if (cartItems != null) {
		console.log(cartItems[id])
		console.log(cartItems[id].inCart)
		console.log(cartItems[id].inCart > 0)
		if(cartItems[id].inCart > 0){
			cartItems[id].inCart -=1;
			console.log(cartItems[id]);

			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Quantity Decreased !',
				text: 'Your Product Quantity Successfully Removed From Cart',
				showConfirmButton: false,
				timer: 1500
			});
			if(cartItems[id].inCart ==0){
				delete cartItems[id];
			}
			
		}
	}else{
		delete cartItems[id];
	}


	localStorage.setItem("productInCartOrg", JSON.stringify(cartItems));
	var empty = isEmptyObject(cartItems);
	if (empty) {
		delete localStorage.productInCartOrg;
		$(document).ready(function () {
			setTimeout(function () {
				window.location.reload();
			}, 500);
		});
		delete localStorage.cartNumbers;
		delete localStorage.productInCart;
	}



	displayCart();
}
function totalCostMin(price) {
	console.log(price)
	var reg = /[₹ ,]/gm;
	var disprice = price.disprice;
	if (disprice.match(reg)) {
		var disprice = disprice.replace(/₹/i,"");
		var disprice = disprice.replace(/,/i,"");
		disprice = parseInt(disprice);
	}
	let cartCost = localStorage.getItem("totalCost");
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		console.log(typeof(price.inCart));
		if(price.inCart){
			console.log(disprice)
			console.log("disprice",disprice)
			localStorage.setItem("totalCost", cartCost - disprice)
		}
		
	}
}




function displayCart() {
	let cartItem = localStorage.getItem("productInCartOrg");
	if (cartItem) {
		cartItem = JSON.parse(cartItem);
		let productContainer = document.querySelector(".cart");
		if (cartItem && productContainer) {
			productContainer.innerHTML = '';
			Object.values(cartItem).map(item => {
				var reg = /[₹ ,]/gm;
				var disprice = item.disprice;
				console.log(disprice)
				if (disprice.match(reg)) {
					var disprice = disprice.replace(/₹/i, "");
					var disprice = disprice.replace(/,/i, "");
					disprice = parseInt(disprice);
				}
				var totalprice = disprice * item.inCart;


				totalprice = totalprice.toString();
				var lastThree = totalprice.substring(totalprice.length - 3);
				var otherNumbers = totalprice.substring(0, totalprice.length - 3);
				if (otherNumbers != '')
					lastThree = ',' + lastThree;
				var res = "₹" + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
				let totalOrgCost = localStorage.getItem("totalOrgPrice");
				productContainer.innerHTML += `
				<tbody class="main-cart align-middle">
				<tr id="rem${item.tag}">
				<td class="product-title-image responsive magnifiedImg text-center"><img class="image rounded cart-image float-start text-center my-4" src="${item.image}"></td>
				<td class="product-detail p-5"><div>
						<h4 class="mt-2 responsive">${item.name}</h4>
						<span id="rating" class="block mt-3"><i class="fad fa-star"></i>4.4 (47,810 Ratings)</span>
						<p class="price">
							<span id="pricea" class="pricea">${item.disprice}</span><span id="priceb" class="priceb">${item.orgprice}</span><span id="pricec" class="pricec mx-3">66% off</span>
						</p>
						<p  id="removebutton">
							<button value="${item.tag}" onclick="remove(this.value)" type="button" class="mx-2 btn btn-outline-danger removebutton removeItem"><i style="font-size:40px;" class="fad fa-times-circle removeicon"></i>Remove Product</button>
						</p>
			
					</div>
				</td>
				<td class="text-center align-middle  size"><span class="set-quantity"><button value="${item.tag}" onclick="decreaseCart(this.value)" class="btn btn-outline-success"><i class="fad fa-minus-circle"></i></button> <span>${item.inCart}</span> <button value="${item.tag}" onclick="increaseCart(this.value)" class="btn btn-outline-success inc" ><i class="fad fa-plus-circle"></i></button></span></td>
				<td class="text-center align-middle size"><span>${res}</span><td>
				</tr>
			</tbody>
				` ;
			// productContainer.innerHTML=`
			// <div>Hello</div>
			// `
			});
		}
	} else {
		let emptycontainer = document.querySelector(".tablecart");
		if (emptycontainer) {
			emptycontainer.innerHTML = `
		<table class="table table-sm">
					<tbody class="cart my-5">
						<tbody class="main-cart com align-middle">
							<tr>
							<td class="container">
								<p id="heading">Cart Is Empty...</p>
									<h5 id="heading-text">Be with us and Conntinue your Shopping</h5><br><br>
									<a id="heading-button" href="../index.html"><button class="btn btn-outline-success">Continue Shopping</button></a><br><br><br>
									</td>
							<td><img id="emptycart" class="mx-5" src="../../cart/img/emptycart.gif"></td>
							</td>
							
							</tr>
						</tbody>
					</tbody>
				</table>
		`
		}
	}
}

function displayCost(){
	let bill = localStorage.getItem("totalCost");
	if (bill) {
		bill = parseInt(bill);
		let productContainer = document.querySelector(".totalCostDisplay");
		console.log(productContainer)
		if (bill && productContainer) {
			var totalprice=bill;
			totalprice = totalprice.toString();
			var lastThree = totalprice.substring(totalprice.length - 3);
			var otherNumbers = totalprice.substring(0, totalprice.length - 3);
			if (otherNumbers != '')
				lastThree = ',' + lastThree;
			var res = "₹" + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
			productContainer.innerHTML = `
			<div class="row">
				<div class="col col-6 ml-2">
					<h2>Total Price</h2>
					<span>(Including VAT)</span>
				</div>
				<div class="col col-6 float-right"><h3 class="mt-3">${res}</h3></div>
			</div>
			<div class="row">
				<div class="col col-12">
				<span class="float-right checkout">
				<a href="../checkout/checkout.html"><button class="btn btn-success " ></i>Checkout</button></a>
				</span>
				</div>
			</div>
			`;
		}
	}
}
displayCost();
onloadCartNumber();
displayCart();





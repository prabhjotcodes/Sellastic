let wishies = document.querySelectorAll('.heart');
var names = document.getElementById('product-name');
var add = document.querySelectorAll('.add-item');






if (names) {
	var tag = document.getElementById("product-name").textContent.slice(0, 4);
	var wishproducts = [
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






for (let i = 0; i < wishies.length; i++) {
	wishies[i].addEventListener('click', (e) => {
		$('.content').click(function () { $('.content').toggleClass("heart-active"); $('.heart').addClass("heart-active") });
		var ise = "$('.content').click(function(){$('.content').toggleClass('heart-active');$('.heart').addClass('heart-active')});"
		localStorage.setItem("wishAdded", ise);
		wishNumbers(wishproducts[0]);
		onloadWishNumber();
	});
};










function removewish(data) {

	var id = data;
	console.log(id)
	let wishitems = localStorage.getItem('productInWish');
	wishitems = JSON.parse(wishitems);
	decWishNumbers(wishitems[id]);
	
	deleteProduct(id);
	var a=delete wishitems[id];
	console.log(a)
	console.log(wishitems,"deleteProduct(id) toh baad");
	localStorage.setItem('productInWish',JSON.stringify(wishitems))
	var my = isEmptyObject(wishitems);
	if (my) {
		delete localStorage.productInWish;
		$(document).ready(function () {
			setTimeout(function () {
				window.location.reload();
			}, 500);
		});
		delete localStorage.wishNumbers;
		delete localStorage.wishAdded;
		delete localStorage.newWishes;
		delete localStorage.productInWish;
	}

}




function isEmptyObject(obj) {
	return JSON.stringify(obj) === '{}';
}




function deleteProduct(rem) {
	var remo = "rem" + rem;
	var remo1 = "re" + rem;
	var x = document.getElementById(remo);
	var x1 = document.getElementById(remo1);
	x.parentNode.removeChild(x);
	x1.parentNode.removeChild(x1);
}





function decWishNumbers(product) {
	let productNumbers = localStorage.getItem('wishNumbers');
	productNumbers = parseInt(productNumbers);
	let wishitems = localStorage.getItem('newWishes');
	wishitems = JSON.parse(wishitems);
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'Remove From Cart!',
		text: 'Your Product Successfully Removed From Cart',
		showConfirmButton: false,
		timer: 1500
	})
	var inWishvalue = product.inWish;
	if (productNumbers) {
		for (var i = productNumbers; i >= 0; i--) {

			localStorage.setItem("wishNumbers", productNumbers - inWishvalue);
			document.querySelector(".wishCount").textContent = productNumbers - inWishvalue;
		}
	}
	else {
		localStorage.setItem("wishNumbers", 0);
		document.querySelector(".wishCount").textContent = 0;
	}
}







function checkKeyValue(object, value) {
	var keys = Object.keys(object)
	for (let i = 0; i < keys.length; i++) {
		const element = keys[i];
		if (element == value) {
			return true;
		}
	}
}




function getKeyValue(object) {
	var keys = Object.keys(object)
	for (let i = 0; i < keys.length; i++) {
		const element = keys[i];
		return element;
	}
}






function onloadWishNumber() {
	let productPresent = localStorage.getItem('newWishes');
	productPresent = JSON.parse(productPresent);
	if (productPresent) {
		console.log("Something In wishList")
		var chek = checkKeyValue(productPresent, tag);
		if (chek) {
			$(document).ready(function () {
				$('.content').toggleClass("heart-active")
				$('.heart').addClass("heart-active")
			});
		} else (
			$(document).ready(function () {
				$('.content').toggleClass("heart-active")
				$('.heart').removeClass("heart-active")
			})
		)
		let productWishNumbers = localStorage.getItem('wishNumbers');

		if (productWishNumbers) {
			document.querySelector(".wishCount").textContent = productWishNumbers;
		}
	} else {
		console.log("wishList Is Empty")
	}
};







function wishNumbers(product) {
	let wishNumbers = localStorage.getItem('wishNumbers');
	wishNumbers = parseInt(wishNumbers);
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Added In WishList!',
		text: 'Your Product Successfully Added To WishList',
		showConfirmButton: false,
		timer: 1500
	});
	if (wishNumbers) {
		var tagofpage = product.tag;
		var tagofconsole = localStorage.getItem('productInWish');
		tagofconsole = JSON.parse(tagofconsole);
		var check = Object.keys(tagofconsole);
		for (let i = 0; i < check.length; i++) {
			var checked = check[i];
			if (checked == tagofpage) {
				Swal.fire({
					position: 'center',
					icon: 'info',
					title: 'Already Added In WishList!',
					text: 'Your Product Is Already Added To WishList',
					showConfirmButton: false,
					timer: 1500
				});
			}
		}
		if (checked != tagofpage) {
			localStorage.setItem("wishNumbers", wishNumbers + 1);
			document.querySelector(".wishCount").textContent = wishNumbers + 1;
		}
	} else {
		localStorage.setItem("wishNumbers", 1);
		document.querySelector(".wishCount").textContent = 1;
	}

	setWishItems(product);
};






function setWishItems(product) {
	let wishItems = localStorage.getItem('productInWish');
	wishItems = JSON.parse(wishItems);
	if (wishItems != null) {
		if (wishItems[product.tag] == undefined) {
			wishItems = {
				...wishItems,
				[product.tag]: product
			}
		}
	} else {
		product.inWish = 1;
		wishItems = {
			[product.tag]: product
		}
	}

	localStorage.setItem("productInWish", JSON.stringify(wishItems));
	console.log(wishItems,"setWishItems")
	let wishes = localStorage.getItem('productInWish');
	wishes = JSON.parse(wishes);
	let newWishes = wishes;
	localStorage.setItem("newWishes", JSON.stringify(newWishes));
}








function displayWishes() {
	let wishItem = localStorage.getItem("productInWish");
	if (wishItem) {
		wishItem = JSON.parse(wishItem);
		let productWishContainer = document.querySelector(".wish");
		if (wishItem && productWishContainer) {
			productWishContainer.innerHTML = '';
			Object.values(wishItem).map(item => {
				productWishContainer.innerHTML += `
				<tbody  class="main-cart align-middle">
						<tr id="rem${item.tag}" class=""  >
						<td class="product-title-image magnifiedImg text-center"><img class="image rounded cart-image float-start text-center my-4" src="${item.image}"></td>
						<td class="product-detail p-5">
							<div>
								<h2 class="mt-2 responsive">${item.name}</h2>
								<h6 id="rating" class="block mt-3"><i class="fad fa-star"></i>${item.rating}</h6>
								<p class="price">
									<span id="pricea" class="pricea">${item.disprice}</span><span id="priceb" class="priceb">${item.orgprice}</span><span id="pricec" class="pricec mx-3">66% off</span>
								</p>
								
					
							</div>
						</td>
						
						</tr>
						<tr id="re${item.tag}">
							<td colspan="2" class="text-center" >
									<span class="bigBtn"><button value="${item.tag}"  style="font-size: 30px;width: 350px;" class="btn btn-outline-success mx-3 add-item add-cart"><i style="font-size:40px;" class="fad fa-cart-plus removeicon"></i>Add To Cart</button></span>
									<span class="bigBtn"><button  value="${item.tag}" onclick=removewish(this.value) style="font-size: 30px;width: 350px;" class="btn btn-outline-danger mx-3"><i style="font-size:40px;" class="fad fa-times-circle removeicon"></i>Remove Product</button></span>
								</div>
							</td>
						</tr>
					</tbody>
				` ;

				let wishProducts = localStorage.getItem('productInWish');
				wishProducts = JSON.parse(wishProducts);
				let cart = document.querySelectorAll('.add-cart');
				for (var i = 0; i < cart.length; i++) {
					cart[i].addEventListener('click', (e) => {
						var which = getKeyValue(wishProducts);
						console.log(wishProducts[which]);
						wishNumberAdd(wishProducts[which]);
						localStorage.setItem('productInCart',JSON.stringify(wishProducts));
						
						let wishitems = localStorage.getItem('productInWish');
						wishitems = JSON.parse(wishitems);
						
						decNumbersOfWish(wishitems[which]);
						
						deleteProductAfteradd(which);
						setInCart(wishProducts[which]);
						totalCost(wishitems[which]);
						var toDltId=getKeyValue(wishitems);
						console.log(toDltId,"rodlt")
						let dltwish= localStorage.getItem("productInCart");
						dltwish = JSON.parse(dltwish);
						console.log(dltwish[toDltId],"   dlt wish")
						delete dltwish[toDltId];
						console.log(dltwish,"ho gyi????????")
						localStorage.setItem('productInWish',JSON.stringify(dltwish))	
						var my = isEmptyObject(dltwish);
						console.log(!my);
						if (my) {
							delete localStorage.productInWish;
							$(document).ready(function () {
								setTimeout(function () {
									window.location.reload();
								}, 500);
							});
							delete localStorage.wishNumbers;
							delete localStorage.wishAdded;
							delete localStorage.newWishes;
						}
						$(document).ready(function () {
							setTimeout(function () {
								window.location.reload();
							}, 500);
						});
					});
				}
				function deleteProductAfteradd(del) {
					console.log("deleteProductAfteeradd",del)
					var dele = "rem" + del;
					var dele1 = "re" + del;
					var y = document.getElementById(dele);
					var y1 = document.getElementById(dele1);
					console.log(y);
					y.parentNode.removeChild(y);
					y1.parentNode.removeChild(y1);
				}
				function decNumbersOfWish(product) {
					let productNumbers = localStorage.getItem('wishNumbers');
					productNumbers = parseInt(productNumbers);
					let wishitems = localStorage.getItem('productInWish');
					wishitems = JSON.parse(wishitems);
					var inWishvalue = product.inWish;
					if (productNumbers) {
						for (var i = productNumbers; i >= 0; i--) {
				
							localStorage.setItem("wishNumbers", productNumbers - inWishvalue);
							document.querySelector(".wishCount").textContent = productNumbers - inWishvalue;
						}
					}
					else {
						localStorage.setItem("wishNumbers", 0);
						document.querySelector(".wishCount").textContent = 0;
					}
					
				}
				function wishNumberAdd(product) {
					let productNumbers = localStorage.getItem('cartNumbers');
					productNumbers = parseInt(productNumbers);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Add To Cart!',
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
					
					
				}
				function setInCart(product){
					let cartItems = localStorage.getItem('productInCartOrg');
					cartItems = JSON.parse(cartItems);
					console.log(cartItems)
					if (cartItems != null) {
						if (cartItems[product.tag] == undefined) {
							cartItems = {
								...cartItems,
								[product.tag]: product
							}
						}
						console.log("in if of cartitem=null",cartItems)
						cartItems[product.tag].inCart += 1;
						console.log("duji waar in if",cartItems)
					} else {
						product.inCart = 1;
						console.log("in else of cartitem=null",cartItems)
						cartItems = {
							[product.tag]: product
						}
						console.log("duji waar in else",cartItems)
					}
					localStorage.setItem("productInCartOrg", JSON.stringify(cartItems));
					displayCart();
				}
			});
		}
	} else {
		let emptycontain = document.querySelector(".wishtable");
		if (emptycontain) {
			emptycontain.innerHTML = `
		<table class="table table-sm">
				<tbody class=" my-5">
					<tbody class="main-cart com align-center">
						<tr>
						<td class="container">
							<p id="heading" class="mt-5">WishList Is Empty...</p>
								<h5 id="heading-text" class="mt-2"> Be with us and Continue your Shopping</h5><br><br>
								<a id="heading-button" href="../index.html"><button class="btn btn-outline-success">Continue Shopping</button></a><br><br><br>
								</td>
						<td><img id="emptycart" class="mx-1 my-0" src="../../cart/img/emptycart.gif"></td>
						</td>
						
						</tr>
					</tbody>
				</tbody>
			</table>
		`;
		}
	}
}

onloadWishNumber();
displayWishes();



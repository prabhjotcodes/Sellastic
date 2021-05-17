
function pay(){

	document.getElementById('details').style.display="none";
	document.getElementById('btn-details').style.display="none";
	document.getElementById('payment').style.display="block";
}
console.log("hii")
function displaycost(){
	let bill = localStorage.getItem("totalCost");
	if (bill) {
		bill = parseInt(bill);
		let productContainer = document.querySelector(".displaycost");
		console.log(productContainer)
		if (bill && productContainer) {
			var totalprice=bill+35;
			console.log(totalprice)
			totalprice = totalprice.toString();
			var lastThree = totalprice.substring(totalprice.length - 3);
			var otherNumbers = totalprice.substring(0, totalprice.length - 3);
			if (otherNumbers != '')
				lastThree = ',' + lastThree;
			var res = "₹" + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
			productContainer.innerHTML = `
			<tr style="border-bottom: 1px solid #ccc">
            	<th>Total</th>
                <td style="color: rgb(15, 207, 143);font-weight: 680" class="recap-item">${res}</td>
            </tr>
			`;
		}
	}
}
function displayCart() {
	let cartItem = localStorage.getItem("productInCartOrg");
	if (cartItem) {
		cartItem = JSON.parse(cartItem);
		let productContainer = document.querySelector(".displayProduct");
		console.log(productContainer)
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
				<tbody class="">
				<tr>
                    <td>${item.name}</td>
                    <td class="recap-item">${res}</td>
                </tr>
			</tbody>
				` ;
			// productContainer.innerHTML=`
			// <div>Hello</div>
			// `
			});
		}
	}
}

displayCart();

displaycost();
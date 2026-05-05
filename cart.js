// ADD TO CART (for home.html)

const buttons = document.querySelectorAll(".btn-cart");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");
        const img = button.getAttribute("data-img");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({ name, price, img });

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(name + " added to cart!");
    });
});


// DISPLAY CART ITEMS (for cart.html)

const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

if (cartItemsContainer) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function displayCart() {

        cartItemsContainer.innerHTML = "";

        cart.forEach((item, index) => {

            const itemHTML = `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                </div>
                <input type="number" value="1" min="1" class="qty" data-price="${item.price}">
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
            `;

            cartItemsContainer.innerHTML += itemHTML;

        });

        updateTotal(); // 🔥 FIX: calculate total when cart loads
    }

    window.removeItem = function(index) {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }

    displayCart();
}


// CALCULATE TOTAL

function updateTotal() {

    let total = 0;

    const qtyInputs = document.querySelectorAll(".qty");

    qtyInputs.forEach(input => {

        const price = parseInt(input.dataset.price);
        const quantity = parseInt(input.value);

        total += price * quantity;

    });

    if (totalPriceElement) {
        totalPriceElement.innerText = "Total: ₹" + total;
    }
}


// UPDATE TOTAL WHEN QUANTITY CHANGES

document.addEventListener("change", function(e){

    if(e.target.classList.contains("qty")){
        updateTotal();
    }

});
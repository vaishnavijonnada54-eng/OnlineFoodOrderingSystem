// get elements
const totalElement = document.getElementById("total-amount");
const totalInput = document.getElementById("total-input");

// get cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

// calculate total
cart.forEach(item => {
    total += parseInt(item.price);
});

// show total
if (totalElement) {
    totalElement.innerText = "Total Amount: ₹" + total;
}

// send total to backend
if (totalInput) {
    totalInput.value = total;
}

// handle form submission
const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function () {

        // just clear cart AFTER order is sent
        setTimeout(() => {
            localStorage.removeItem("cart");
        }, 500);

    });

}
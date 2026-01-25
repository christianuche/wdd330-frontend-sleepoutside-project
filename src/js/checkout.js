import { loadHeaderFooter, updateCartCount } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
updateCartCount();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.forms["checkout"];
    if (form.checkValidity()) {
        myCheckout.checkout();
    } else {
        alert("Please fill out all required fields correctly.");
    }
});
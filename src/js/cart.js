import { getLocalStorage, setLocalStorage, loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();
updateCartCount();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    updateCartTotal();
    toggleCheckoutButton(cartItems.length > 0);
}

function cartItemTemplate(item) {
    const imageSrc = item.Image || item.Images?.PrimaryMedium || "";
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" data-id="${item.Id}">Remove</button>
</li>`;

    return newItem;
}

renderCartContents();

function removeFromCart(productId) {
    let cartContents = getLocalStorage("so-cart") || [];
    cartContents = cartContents.filter(item => item.Id !== productId);
    setLocalStorage("so-cart", cartContents);
    updateCartCount();
    renderCartContents();
    updateCartTotal();
    toggleCheckoutButton(cartContents.length > 0);
}

function updateCartTotal() {
    const cartItems = getLocalStorage("so-cart") || [];
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    const totalElement = document.querySelector(".list-total");
    if (totalElement) {
        totalElement.innerText = `$${total.toFixed(2)}`;
    }
}

function toggleCheckoutButton(hasItems) {
    const footer = document.querySelector(".list-footer");
    if (footer) {
        if (hasItems) {
            footer.classList.remove("hide");
        } else {
            footer.classList.add("hide");
        }
    }
}

// Add event listeners for remove buttons
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        e.preventDefault();
        const productId = e.target.dataset.id;
        removeFromCart(productId);
    }
});
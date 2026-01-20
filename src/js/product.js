import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get product id from URL
const productId = getParam("product");

// Create data source for tents
const dataSource = new ProductData("tents");

// Create the product details controller
const product = new ProductDetails(productId, dataSource);

// Initialize everything
product.init();

// import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";

// const dataSource = new ProductData("tents");
// const productId = getParam("product");

// console.log(productId);
// console.log(dataSource.findProductById(productId));

// // function to add product to cart in local storage

// function addProductToCart(product) {
//   let cartItems = getLocalStorage("so-cart");

//   // Ensure cartItems is always an array
//   if (!Array.isArray(cartItems)) {
//     cartItems = [];
//   }

//   cartItems.push(product);
//   setLocalStorage("so-cart", cartItems);
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

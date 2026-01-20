import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get product data
    this.product = await this.dataSource.findProductById(this.productId);

    // Display product details
    this.renderProductDetails();

    // Add Add-to-cart listener
    document
      .getElementById("addToCart")
      .addEventListener("click", () => this.addProductToCart());
  }

  addProductToCart() {
    const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    // Brand <h3>
    document.querySelector(".product-detail h3").textContent =
      this.product.NameWithoutBrand;

    // Name <h2>
    document.querySelector(".product-detail h2").textContent =
      this.product.Name;

    // Image
    document
      .querySelector(".product-detail img")
      .setAttribute("src", this.product.Image);

    // Price
    document.querySelector(".product-card__price").textContent =
      `$${this.product.FinalPrice}`;

    // Color
    document.querySelector(".product__color").textContent = this.product.ColorName;

    // Description
    document.querySelector(".product__description").innerHTML =
      this.product.DescriptionHtmlSimple;

    // Update Add to Cart button ID
    document
      .getElementById("addToCart")
      .setAttribute("data-id", this.product.Id);
  }
}

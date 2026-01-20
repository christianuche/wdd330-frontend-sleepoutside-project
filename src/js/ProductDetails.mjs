import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
//     // Brand <h3>
//     document.querySelector(".product-detail h3").textContent =
//       this.product.NameWithoutBrand;

//     // Name <h2>
//     document.querySelector(".product-detail h2").textContent =
//       this.product.Name;

//     // Image
//     document
//       .querySelector(".product-detail img")
//       .setAttribute("src", this.product.Image);

//     // Price
//     document.querySelector(".product-card__price").textContent =
//       `$${this.product.FinalPrice}`;

//     // Color
//     document.querySelector(".product__color").textContent = this.product.ColorName;

//     // Description
//     document.querySelector(".product__description").innerHTML =
//       this.product.DescriptionHtmlSimple;

//     // Update Add to Cart button ID
//     document
//       .getElementById("addToCart")
//       .setAttribute("data-id", this.product.Id);
//   }
// }

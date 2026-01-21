import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // This will make class reusable for different categories e.g tents, backpacks, sleeping bags, etc.
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Load the product list from the JSON file
    const list = await this.dataSource.getData();
    // next, render the list – ** future **
    this.renderList(list);
  }

  renderList(productList) {
    renderListWithTemplate(
        productCardTemplate,
        this.listElement,
        productList,
    );
  }
}
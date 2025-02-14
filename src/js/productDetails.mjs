import { findProductById } from './productData.mjs';
import {getLocalStorage, setLocalStorage} from './utils.mjs';

export default async function productDetails(productId, selector) {
  const product = await findProductById(productId);
  const html = productDetailsTemplate(product)
  document.querySelector(selector).innerHTML = html;
  // The Add Cart Button needs an event listener
  document.getElementById('addToCart').addEventListener('click',() => addProductToCart(product));
}

function productDetailsTemplate(product) {
  return `<h3 id="productName">${product.Name}</h3>
  <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>
  <img id="productImage" class="divider" src="${product.Images.PrimaryLarge}" alt="" />
  <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
  <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
  <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.id}">Add to Cart</button>
  </div>`;
}

function addProductToCart(product) {
  const products = getLocalStorage('so-cart');
  if (products) setLocalStorage('so-cart', [...products, product]);
  else setLocalStorage('so-cart', [product]);
  triggerAnimation();
}

function triggerAnimation() {
  document.querySelector('.cart').classList.toggle('activated');
  setTimeout(() => {
    document.querySelector('.cart').classList.toggle('activated');
  },500)
}

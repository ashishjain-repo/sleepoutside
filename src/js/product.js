import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
const productId = getParam("product");
console.log(findProductById(productId));

// function addProductToCart(product) {
//   const products = getLocalStorage("so-cart");
//   if (products) setLocalStorage("so-cart", [...products, product]);
//   else setLocalStorage("so-cart", [product]);
// }
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

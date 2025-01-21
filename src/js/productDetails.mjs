export default function productDetails(productId, selector) {}
function productDetailsTemplate(product) {
  const html = `<h3 id="productName">${product.Name}</h3>
  <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>
  <img id="productImage" class="divider" src="${product.Image}" alt="" />
  <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
  <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
  <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.id}">Add to Cart</button>
  </div>`;
}

function addProductToCart(product) {
  const products = getLocalStorage("so-cart");
  if (products) setLocalStorage("so-cart", [...products, product]);
  else setLocalStorage("so-cart", [product]);
}

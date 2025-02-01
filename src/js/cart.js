// import { getLocalStorage } from './utils.mjs';

// function renderCartContents() {
//   const cartItems = getLocalStorage('so-cart');
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector('.product-list').innerHTML = htmlItems.join('');
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class='cart-card divider'>
//   <a href='#' class='cart-card__image'>
//     <img
//       src='${item.Image}'
//       alt='${item.Name}'
//     />
//   </a>
//   <a href='#'>
//     <h2 class='card__name'>${item.Name}</h2>
//   </a>
//   <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
//   <p class='cart-card__quantity'>qty: 1</p>
//   <p class='cart-card__price'>$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }
// function cartTotal(){
//   let total = 0;
//   const cart =  document.getElementsByClassName('cart-total')[0];
//   try{
//     const cartItems = getLocalStorage('so-cart');
//     // cartItems.reduce((item) => total += item.FinalPrice);
//     total = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
//     cart.append(`${total}`);
//     document.getElementsByClassName('cart-footer')[0].classList.remove('hide');
//   }
//   catch(error){}
// }
// cartTotal();

// renderCartContents();

import { getLocalStorage } from "./utils.mjs";

// Function to render cart contents
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Ensure we handle empty cart gracefully
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  updateCartBadge(); // Update the badge whenever the cart is rendered
}

// Template for a single cart item
function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

// Function to calculate and display the cart total
function cartTotal() {
  let total = 0;
  const cart = document.getElementsByClassName("cart-total")[0];
  try {
    const cartItems = getLocalStorage("so-cart") || [];
    total = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
    cart.textContent = `$${total.toFixed(2)}`; // Display total in proper format
    document.getElementsByClassName("cart-footer")[0].classList.remove("hide");
  } catch (error) {
    console.error("Error calculating cart total:", error);
  }
}

// Function to update the cart badge with the number of items
function updateCartBadge() {
  const cartItems = getLocalStorage("so-cart") || []; // Get cart items or fallback to empty array
  const totalItems = cartItems.length; // Calculate total items in the cart
  const badge = document.querySelector(".cart .badge"); // Select the badge element

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems; // Update badge with the number of items
      badge.style.display = "flex"; // Show the badge
    } else {
      badge.style.display = "none"; // Hide badge if the cart is empty
    }
  }
}

function addItemDiscount(){
  const itemPrice = document.querySelectorAll(".cart-card");
  try{
    let index = 0;
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.forEach(element => {
      let discount = (((element['SuggestedRetailPrice'] - element['FinalPrice']) / element['SuggestedRetailPrice'])*100).toFixed(2)
      itemPrice[index].innerHTML+=`<b>${discount}% Off</b>`
      index++
    });
  }
    catch(error){
      console.log("Cannot do it");;
    }
  }

// Run the updateCartBadge function after the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});

// Initial calls to render cart contents and total
cartTotal();
renderCartContents();
addItemDiscount();
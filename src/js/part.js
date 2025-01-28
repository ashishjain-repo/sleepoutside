import { getLocalStorage } from "./utils.mjs";

// Function to update the cart badge with the number of items
function updateCartBadge() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalItems = cartItems.length;
  const badge = document.querySelector(".cart .badge");
  console.log(badge);

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }
}

// Run the updateCartBadge function after the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});

updateCartBadge();

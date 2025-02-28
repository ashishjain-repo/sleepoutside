import { mount, unmount } from 'svelte';
import MainHeader from './components/MainHeader.svelte';
import MainFooter from './components/MainFooter.svelte';
import AlertMessage from './components/AlertMessage.svelte';
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function getProductDiscount(product) {
  return (
    ((product['SuggestedRetailPrice'] - product['FinalPrice']) /
      product['SuggestedRetailPrice']) *
    100
  ).toFixed(0);
}
export function renderHeaderFooter() {
  mount(MainFooter, {
    target: document.querySelector('#footer'),
  });
  mount(MainHeader, {
    target: document.querySelector('#header'),
  });
}

// Function to update the cart badge with the number of items
export function getCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const totalItems = cartItems.length;
  return totalItems;
}

export function alertMessage(messages, error = true, scroll = true, duration = 5000) {
  const alert = mount(AlertMessage, {
    target: document.querySelector('body'),
    anchor: document.querySelector('main'),
    props: { messages, error },
  });

  if (scroll) window.scrollTo(0, 0);
  
  setTimeout(() => {
    unmount(alert);
  }, duration)

}

import { getParam } from './utils.mjs';
import { renderHeaderFooter } from './utils.mjs';
import ProductList from './components/productList.svelte';
import { mount } from 'svelte';
const productList = mount(ProductList, {
  target: document.querySelector('.products'),
  props: { category: getParam('category') },
});

renderHeaderFooter();

import ProductList from './components/productList.svelte';
import {mount } from 'svelte';
import { renderHeaderFooter } from './utils.mjs';

const productList = mount(ProductList, {
    target: document.querySelector('.products'),
    props: {category: 'Tents'}
})

renderHeaderFooter();
import ProductList from './components/productList.svelte';
import {mount } from 'svelte';

const productList = mount(ProductList, {
    target: document.querySelector('.products'),
    props: {category: 'Tents'}
})
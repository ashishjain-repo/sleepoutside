import { getParam } from './utils.mjs';
import { renderHeaderFooter } from './utils.mjs';
import ProductDetails from './components/productDetails.svelte';
import { mount } from 'svelte';

const productId = getParam('product');
const productDetails = mount(ProductDetails, {
        target: document.querySelector('.product'),
        props: {productId}
})
renderHeaderFooter();
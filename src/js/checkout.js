import CheckoutForm from './components/CheckoutForm.svelte';
import { mount } from 'svelte';
import { renderHeaderFooter } from './utils.mjs';

const checkout = mount(CheckoutForm, {
    target: document.querySelector('.checkoutForm'),
    props: {}
});

renderHeaderFooter();
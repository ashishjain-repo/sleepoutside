<script>
  import { mount, onMount } from 'svelte';
import {getLocalStorage} from '../utils.mjs';
  let tax = $state(0);
  let total = $state(0);
  let shipping = $state(10);
  let quantity = $state(0);
  let subtotal = $state(0);
  let list = $state([]);

function init(){
    list = getLocalStorage('so-cart');
    subtotal = list.reduce((a, b) => a + b.FinalPrice, 0).toFixed(2);
    quantity = list.length;
    shipping += (quantity - 1) * 2;
    tax = (subtotal * 0.06).toFixed(2);
    total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
};

onMount(init)
</script>

<form action="" id="checkoutForm">
  <fieldset>
    <legend>Shipping</legend>
    <label for="">First Name</label>
    <input type="text" name="fname" />
    <label for="">Last Name</label>
    <input type="text" name="lname" />
    <label for="">Street</label>
    <input type="text" name="street" />
    <label for="">City</label>
    <input type="text" name="city" />
    <label for="">State</label>
    <input type="text" name="state" />
    <label for="">Zip</label>
    <input type="text" name="zip" />
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <label for="">Card Number</label>
    <input type="text" name="cardNumber" />
    <label for="">Expiration</label>
    <input type="text" name="expiration" />
    <label for="">Security Code</label>
    <input type="text" name="code" />
  </fieldset>
  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <p>Item Subtotal({quantity}) ${subtotal}</p>
    <p>Shipping Estimate ${shipping}</p>
    <p>Tax ${tax}</p>
    <p>Order Total ${total}</p>
    <input type="hidden" name="orderTotal" bind:value={total} />
    <input type="hidden" name="shipping" bind:value={shipping} />
    <input type="hidden" name="tax" bind:value={tax} />
  </fieldset>
  <button>Checkout</button>
</form>

<script>
  import { onMount} from 'svelte';
  import {alertMessage, getLocalStorage, setLocalStorage} from '../utils.mjs';
  import {checkout} from '../externalServices.mjs';
  let tax = $state(0);
  let total = $state(0);
  let shipping = $state(10);
  let quantity = $state(0);
  let subtotal = $state(0);
  let list = $state([]);

function init(){
    list = getLocalStorage('so-cart');
    subtotal = list.reduce((a, b) => a + (b.FinalPrice * b.quantity), 0).toFixed(2);
    quantity = list.reduce((count, item) => count + item.quantity, 0);
    shipping += (quantity - 1) * 2;
    tax = (subtotal * 0.06).toFixed(2);
    total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
};

function packageItems(){
  return getLocalStorage('so-cart').map(item => {
    return {
          id: item.Id,
          name: item.Name,
          price: item.FinalPrice,
          quantity: item.quantity
      }
    });
}
async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {}
    formData.forEach((value,key) => data[key] = value);
    data.items = packageItems();
    data.orderDate = new Date();
    try {
      const res = await checkout(data)
      setLocalStorage('so-cart',[])
      window.location.href = '/';
    }
    catch (error) {
      alertMessage(error.message);
    }
    
}

onMount(init)
</script>

<form action="" id="checkoutForm" onsubmit="{handleSubmit}">
  <fieldset>
    <legend>Shipping</legend>
    <label for="">First Name</label>
    <input type="text" name="fname" required/>
    <label for="">Last Name</label>
    <input type="text" name="lname" required/>
    <label for="">Street</label>
    <input type="text" name="street" required/>
    <label for="">City</label>
    <input type="text" name="city" required/>
    <label for="">State</label>
    <input type="text" name="state" required/>
    <label for="">Zip</label>
    <input type="text" name="zip" required/>
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <label for="">Card Number</label>
    <input type="text" name="cardNumber" required placeholder="xxxx-xxxx-xxxx-xxxx" pattern={"[0-9\\s]{13,19}"}/>
    <label for="">Expiration</label>
    <input type="text" name="expiration" required placeholder="00/00" pattern={"[0-9]{2}\/[0-9]{2}"}/>
    <label for="">Security Code</label>
    <input type="text" name="code" required placeholder="000" pattern={"[0-9]{3,5}"}/>
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

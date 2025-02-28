<script>
    import { findProductById } from '../externalServices.mjs';
    import {getLocalStorage, setLocalStorage } from "../utils.mjs";
    import Breadcrumbs from './Breadcrumbs.svelte';
    let {productId} = $props();
    const productPromise = findProductById(productId);

    function addProductToCart(product) {
        const products = getLocalStorage('so-cart');
        if (products) setLocalStorage('so-cart', [...products, product]);
        else setLocalStorage('so-cart', [product]);
        triggerAnimation();
    }

    function triggerAnimation() {
        document.querySelector('.cart').classList.toggle('activated');
        setTimeout(() => {
            document.querySelector('.cart').classList.toggle('activated');
        },500)
    }
</script>

{#await productPromise}
<!-- Use placeholders while loading. -->
    <Breadcrumbs category='loading...'/>
    <section class='product-detail'>
        <h3 id="productName">Loading...</h3>
    </section>
{:then product} 
{#if product}
    
    <Breadcrumbs category={product.Category}/>
    <section class='product-detail'>

    <h3 id="productName">{product.Name}</h3>
    <h2 class="divider" id="productNameWithoutBrand">{product.NameWithoutBrand}</h2>
    <img id="productImage" class="divider" src="{product.Images.PrimaryLarge}" alt="" />
    <p class="product-card__price" id="productFinalPrice">{product.FinalPrice}</p>
    <p class="product__color" id="productColorName">{product.Colors[0].ColorName}</p>
    <p class="product__description" id="productDescriptionHtmlSimple">{@html product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
        <button id="addToCart" data-id="{product.id}" onclick="{() => addProductToCart(product)}">Add to Cart</button>
    </div>
    </section>
{:else}
    <h3 id="productName">The Product You Are Looking For Does Not Exist</h3>
{/if}
{/await}
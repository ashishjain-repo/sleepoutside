<script>
    import {getData} from '../productData.mjs';
  import ProductSummary from './productSummary.svelte';

    const productIds = ["880RR","985RF","985PR","344YJ"]
    let {category} = $props();
    let promise = getData(category.toLowerCase());
</script>

<h2>Top Products: {category}</h2>

{#await promise}
    <p>Loading...</p>
{:then products} 
    <ul class=product-list>
        {#each products as product}
            {console.log(product.Id)}
            {#if productIds.includes(product.Id)}
                <ProductSummary {product}/>
                
            {/if}
        {/each}
    </ul>
{/await}
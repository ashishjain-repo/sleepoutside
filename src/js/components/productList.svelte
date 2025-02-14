<script>
    import {getData} from '../productData.mjs';
  import ProductSummary from './productSummary.svelte';

    let {category} = $props();
    let promise = getData(category.toLowerCase());
</script>

<h2>Top Products: {category}</h2>

{#await promise}
    <p>Loading...</p>
{:then products} 
    <ul class=product-list>
        {#each products as product}
            <ProductSummary {product}/>
        {/each}
    </ul>
{/await}
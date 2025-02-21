<script>
    import {getProductsByCategory} from '../externalServices.mjs';
  import ProductSummary from './productSummary.svelte';

    let {category} = $props();
    let promise = getProductsByCategory(category.toLowerCase());
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
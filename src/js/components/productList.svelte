<script>
    import {getProductsByCategory} from '../externalServices.mjs';
    import ProductSummary from './productSummary.svelte';
    import Breadcrumbs from './Breadcrumbs.svelte';

    let {category} = $props();
    let promise = getProductsByCategory(category.toLowerCase());
</script>

{#await promise}
loading...
{:then products} 
    <Breadcrumbs {category} count={products.length}/>
    
{/await}
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
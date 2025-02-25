<script>
    let {category, count} = $props();
</script>

{#if count}
    <p>{category}->({count} items)</p>
{:else}
    <p>{category}</p>
{/if}

<style>
    p {
        text-align: left;
    }
</style>

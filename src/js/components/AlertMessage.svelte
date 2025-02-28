<script>
    let { messages, error } = $props();
    let hidden = $state("display: flex")
    let errorColor = $state("error");
    if (!error) {
        errorColor = "success";
    }
    function handleClick() {
        hidden = "display: none"
    }
</script>

{#each Object.values(messages) as message}
    <div class='flex {errorColor}' style="{hidden}" role="alert">
        <span>{message}</span>
        <span class="pointer" onclick={handleClick} role="button">X</span>

    </div>
{/each}

<style>
    .flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 5px;
        border:#c48045 solid 1px;
        margin: 5px;
    }
    .error {
        color: black;
        background-color: #F0A868;
    }
    .pointer {
        cursor: pointer;
    }
    .success {
        color: black;
        background-color: rgb(65, 191, 65);
    }
</style>
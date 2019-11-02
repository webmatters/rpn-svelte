<script>
  import Nanny from './_Nanny.svelte'
  import nannies from './_nannies.js'
</script>

<style>
  .nannies {
    display: grid;
    grid-template-columns: 400px 400px 400px;
    grid-template-rows: 300px 300px;
    grid-gap: 40px;
  }
</style>

<div>
  <h2>Nannies</h2>

  <div class="nannies">
  {#each nannies as nanny}
    <Nanny {...nanny} />
  {/each}
  </div>
</div>
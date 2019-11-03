<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`nannies/${params.id}.json`)
    const data = await res.json()
    if (res.status === 200) {
      return { nanny: data }
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import DatePicker from './_DatePicker.svelte'
  import { showModal, showLoginModal } from '../../store.js'

  export let nanny

  let dateChosen = false
  let startDate = null
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 60% 40%;
    grid-gap: 30px;
  }
  aside {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
  }
</style>

<svelte:head>
	<title>{nanny.headline}</title>
</svelte:head>

<header>
  <img src="{nanny.picture}" width="50%" alt="Nanny Photo" />
</header>

<div class="container">
    <main>
      <h1>{nanny.headline}</h1>
      <h2>{nanny.town}</h2>
      <p><strong>{nanny.firstName}</strong></p>
  
      {#if nanny.supernanny === true}
        <p><strong>{nanny.firstName} is a Super Nanny</strong></p>
        <p>Super Nannies are experienced, highly rated nannies who have received stellar ratings from a large number of customers.</p>
      {/if}
  
      <p>{@html nanny.description}</p>
    
      <hr>
  
      <h3>198 Reviews</h3>
  
      {#each nanny.reviews as review}
        <img src={review.avatar} alt="Nanny Avatar" />
        <p><strong>{review.user}</strong></p>
        <p>{review.date}</p>
        <p>{review.comment}</p>
      {/each}
    </main>

    <aside>
      <h2>Select date and time</h2>
      <DatePicker
        on:dateChanged={event => {
          startDate = event.detail.startDate
          dateChosen = true
        }}
      />
      
      {#if dateChosen}
        <br>
        <h2>Price</h2>
        <p>${nanny.price}</p>
        <button class="book styled"
          on:click={() => {
            showModal.set(true)
            showLoginModal.set(true)
          }}>
          Book
        </button>
      {/if}
    </aside>
  </div>

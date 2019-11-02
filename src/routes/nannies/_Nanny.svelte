<script>
  export let id
  export let picture
  export let firstName
  export let town
  export let headline
  export let rating
  export let reviewsCount
  export let supernanny
</script>

<div>
  <a href="/nannies/{id}">
    <img src="{picture}" width="100%" style="height:300px;width:300px;" alt="Nanny Photo" />
    <p>{firstName} - {town}</p>
    <p>{headline}</p>
    <p>{rating} ({reviewsCount}) {supernanny ? '- Super Nanny' : ''}</p>
  </a>
</div>
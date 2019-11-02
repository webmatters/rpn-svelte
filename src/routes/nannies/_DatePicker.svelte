<script>
  import { createEventDispatcher } from 'svelte'
  import Datepicker from '../../lib/svelte-calendar-1.0.10/src/Components/Datepicker.svelte'
  
  const dispatch = createEventDispatcher()
  
  const dateFormat = '#{l}, #{F} #{j}, #{Y}'

  let startDate = new Date()

  const startDateSelectableCallback = date => {
    return true
  }

</script>

<style>
  .date-picker-container {
    border: 1px solid #ddd;
    display: grid;
    grid-template-columns: 40% 20% 40%;
    padding: 10px;
  }
</style>

<div class="date-picker-container">
  <Datepicker
    format="dateFormat"
    start={new Date()} 
    selectableCallback={startDateSelectableCallback}
    on:dateSelected={e => {
      startDate = new Date(e.detail.date)
      dispatch('dateChanged', { startDate: startDate })
    }}
  >
    <div class="appt-date">
      {`${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getDate()} `}
    </div>
  </Datepicker>
</div>
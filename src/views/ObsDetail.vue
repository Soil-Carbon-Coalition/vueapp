<template>
  <b-container v-if="!loading">
    <h3>
      Showing Observation # {{ observation.id }} on site: {{ observation.site }}:
      <br />
      Type: {{ observation.type }}
    </h3>
    <p>{{ observation.kv }}</p>
    <p>Observer: {{ observation.observer }}</p>
  </b-container>
</template>
<script>
import SHService from '@/services/SHService.js'
export default {
  props: ['id'],
  data() {
    return {
      observation: Object,
      loading: true,
      errored: false
    }
  },
  created() {
    SHService.getObs(this.id)
      .then(response => (this.observation = response.data))
      .catch(error => {
        console.log('There was an error', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

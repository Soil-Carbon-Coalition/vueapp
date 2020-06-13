<template>
  <b-container v-if="!loading">
    <b-row>
      <h3>
        Showing Observation # {{ feature.id }} on site:
        {{ feature.properties.sitename }}:
        <br />
        Type: {{ feature.properties.type }}
      </h3>
      <p>{{ feature.properties }}</p>
      <p>Observer: {{ feature.properties.observer }}</p>
      <BaseMap v-if="!loading" :features="feature"></BaseMap>
    </b-row>
    <b-row> </b-row>
  </b-container>
</template>
<script>
import SHService from '@/services/SHService.js'
import Nprogress from 'nprogress'
export default {
  props: ['id'],
  data() {
    return {
      feature: {},
      loading: true,
      errored: false
    }
  },
  created() {
    Nprogress.start()
    SHService.getObs(this.id)
      .then(response => {
        this.feature = response.data
        Nprogress.done()
      })
      .catch(error => {
        console.log('There was an error', error.response)
        Nprogress.done()
        if (error.response && error.response.status == 404) {
          this.$router.push({
            name: '404',
            params: { resource: 'observation' }
          })
        } else {
          this.$router.push({ name: 'network-issue' })
        }
      })
      .finally(() => (this.loading = false))
  }
}
</script>

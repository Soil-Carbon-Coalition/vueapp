<template>
  <b-container v-if="!loading">
    <h3>site # {{ site.id }}: {{ site.properties.name ? site.properties.name : 0 }}</h3>
    <p>Coordinates: {{ site.geometry.coordinates }}</p>
    <p>Accuracy: {{ site.properties.accuracy }}</p>
    <BaseMap :features="site"></BaseMap>
  </b-container>
</template>
<script>
import SHService from '@/services/SHService.js'
import Nprogress from 'nprogress'
export default {
  props: ['id'],
  data() {
    return {
      site: {},
      loading: true,
      errored: false
    }
  },
  created() {
    Nprogress.start()
    SHService.getSite(this.id)
      .then(response => {
        this.site = response.data
        Nprogress.done()})
      .catch(error => {
        console.log('There was an error', error.response)
        Nprogress.done()
        if (error.response && error.response.status == 404) {
          this.$router.push({
            name: '404',
            params: { resource: 'site' }
          })
        } else {
          this.$router.push({ name: 'network-issue' })
        }
      })
      
      .finally(() => (this.loading = false))
  }
}
</script>

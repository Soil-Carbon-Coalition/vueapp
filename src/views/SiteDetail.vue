<template>
  <div v-if="!loading">
    <h3>site # {{ site.id }}: {{ site.properties.name ? site.properties.name : 0 }}</h3>
    <p>Coordinates: {{ site.geometry.coordinates }}</p>
    <p>Accuracy: {{ site.properties.accuracy }}</p>
  </div>
</template>
<script>
import SHService from '@/services/SHService.js'
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
    SHService.getSite(this.id)
      .then(response => (this.site = response.data))
      .catch(error => {
        console.log('There was an error', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

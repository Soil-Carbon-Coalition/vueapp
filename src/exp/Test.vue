<template>
  <div>
    <h1 v-if="loading">Loading . . .</h1>
    <BaseMap v-if="!loading" :features="features"></BaseMap>
  </div>
</template>

<script>
import SHService from '@/services/SHService.js'
export default {
  name: 'Test',
  data() {
    return {
      loading: true,
      features: []
    }
  },
  mounted() {
    SHService.getObss()
      // vuemastery shows this as response => {} which doesn't work!!! parens work
      // the response data will normally be a FeatureCollection with a features array
      .then(response => {
        this.features = response.data.features
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

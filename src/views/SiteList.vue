<template>
  <b-container>
    <b-row v-if="!loading">
      <h3>Sites ({{ numberReturned }})</h3>
      <BaseMap :features="features"></BaseMap>
    </b-row>
    <b-row>
    <SiteCard v-for="site in features" :key="site.id" :site="site" />
    </b-row>
  </b-container>
</template>

<script>
import SiteCard from '@/components/SiteCard.vue'
import SHService from '@/services/SHService.js'
import Nprogress from 'nprogress'

export default {
  components: {
    SiteCard
  },
  data() {
    return {
      features: [],
      loading: true,
      errored: false,
      numberReturned: Number
    }
  },
  created() {
    Nprogress.start()
    SHService.getSites()
      .then(response => {
        this.features = response.data.features
        this.numberReturned = response.data.features.length
        Nprogress.done()
        })
      .catch(error => {
        console.log('There was an error:', error.response)
        Nprogress.done()
        this.$router.push({ name: 'network-issue' })
        
      })
      .finally(() => (this.loading = false))
  }
}
</script>

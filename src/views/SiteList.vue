<template>
  <div v-if="!loading">
    <h1>Site Listing</h1>
    <SiteCard v-for="site in sites.features" :key="site.id" :site="site" />
  </div>
</template>

<script>
import SiteCard from '@/components/SiteCard.vue'
import SHService from '@/services/SHService.js'

export default {
  components: {
    SiteCard
  },
  data() {
    return {
      sites: [],
      loading: true,
      errored: false
    }
  },
  created() {
    SHService.getSites()
      .then(response => (this.sites = response.data))
      .catch(error => {
        console.log('There was an error:', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

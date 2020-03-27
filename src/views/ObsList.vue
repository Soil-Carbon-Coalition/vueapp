<template>
  <div v-if="!loading">
    <h1>Observation Listing</h1>
    <ObsCard v-for="observation in observations" :key="observation.id" :observation="observation" />
  </div>
</template>

<script>
import ObsCard from '@/components/ObsCard.vue'
import SHService from '@/services/SHService.js'

export default {
  components: {
    ObsCard
  },
  data() {
    return {
      observations: [],
      loading: true,
      errored: false
    }
  },
  created() {
    SHService.getObss()
      // vuemastery shows this as response => {} which doesn't work!!! parens work
      .then(response => {
        this.observations = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

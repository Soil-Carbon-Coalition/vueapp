<template>
  <div>
    <h1>Observations</h1>
    <ObsCard
      v-for="observation in observations.features"
      :key="observation.id"
      :observation="observation"
    ></ObsCard>
    <!-- <BaseMap :observations="observations" /> -->
  </div>
</template>

<script>
import ObsCard from '@/components/ObsCard.vue'
import SHService from '@/services/SHService.js'

export default {
  components: {
    ObsCard
  },
  props: {},
  data() {
    return {
      observations: Object
    }
  },
  created() {
    SHService.getObss()
      // vuemastery shows this as response => {} which doesn't work!!! parens work
      .then(response => {
        this.observations = response.data
        console.log('length: ', this.observations.features.length)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

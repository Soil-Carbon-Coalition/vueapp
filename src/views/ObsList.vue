<template>
  <b-container>
    <b-row v-if="!loading">
   <h3>Observations ({{ numberReturned }})</h3>
      <BaseMap :features="observations.features"></BaseMap>
    </b-row>
    <b-row>
      <ObsCard
        v-for="observation in observations.features"
        :key="observation.id"
        :observation="observation"
      ></ObsCard>
    </b-row>
   </b-container>
</template>

<script>
import ObsCard from '@/components/ObsCard.vue'
import SHService from '@/services/SHService.js'
import store from '@/store/store.js'
import Nprogress from 'nprogress'

export default {
  components: {
    ObsCard
  },
  // props: {},
  data() {
    return {
      observations: Object,
      loading: true,
      numberReturned: Number
    }
  },
  
  created() {
    Nprogress.start()
    SHService.getObss()
      // vuemastery shows this as response => {} which doesn't work!!! parens work
      .then(response => {
        this.observations = response.data
        this.numberReturned = this.observations.features.length
        Nprogress.done()
      })
      .catch(error => {
        console.log('There was an error:', error.response)
        Nprogress.done()
        this.$router.push({ name: 'network-issue' })
        // the following adds a notification with the namespaced module in the Vuex store
        const notification = {
          type: 'error',
          message: 'There was a problem fetching observations: ' + error.message
        }
        store.dispatch('notification/add', notification, { root: true })
      })
      .finally(() => (this.loading = false))
  }
}
</script>

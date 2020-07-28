<template>
  <b-container>
    <b-row>
      <h3>
        <span v-if="!loading" style="color:blue">{{ filteredFeatures.length }}</span>
        project sites with observations
      </h3>
    </b-row>
    <b-row v-if="!loading">
      <p>Enter any text search term, such as Infiltration 2020-05, Comment, nitrogen, a person's name, or even a date such as 2020-05-24. Sites with matching observations will be shown when the map is updated to match the search.</p>

      <div>
        <b-form inline>
          <b-input v-model="search" class="m-3" placeholder="Search" type="search"></b-input>

          <b-button
            class="m-3"
            type="submit"
            variant="primary"
            @click="this.reRenderBaseMap"
          >Update map</b-button>
        </b-form>
      </div>

      <!-- <b-button variant="dark" @click="modalShow = !modalShow">Help</b-button> -->
    </b-row>
    <b-row>
      <BaseMap v-if="!loading" :features="filteredFeatures" :key="baseMapKey"></BaseMap>
    </b-row>
    <b-row>
      <div>
        <b-modal v-model="modalShow" hide-footer>
          <template v-slot:modal-title>Some help here perhaps</template>
          <template v-slot:default>The quick brown fox</template>
        </b-modal>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import SHService from '@/services/SHService.js'
import store from '@/store/store.js'
import Nprogress from 'nprogress'
// import axios from 'axios'

export default {
  name: 'ObsMap.vue',

  data() {
    return {
      loading: true,
      modalShow: false,
      search: '',
      baseMapKey: 0,
      features: Array,
      items: this.features
    }
  },
  computed: {
    axiosParams() {
      const params = new URLSearchParams()
      params.append('project_id', this.$store.state.project.id)
      // params.append('type_id', 19)
      return params
    },

    filteredFeatures() {
      if (this.search == '') {
        return this.features
      }
      let filtered = this.features.filter(feature => {
        const site_observations = feature.properties.site_observations.filter(
          el => JSON.stringify(el).match(this.search, 'i')
        )
        return site_observations.length > 0
      })
      return filtered
    }
  },
  methods: {
    get_sites() {
      Nprogress.start()
      SHService.getSites({ params: this.axiosParams })
        .then(response => {
          this.features = response.data.features
          Nprogress.done()
        })
        .catch(error => {
          console.log('There was an error:', error.response)
          Nprogress.done()
          this.$router.push({ name: 'network-issue' })
          // the following adds a notification with the namespaced module in the Vuex store
          const notification = {
            type: 'error',
            message:
              'There was a problem fetching observations: ' + error.message
          }
          store.dispatch('notification/add', notification, { root: true })
        })
        .finally(() => (this.loading = false))
    },
    reRenderBaseMap() {
      this.baseMapKey += 1
    }
  },
  mounted() {
    this.get_sites()
  }
}
</script>

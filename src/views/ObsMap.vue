<template>
  <b-container>
    <b-row>
      <h3>
        <span v-if="!loading" style="color:blue">
          {{
          filteredFeatures.length
          }}
        </span>
        project sites with matching observations
      </h3>
    </b-row>
    <b-row v-if="!loading">
      <p>Enter any search term. Update the map to see sites with matching observations.</p>

      <div>
        <b-form inline @submit.prevent>
          <b-input v-model="search" class="m-3" placeholder="Search" type="search"></b-input>

          <b-button
            type="submit"
            class="m-3"
            variant="primary"
            @click="this.reRenderBaseMap"
          >Update map</b-button>

          <b-button variant="info" @click="modalShow = !modalShow">Search tips</b-button>
        </b-form>
      </div>
    </b-row>
    <b-row>
      <BaseMap v-if="!loading" :features="filteredFeatures" :key="baseMapKey"></BaseMap>
    </b-row>
    <b-row>
      <div>
        <b-modal v-model="modalShow" ok-only>
          <template v-slot:modal-title>Search tips</template>
          <template
            v-slot:default
          >This offers a simple text-based search, not case-sensitive. Enter your term such as Infiltration 2020-05, Comment, nitrogen, a person's name, or a date (YYYY-MM-DD) such as 2020-05-24.</template>
        </b-modal>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import SHService from '@/services/SHService.js'
import store from '@/store/store.js'
import Nprogress from 'nprogress'

export default {
  name: 'ObsMap.vue',

  data() {
    return {
      loading: true,
      modalShow: false,
      search: '',
      baseMapKey: 0,
      features: Array
      // items: this.features
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
      return (
        this.features
          // use map first so as not to overwrite this.features
          .map(feature => ({
            ...feature,
            properties: {
              name: feature.properties.name,
              site_observations: feature.properties.site_observations.filter(
                obs => {
                  return JSON.stringify(obs).match(new RegExp(this.search, 'i'))
                }
              )
            }
          }))
          .filter(feature => feature.properties.site_observations.length)
      )
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

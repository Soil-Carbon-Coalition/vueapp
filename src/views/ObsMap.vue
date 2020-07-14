<template>
  <b-container>
    <b-row>
      <h3>
        Sites with observations . . .
        <span v-if="!loading">({{ numberReturned }})</span>
      </h3>
    </b-row>

    <b-form-input v-model="param1" type="search" size="sm" class="vw-50" placeholder="Search"></b-form-input>
    <b-form-input v-model="value1" type="search" size="sm" class="vw-50" placeholder="Search"></b-form-input>
    <b-button @click="this.search_obs" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    <!-- <input id="sendButton" type="submit" value="search" @click="this.search_obs" /> -->
    <b-button variant="dark" @click="modalShow = !modalShow">Help</b-button>
    <b-row>
      <BaseMap v-if="!loading" :features="observations.features"></BaseMap>
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
  props: {
    // param1: null
  },
  data() {
    return {
      observations: Object,
      loading: true,
      numberReturned: Number,
      modalShow: false,
      param1: 'project_id',
      value1: 7
    }
  },
  computed: {
    axiosParams() {
      const params = new URLSearchParams()
      params.append(this.param1, this.value1)
      // params.append(this.param2)
      return params
    }
  },
  methods: {
    search_obs: function() {
      Nprogress.start()
      SHService.getSites({ params: this.axiosParams })
        .then(response => {
          this.observations = response.data
          if (this.observations.features.length) {
            this.numberReturned = this.observations.features.length
          }
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
    }

    // created() {}
  }
}
</script>

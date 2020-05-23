<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Vue Axios Post - create OBS</div>

          <div class="card-body">
            <form @submit.prevent="createObs">
              <strong>Type:</strong>
              <input type="number" class="form-control" v-model="obs.type" />
              <strong>Observer:</strong>
              <input type="number" class="form-control" v-model="obs.observer" />
              <strong>Site:</strong>
              <input type="number" class="form-control" v-model="obs.site" />
              <strong>key1:</strong>
              <input type="text" class="form-control" v-model="obs.kv[0]" />
              <strong>val1:</strong>
              <input type="number" class="form-control" v-model.number="obs.kv[1]" step=".001" />

              <input type="submit" class="btn btn-success" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// IF USER==OBSERVER FOR EDIT FUNCTIONALITY. STEPS:
// LOAD PROPER SUBCOMPONENT FOR OBSTYPE (INTO SLOT?)
// CREATE FRESH OBS OBJECT (BLANK KV)
// CREATEOBS FUNCTION: GET STATE FOR SITE, OBSTYPE, USER, PROJECT, ADD KV. then
// MAKE POST REQUEST W AXIOS, WAIT TILL RESPONSE RETURNS, then createFreshObsObject if there is no
// error.
// import store from '@/store/store.js'
import SHService from '@/services/SHService'

export default {
  mounted() {
    console.log('ObsCreate mounted.')
  },
  data() {
    return {
      obs: this.createFreshObs()
    }
  },
  methods: {
    createObs() {
      //   let obs = this
      //   this.obs = this.createFreshObs()
      SHService.postObs(this.obs)
        .then(function(response) {
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    createFreshObs() {
      return {
        // GET THESE FROM STORE!
        observer: null,
        type: null,
        site: null,
        kv: {}
      }
    }

    // USE SOMETHING ALONG THESE LINES to commit an action with store
    // createNewObs({ commit, dispatch }, obs) {
    //   return SHService.postObs(obs).then(() => {
    //     // commit('ADD_EVENT', event)
    //     const notification = {
    //       type: 'success',
    //       message: 'Your observation has been added to your Outbox!'
    //     }
    //     store.dispatch('notification/add', notification, { root: true })
    //   })
    // }
  }
}
</script>

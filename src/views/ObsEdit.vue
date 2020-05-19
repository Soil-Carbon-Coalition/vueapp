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
        observer: null,
        type: null,
        site: null,
        kv: {}
      }
    }
  }
}
</script>

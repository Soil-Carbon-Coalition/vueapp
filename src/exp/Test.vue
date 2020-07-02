<template>
  <div>
    <h1>Test page</h1>
    <p>{{ info }}</p>
  </div>
</template>

<script>
import axios from 'axios'
// import SHService from '@/services/SHService.js'
export default {
  name: 'Test',
  data() {
    return {
      // loading: true,
      info: null,
      obs: {
        observer: 1,
        type: 19,
        site: 1073,
        project: 7,
        kv: { something: 43, b: 'there goes a good man' }
      }
    }
  },
  methods: {
    postObs: function() {
      axios.post('http://127.0.0.1:8000/api/observations/', this.obs)

      // axios
      //   .post('/user', {
      //     firstName: 'Fred',
      //     lastName: 'Flintstone'
      //   })
      //   .then(function(response) {
      //     console.log(response)
      //   })
      //   .catch(function(error) {
      //     console.log(error)
      //   })
    }
  },
  mounted() {
    this.postObs()
  }
  //   SHService.getObss()
  //     // vuemastery shows this as response => {} which doesn't work!!! parens work
  //     // the response data will normally be a FeatureCollection with a features array
  //     .then(response => {
  //       this.features = response.data.features
  //     })
  //     .catch(error => {
  //       console.log('There was an error:', error.response)
  //     })
  //     .finally(() => (this.loading = false))
  // }
}
</script>

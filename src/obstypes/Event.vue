<template>
  <b-container fluid>
    <h2>Event</h2>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group label="Event title" label-for="input-1" description="simple title">
        <b-form-input
          id="input-1"
          type="text"
          v-model="obs.kv.title"
          placeholder="event title"
          trim
          required
        />
      </b-form-group>
      <b-form-group label="Where" label-for description="take picture or upload picture from file">
        <b-form-file id="site" type="text" />
        <!-- <button @click="onUpload">Upload</button> -->
      </b-form-group>
      <b-button type="submit" variant="primary" class="m-3">Submit</b-button>
      <b-button type="reset" variant="danger" class="m-3">Reset</b-button>
    </b-form>
  </b-container>
</template>

<script>
import SHService from '@/services/SHService.js'
import Nprogress from 'nprogress'
export default {
  data() {
    return {
      obs: {
        observer: this.$store.state.user.id,
        project: this.$store.state.project.id,
        site: this.$store.state.observation.site.id,
        type: 16,
        kv: {
          title: '',
          description: '',
          date: ''
        }
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.obs = JSON.stringify(this.obs)

      Nprogress.start()
      SHService.postObs(this.obs)
        .then(response => {
          this.photo = response.data.file
          console.log(response.data)
          Nprogress.done()
        })
        .catch(function(error) {
          Nprogress.done()
          console.log(error)
        })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.obs.kv.title = ''
      this.obs.kv.description = ''
      this.obs.kv.date = ''
      // this.kv.date = ''
      // this.kv.description = ''
      // Trick to reset/clear native browser form validation state
      // this.show = false
      // this.$nextTick(() => {
      //   this.show = true
      // })
    }
  }
}
</script>

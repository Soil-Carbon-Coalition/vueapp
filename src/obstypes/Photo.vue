<template>
  <b-container fluid>
    <h2>This form submits a photo</h2>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        label="Photo caption"
        label-for="input-1"
        description="With a simple caption, you can match a repeat photo with this"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="caption"
          placeholder="photo caption"
          trim
          required
        />
      </b-form-group>
      <b-form-group
        label="Photo:"
        label-for="file-input"
        description="take picture or upload picture from file"
      >
        <input id="file-input" type="file" @change="onFileSelected" />
      </b-form-group>
      <b-form-group label="description" label-for="input-3">
        <b-form-textarea
          id="input-3"
          v-model="description"
          placeholder="Why you took this photo, what are you trying to show"
        />
      </b-form-group>
      <b-form-group label="date" label-for="input-4" description="photo date">
        <b-form-datepicker id="input-4" v-model="date" class="mb-2"></b-form-datepicker>
      </b-form-group>
      <b-button type="submit" variant="primary" class="m-3">Submit</b-button>
      <b-button type="reset" variant="danger" class="m-3">Reset</b-button>
    </b-form>
  </b-container>
</template>

<script>
// import SHService from '@/services/SHService.js'
import axios from 'axios'
import Nprogress from 'nprogress'
export default {
  data() {
    return {
      csrf: 'qVENVTTvHx7ummUPh9qkgNqeNrCdT5CfypZpKPjwjCii3yNkgmZH1Hi5cf22illz',
      caption: '',
      date: null,
      description: 'this is a test',
      obs_type: 16,
      observer: this.$store.state.authUser.id,
      photo: null,
      project: this.$store.state.project.id,
      site: this.$store.state.site.id
    }
  },
  methods: {
    onFileSelected(event) {
      this.photo = event.target.files[0]
      console.log(this.photo)
    },
    onSubmit(evt) {
      evt.preventDefault()
      const fd = new FormData()
      fd.append('caption', this.caption)
      fd.append('date', this.date)
      fd.append('description', this.description)
      fd.append('obs_type', 16)
      fd.append('observer', this.$store.state.authUser.id)
      fd.append('photo', this.photo)
      fd.append('project', this.$store.state.project.id)
      fd.append('site', this.$store.state.site.id)
      Nprogress.start()
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/observations/',
        headers: {
          'X-CSRFToken': this.csrf
        },
        data: fd
      })
        .then(response => {
          console.log(response.data)
          Nprogress.done()
        })
        .catch(function(error) {
          Nprogress.done()
          console.log(error)
        })
    },
    onReset() {
      console.log('reset')
      //   evt.preventDefault()((this.caption = ''))((this.date = null))(
      //     (this.description = 'this is a test')
      //   )((this.photo = null))
    }
  }
}
</script>

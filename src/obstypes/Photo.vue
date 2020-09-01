<template>
  <b-container fluid>
    <h2>Submit a photo or image</h2>
    <b-form @submit="onSubmit">
      <b-form-group
        label="Photo caption"
        label-for="input-1"
        description="location, direction, data sources for matching a repeat photo"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="caption"
          placeholder="photo caption"
          trim
          required
          size="lg"
        />
      </b-form-group>
      <b-form-group
        label="Photo:"
        label-for="file-input"
        description="take picture or upload image from file"
      >
        <b-form-file
          size="lg"
          v-model="photo"
          :state="Boolean(photo)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          required
        ></b-form-file>

        <!-- <input id="file-input" type="file" @change="onFileSelected" /> -->
      </b-form-group>
      <b-form-group label="What are you trying to show?" label-for="input-3">
        <b-form-textarea size="lg" id="input-3" v-model="description" required />
      </b-form-group>
      <b-form-group label="date" label-for="input-4" description="image date">
        <b-form-datepicker size="lg" dark required id="input-4" v-model="date" class="mb-2"></b-form-datepicker>
        <!-- <input type="date" v-model="date" required="true" /> -->
      </b-form-group>
      <BaseConfirm />
      <b-button type="submit" variant="dark" size="lg" class="m-5 w-75">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
// import SHService from '@/services/SHService.js'
import axios from 'axios'
import Nprogress from 'nprogress'
export default {
  name: 'Photo.vue',
  data() {
    return {
      csrf: 'qVENVTTvHx7ummUPh9qkgNqeNrCdT5CfypZpKPjwjCii3yNkgmZH1Hi5cf22illz',
      caption: null,
      date: '',
      description: null,
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
      if (this.date == '') {
        alert('You must select the date of the image or photo')
        return
      }
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
    }
  }
}
</script>

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
          v-model="obs.kv.caption"
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
        <b-form-file id="file-input" type="file" @change="onFileSelected" />
        <!-- <button @click="onUpload">Upload</button> -->
      </b-form-group>
      <!-- <b-form-group label="description" label-for="input-3">
        <b-form-textarea
          id="input-3"
          v-model="obs.kv.description"
          placeholder="Why you took this photo, what are you trying to show"
        />
      </b-form-group>
      <b-form-group label="date" label-for="input-4" description="photo date">
        <b-form-datepicker id="input-4" v-model="obs.kv.date" class="mb-2"></b-form-datepicker>
      </b-form-group>-->
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
      selectedFile: null,
      obs: {
        observer: this.$store.state.authUser.id,
        project: this.$store.state.project.id,
        site: this.$store.state.site.id,
        obs_type: 16,
        kv: {
          caption: '',
          photo: '',
          date: '2020-07-24',
          description: 'this is a test'
        }
      }
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    },
    // onUpload() {
    //   let fd = new FormData()
    //   fd.append('file', this.selectedFile, this.selectedFile.name)
    //   axios.post('http://localhost:8000/api/upload/', fd).then(res => {
    //     console.log(res)
    //   })
    // }
    // uploadImage(event) {
    //   const URL = 'http://localhost:8000/api/observations/'

    //   let formdata = new FormData()
    //   formdata.append('name', 'my-picture')
    //   formdata.append('file', event.target.files[0])

    //   axios.put(URL, formdata, config).then(response => {
    //     console.log('image upload response > ', response)
    //   })
    // },
    onSubmit(evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.obs.kv))
      // const fileConfig = {
      //   header: {
      //     // 'Content-Type': 'image/jpeg'
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      const fd = new FormData()
      fd.append('file', this.selectedFile, this.selectedFile.name)
      console.log(fd)
      Nprogress.start()
      axios
        .post('http://localhost:8000/api/upload/', fd, {
          header: {
            'Content-Disposition':
              'form-data; name="file"; filename=this.selectedFile.name',
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.photo = response.data.file
          console.log(response.data)
          Nprogress.done()
        })
        .catch(function(error) {
          Nprogress.done()
          console.log(error)
        })
      // .finally(() => {
      //   axios
      //     .post('http://localhost:8000/api/observations/', this.obs)
      //     .then(function(response) {
      //       this.output2 = response.data
      //     })
      //     .catch(function(error) {
      //       this.output2 = error
      //     })
      // })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.obs.kv.caption = ''
      this.obs.kv.photo = ''
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

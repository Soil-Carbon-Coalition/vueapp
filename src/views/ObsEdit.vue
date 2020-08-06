<template>
  <b-container>
    <h2>Post {{ this.obstype }} observation</h2>
    <p>Project: {{ currentProject.name }}</p>
    <p>Site: {{ currentSite.sitename }} at {{ currentSite.geometry.coordinates }}</p>

    <!-- <p>Observation type: {{ this.obs_type }}</p> -->
    <!-- <Infiltration /> -->
    <component v-bind:is="this.obstype"></component>
  </b-container>
</template>
<script>
import axios from 'axios'
import Nprogress from 'nprogress'
// import Infiltration from '@/obstypes/Infiltration.vue'
// import SHService from '@/services/SHService'
export default {
  //   components: {
  //     Infiltration
  //   },
  props: {
    obstype: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedFile: null,
      obs: {
        site: this.currentSite,
        project: this.currentProject,
        observer: this.authUser,
        type: 19,
        kv: {}
      }
    }
  },
  computed: {
    // obstype(){
    //     return $route.params.obstype
    // },
    currentSite() {
      return this.$store.getters.currentSite
    },
    currentProject() {
      return this.$store.getters.currentProject
    },
    authUser() {
      return this.$store.getters.authUser
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
      Nprogress.start()
      axios
        .post('http://httpbin.org/post', fd, {
          header: {
            'Content-Disposition': 'attachment; filename=this.selectedFile.name'
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
      this.obs.kv = {}
    }
  }
}
</script>

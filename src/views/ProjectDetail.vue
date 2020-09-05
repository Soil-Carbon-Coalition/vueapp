<template>
  <b-container v-if="!loading">
    <h3>{{ project.name }}</h3>
    <p>Geography: {{ project.geography }}</p>
    <p>Description: {{ project.description }}</p>
    <p>Guidelines for submitting observations and data: {{ project.guidelines }}</p>
    <!-- LIST PROJECT RESOURCES AND MAPS? -->
  </b-container>
</template>
<script>
import SHService from '@/services/SHService.js'
export default {
  props: ['id'],
  data() {
    return {
      project: Object,
      loading: true,
      errored: false
    }
  },
  mounted() {
    SHService.getProject(this.id)
      .then(response => (this.project = response.data))
      .catch(error => {
        console.log('There was an error', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

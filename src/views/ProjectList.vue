<template>
  <b-container v-if="!loading">
    <h1>Projects</h1>
    <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
  </b-container>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'
import SHService from '@/services/SHService.js'
import Nprogress from 'nprogress'

export default {
  components: {
    ProjectCard
  },
  data() {
    return {
      projects: [],
      loading: true,
      errored: false
    }
  },
  created() {
    Nprogress.start()
    SHService.getProjects()
      .then(response => {
        this.projects = response.data
        Nprogress.done()
      })
      .catch(error => {
        console.log('There was an error:', error.response)
        Nprogress.done()
        this.$router.push({ name: 'network-issue' })
      })
      .finally(() => (this.loading = false))
  }
}
</script>

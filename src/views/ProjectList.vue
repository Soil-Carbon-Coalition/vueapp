<template>
  <b-container v-if="!loading">
    <h1>Projects</h1>
    <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
  </b-container>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'
import SHService from '@/services/SHService.js'

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
    SHService.getProjects()
      .then(response => (this.projects = response.data))
      .catch(error => {
        console.log('There was an error:', error.response)
      })
      .finally(() => (this.loading = false))
  }
}
</script>

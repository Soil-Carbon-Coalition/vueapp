<template>
  <router-link :to="{ name: 'project-detail', params: { id: project.id } }">
    <b-card class="p-2" border-variant="primary">
      <h2>{{ project.name }}</h2>
      <p>{{ project.geography }}</p>
      <p>{{ project.description }}</p>
      <p>{{ project.ProjectCoordinator }}</p>
    </b-card>
  </router-link>
</template>

<script>
export default {
  props: {
    project: Object
  }
}
</script>

<style scoped>
h2 {
  color: rgb(14, 103, 14);
}
</style>

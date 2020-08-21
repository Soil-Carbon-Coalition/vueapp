<template>
  <b-container>
    <p>Project: {{ currentProject.name }}</p>
    <p>Site: {{ currentSite.sitename }} at {{ currentSite.geometry.coordinates }}</p>
  </b-container>
</template>
<script>
export default {
  computed: {
    currentSite() {
      return this.$store.getters.currentSite
    },
    currentProject() {
      return this.$store.getters.currentProject
    },
    authUser() {
      return this.$store.getters.authUser
    }
  }
}
</script>

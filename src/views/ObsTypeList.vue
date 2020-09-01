<template>
  <b-container>
    <div v-if="currentSite !== null">
      <h1>
        Add observation to site:
        <span class="sitename">{{ currentSite.properties.name }}</span>
      </h1>

      <p>at {{ currentSite.geometry.coordinates }}</p>
    </div>
    <div v-if="currentSite == null">Error</div>
  </b-container>
</template>

<script>
// import store from 'store'
export default {
  name: 'ObsTypeList.vue',
  computed: {
    currentSite() {
      return this.$store.getters.currentSite
    }
  }
}
</script>

<style scoped>
.sitename {
  color: green;
}
</style>

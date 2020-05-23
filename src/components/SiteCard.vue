<template>
  <router-link :to="{ name: 'site-detail', params: { id: site.id } }">
    <b-card class="p-2" border-variant="success">
      <h2>{{ site.properties.name }}</h2>
      <p>Coordinates: {{ site.geometry.coordinates }}</p>

      <p>{{ site.properties.accuracy }}</p>
    </b-card>
  </router-link>
</template>

<script>
export default {
  props: {
    site: Object
  }
}
</script>

<style scoped>
h2 {
  color: green;
}
</style>

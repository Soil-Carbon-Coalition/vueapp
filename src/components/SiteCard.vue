<template>
  <router-link class="site-link" :to="{ name: 'site-detail', params: { id: site.id } }">
    <div class="site-card -shadow">
      <span class="eyebrow">Coordinates: {{ site.geometry.coordinates }}</span>
      <h4>{{ site.properties.name }}</h4>
      <!-- <BaseIcon name="sites">
        <p>{{ site.properties.accuracy }}</p>
      </BaseIcon>-->
    </div>
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
h4 {
  color: green;
}
.site-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.site-card:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 129, 0.7),
    0 1px 15px 0 rgba(0, 0, 120, 0.877);
}
.site-card > .title {
  margin: 0;
}

.site-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>

<template>
  <router-link
    class="site-link"
    :to="{ name: 'obs-detail', params: { id: observation.id } }"
  >
    <div class="site-card -shadow">
      <h4>
        Obs # {{ observation.id }} on site {{ observation.properties.sitename }}
      </h4>
      <ul v-for="(value, name, index) in observation.properties" :key="index">
        <li v-if="value">
          <b>{{ name }}:</b>
          {{ value }}
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  // name: ObsCard,
  props: {
    observation: {}
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

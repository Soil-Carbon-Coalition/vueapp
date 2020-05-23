<template>
  <router-link :to="{ name: 'obs-detail', params: { id: observation.id } }">
    <b-card class="p-2" border-variant="primary">
      <h2>
        Observation on site
        <i>{{ observation.properties.sitename }}</i>
      </h2>
      <ul v-for="(value, name, index) in observation.properties" :key="index">
        <li v-if="value">
          <b>{{ name }}:</b>
          {{ value }}
        </li>
      </ul>
    </b-card>
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
h2 {
  color: green;
}
</style>

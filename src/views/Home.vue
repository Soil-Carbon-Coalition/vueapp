<template>
  <div>
    <p v-if="$store.state.user">Welcome back, {{ $store.state.user.email }}!</p>

    <p>
      <router-link :to="{ name: 'site-list' }">Site List</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'site-edit' }">Add site</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'obs-list' }">Observation List</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'obs-edit' }">Add Observation</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'page' }">Page</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'outbox' }">Your outbox</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'lmap' }">Lmap component</router-link>
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
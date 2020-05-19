<template>
  <div>
    <b-navbar type="light">
      <!-- <div id="nav" class="navbar navbar-expand-lg navbar-light bg-light"> -->
      <b-navbar-brand to="/">
        <BIconHouse />&nbsp;soilhealth.app
      </b-navbar-brand>
      <nav>
        <router-link :to="{ name: 'obs-list' }">Observation List</router-link>|
        <router-link :to="{ name: 'site-list' }">Site List</router-link>|
        <router-link :to="{ name: 'obs-create' }">Create Obs</router-link>|
        <router-link :to="{ name: 'page' }">Page</router-link>|
        <router-link :to="{ name: 'outbox' }">Your outbox</router-link>|
        <router-link :to="{ name: 'lmap' }">Lmap component</router-link>|
        <router-link :to="{ name: 'sitecreate' }">Add site</router-link>
|
      </nav>
    </b-navbar>
  </div>
</template>

<script>
export default {}
</script>

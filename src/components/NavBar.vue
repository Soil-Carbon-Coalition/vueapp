<template>
  <div id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">soilhealth.app HOME</router-link>
    <nav>
      <router-link :to="{ name: 'obs-list' }">Observation List</router-link>|
      <router-link :to="{ name: 'site-list' }">Site List</router-link>|
      <router-link :to="{ name: 'obs-create' }">Create Obs</router-link>|
      <router-link :to="{ name: 'login' }">Login</router-link>|
      <router-link :to="{ name: 'outbox' }">Your outbox</router-link>|
      <router-link :to="{ name: 'test' }">Test component</router-link>|
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>

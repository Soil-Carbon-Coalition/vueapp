<template>
  <b-container>
    <h1>Uh-oh . . .</h1>
    <h3>It looks like you're experiencing some network issues. Remember, most of soilhealth.app's data is on a server, and you need network to access it. If you think you have connectivity, please click the back button and try again.</h3>
    <router-link :to="{ name: 'home'}">Home page with menu</router-link>
  </b-container>
</template>

<script>
export default {}
</script>

<style>
</style>
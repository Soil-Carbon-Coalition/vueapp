<template>
  <b-container>
    <h1>Oops!</h1>
    <p>
      The
      
        <em>{{ resource }}</em>
      you're looking for does not exist.
    </p>
    <router-link :to="{ name: 'home' }">Home page with menu</router-link>
  </b-container>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style></style>

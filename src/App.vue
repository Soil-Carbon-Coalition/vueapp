<template>
  <div>
    <NavBar />
    <router-view />
    <!--  THIS ONE WILL RE-RUN COMPONENT IF THE QUERYSTRING OR PATH CHANGES
    <router-view :key="$route.fullPath" />-->
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
// import Footer from '@/components/Footer.vue'

export default {
  components: {
    NavBar
    // Footer
  }
}
</script>

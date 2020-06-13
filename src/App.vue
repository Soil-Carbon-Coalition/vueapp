<template>
  <div>
    <NavBar />
    <router-view />
    <!--  THIS ONE WILL RE-RUN COMPONENT IF THE QUERYSTRING OR PATH CHANGES
    <router-view :key="$route.fullPath" />-->
    <!-- set progressbar -->
        <!-- <vue-progress-bar></vue-progress-bar> -->
  </div>
</template>



<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

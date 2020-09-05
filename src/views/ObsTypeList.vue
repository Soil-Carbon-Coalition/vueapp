<template>
  <b-container>
    <div v-if="currentSite !== null">
      <h1>
        Add observation to site:
        <span class="sitename">{{ currentSite.properties.name }}</span>
      </h1>

      <p>at {{ currentSite.geometry.coordinates }}</p>
    </div>
    <div v-if="currentSite == null">Error</div>

    <div>
      <b-button size="lg" @click="getItem" variant="dark">Get Item</b-button>
    </div>
  </b-container>
</template>

<script>
// import store from 'store'
export default {
  name: 'ObsTypeList.vue',

  computed: {
    currentSite() {
      return this.$store.getters.currentSite
    }
  },
  methods: {
    getItem() {
      this.$iterateStorage(
        function(value, key) {
          //console.log all the kay/value pairs
          console.log([key, value])
        },
        function(err) {
          if (!err) {
            console.log('Iteration has completed')
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.sitename {
  color: green;
}
</style>

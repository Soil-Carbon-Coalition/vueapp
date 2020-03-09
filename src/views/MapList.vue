<template>
  <div>
    <h1>Maps Listing</h1>
    <MapCard v-for="map in maps" :key="map.id" :map="map" />
  </div>
</template>

<script>
import MapCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
export default {
  components: {
    MapCard
  },
  data() {
    return {
      maps: []
    }
  },
  created() {
    EventService.getMaps()
      .then(response => {
        this.maps = response.data
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>

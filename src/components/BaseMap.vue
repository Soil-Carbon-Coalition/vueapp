<template>
  <div>
    <h1 v-if="loading">Loading CHILD . . .</h1>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  name: 'BaseMap',
  props: {
    observations: {
      type: Array,
      required: true,
      default() {
        return ['default', 'yes']
      }
    }
  },
  data() {
    return {
      map: null,
      loading: true
    }
  },
  methods: {
    setupLeafletMap: function() {
      this.map = L.map('mapContainer').setView([45.259, -117.743], 5)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)
    },
    addData: function() {
      console.log('childdata length: ', this.observations.length)
      var feats = L.geoJSON(this.observations).addTo(this.map)
      this.loading = false
      this.map.fitBounds(feats.getBounds(), {
        padding: [50, 50]
      })
    }
  },

  mounted() {
    this.setupLeafletMap()
    setTimeout(this.addData, 2000)
    // this.addStatic()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 50vw;
  height: 80vh;
}
</style>

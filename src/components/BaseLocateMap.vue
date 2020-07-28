<template>
  <div id="mapContainer"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  props: {
    position: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      leafletMap: null
    }
  },
  methods: {
    setupLeafletMap: function() {
      this.leafletMap = L.map('mapContainer').setView(this.position, 12)
      L.marker(this.position).addTo(this.leafletMap)

      // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      //   attribution:
      //     '&copy; <a href="http://osm.org/copyright">OpenStreetleafletMap</a> contributors'
      // }).addTo(this.leafletMap)
      L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
        attribution:
          "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright'>ODbL</a>."
      }).addTo(this.leafletMap)
    },
    addMarker: function() {
      this.leafletMap.on('click', function(e) {
        new L.marker(e.latlng).addTo(this.leafletMap)
        console.log(e.latlng)
      })
    }
  },

  mounted() {
    this.setupLeafletMap()
    this.addMarker()
  },
  beforeDestroy() {
    if (this.leafletMap) {
      this.leafletMap.remove()
    }
  }
}
</script>
<style scoped>
#mapContainer {
  width: 40vw;
  height: 80vh;
}
</style>

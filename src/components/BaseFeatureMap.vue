<template>
  <div id="mapContainer"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  name: 'BaseFeatureMap',
  props: {
    feature: Object
  },

  data() {
    return {
      leafletMap: null
    }
  },
  methods: {
    setupLeafletMap: function() {
      this.leafletMap = L.map('mapContainer')
      // .setView([45, -117], 7)
      // L.marker(this.latlng).addTo(this.leafletMap)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetleafletMap</a> contributors'
      }).addTo(this.leafletMap)
      // L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
      //   attribution:
      //     "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright'>ODbL</a>."
      // }).addTo(this.leafletMap)
    },
    addFeature() {
      var myfeature = L.geoJSON(this.feature, {}).addTo(this.leafletMap)

      this.leafletMap.fitBounds(myfeature.getBounds(), {
        padding: [125, 125]
      })
    }
  },

  mounted() {
    this.setupLeafletMap()
    this.addFeature()
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
  width: 45vw;
  height: 50vh;
}
</style>

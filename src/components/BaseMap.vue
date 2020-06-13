<template>
  <div>
    <div class="custom-popup" id="mapContainer"></div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'

import L from 'leaflet'

export default {
  name: 'BaseMap',
  props: {
    features: {
      type: [Array, Object],
      required: true,
      default() {
        return ['default', 'yes']
      }
    }
  },
  data() {
    return {
      map: null,
      loading: true,
      popupOptions: {
        maxWidth: 500,
        maxHeight: 400
      }
      
    }
  },
  methods: {
    setupLeafletMap: function() {
      this.map = L.map('mapContainer').setView([45.259, -117.743], 4)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)
    },
    makeTable: function(obj) {
      var popup = ''
      popup += '<table>'
      Object.keys(obj).forEach(function(key) {
        if (obj[key]) {
          popup += '<tr><td>' + key + ':</td><td>' + obj[key] + '</td></tr>'
        }
      })
      popup += '</table>'
      return popup
    },
    onEachFeature: function(feature, layer) {
      if (feature.properties.name) {
        layer
          .bindTooltip(feature.properties.name)
          .bindPopup(this.makeTable(feature.properties), this.popupOptions)
      }
      else {
        layer
          .bindTooltip(feature.properties.sitename)
          .bindPopup(this.makeTable(feature.properties), this.popupOptions)
      }
    },
    
    addData: function() {
      var myfeatures = L.geoJSON(this.features, {
        onEachFeature: this.onEachFeature
      })
      if (Array.isArray(this.features)){
      var markers = L.markerClusterGroup()
      markers.addLayer(myfeatures).addTo(this.map)
      }
      else
      {
        myfeatures.addTo(this.map)
      }
      this.map.fitBounds(myfeatures.getBounds(), {
        padding: [50, 50]
      })
      this.loading = false
    }
  },

  mounted() {
    this.setupLeafletMap()
    this.addData()
    // setTimeout(this.addData, 4000)
    // this.addStatic()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style>
#mapContainer {
  width: 80vw;
  height: 100vh;
}
.custom-popup .leaflet-popup-content-wrapper {
  background: #eee;
  color: #000;
  font-size: 14px;
  line-height: 20px;
  border: hotpink;
}
</style>

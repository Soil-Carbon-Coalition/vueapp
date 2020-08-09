<template>
  <div id="mapContainer"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import 'bootstrap/dist/css/bootstrap.min.css'

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
      leafletMap: null,
      loading: true,
      popupOptions: {
        maxWidth: 500,
        maxHeight: 400
      }
    }
  },
  methods: {
    setupLeafletMap() {
      this.leafletMap = L.map('mapContainer').setView([45.259, -117.743], 4)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetleafletMap</a> contributors'
      }).addTo(this.leafletMap)
    },

    makeList: function(obj) {
      var popup = '<table>'
      if (obj.length) {
        for (var i = 0; i < obj.length; i++) {
          popup +=
            '<tr><td><a href="/observations/' +
            obj[i].id +
            '/">' +
            obj[i].label +
            '</a></td></tr>'
        }
        popup += '</table>'
      } else {
        popup = '<p>No observations for this site</p>'
      }
      return popup
    },
    onEachFeature: function(feature, layer) {
      layer
        .bindTooltip(feature.properties.name)
        .bindPopup(
          this.makeList(feature.properties.site_observations),
          this.popupOptions
        )
    },

    addData: function() {
      var myfeatures = L.geoJSON(this.features, {
        onEachFeature: this.onEachFeature
      })
      if (Array.isArray(this.features)) {
        var markers = L.markerClusterGroup()
        markers.addLayer(myfeatures).addTo(this.leafletMap)
      } else {
        myfeatures.addTo(this.leafletMap)
      }
      this.leafletMap.fitBounds(myfeatures.getBounds(), {
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
    if (this.leafletMap) {
      this.leafletMap.remove()
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 80vw;
  height: 100vh;
}

tr,
td {
  padding: 5px;
}
tr:nth-child(even) {
  background-color: #eee;
}
</style>

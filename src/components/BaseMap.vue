<template>
  <div class="custom-popup" id="mapContainer"></div>
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
    setupLeafletMap: function() {
      this.leafletMap = L.map('mapContainer').setView([45.259, -117.743], 4)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetleafletMap</a> contributors'
      }).addTo(this.leafletMap)
    },

    makeTable: function(obj) {
      var popup = ''
      popup += '<table>'
      Object.keys(obj).forEach(function(key) {
        if (obj[key]) {
          if (
            String(obj[key]).endsWith('.jpg') ||
            String(obj[key]).endsWith('.png')
          ) {
            popup +=
              '<tr><td>' +
              key +
              ':</td><td><img src="' +
              obj[key] +
              '" width=200 /></td></tr>'
          } else {
            popup += '<tr><td>' + key + ':</td><td>' + obj[key] + '</td></tr>'
          }
        }
      })
      popup += '</table>'
      return popup
    },
    makeList: function(obj) {
      var popup = '<div>'
      popup += '<ul class="list-group">'
      if (obj.length) {
        for (var i = 0; i < obj.length; i++) {
          popup +=
            '<a href="/observations/' +
            obj[i].id +
            '"><li class="list-group-item">' +
            obj[i].label +
            '</li></a>'
        }
        popup += '</ul></div>'
      } else {
        popup = '<p>No observations for this site</p>'
      }
      return popup
    },
    onEachFeature: function(feature, layer) {
      if (feature.properties.name) {
        layer
          .bindTooltip(feature.properties.name)
          .bindPopup(
            this.makeList(feature.properties.site_observations),
            this.popupOptions
          )
      } else {
        layer
          // .bindTooltip(feature.properties.sitename)
          .bindPopup(
            this.makeList(feature.properties.site_observations),
            this.popupOptions
          )
      }
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

<style>
#mapContainer {
  width: 80vw;
  height: 100vh;
}

tr:nth-child(even) {
  background-color: #ddd;
}
</style>

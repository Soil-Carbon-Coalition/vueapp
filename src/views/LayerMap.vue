<template>
  <b-container fluid>
    <b-row>
      <b-col cols="8">
        <div id="mapContainer"></div>
      </b-col>
      <b-col cols="4">
        <h3>{{ map.name }}</h3>
        <p>{{ map.description }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// import 'leaflet.markercluster/dist/MarkerCluster.css'
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// import 'leaflet.markercluster/dist/leaflet.markercluster.js'
// import omnivore from '@mapbox/leaflet-omnivore'

import SHService from '@/services/SHService.js'
// import Nprogress from 'nprogress'

export default {
  name: 'LayerMap',
  props: ['id'],
  data() {
    return {
      // NOTE 'map' is data object from api, 'leafletMap' is the map Leaflet creates
      map: Object,
      leafletMap: null,
      baseMaps: {},
      overlayMaps: {},
      loading: true,
      popupOptions: {
        maxWidth: 500,
        maxHeight: 400,
        midWidth: 350
      },
      iconSuffixes: [
        '',
        '-red',
        '-green',
        '-violet',
        '-orange',
        '-grey',
        '-yellow',
        '-black'
      ]
    }
  },
  methods: {
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
        .bindTooltip(
          feature.properties.name
            ? feature.properties.name
            : feature.properties.sitename
        )
        .bindPopup(
          this.makeList(feature.properties.site_observations),
          this.popupOptions
        )
    },
    addVectors: function() {
      var overlayNames = []
      var overlayData = []
      for (var i = 0; i < this.map.vectors.length; i++) {
        overlayNames.push(this.map.vectors[i].name)
        overlayData.push('mapdata' + i)
        SHService.getVectorData(this.map.vectors[i].dataUrl)
          .then(response => {
            overlayData[i] = L.geoJSON(response.data.features, {
              onEachFeature: this.onEachFeature
            }).addTo(this.leafletMap)
          })
          .catch(error => {
            console.log('VECTOR ERROR', error.response)
          })
      }
      overlayNames.forEach((key, j) => (this.overlayMaps[key] = overlayData[j]))
    },
    // addVectors: function() {
    //   var overlayNames = []
    //   var overlayData = []

    //   for (var i = 0; i < this.map.vectors.length; i++) {
    //     overlayNames.push(this.map.vectors[i].name)
    //     overlayData.push('mapdata' + i)

    //     // create a layerGroup for each vector
    //     this.map.vectors[i].name = L.layerGroup()
    //     // create a different uppercase variable for the data
    //     omnivore.geojson(this.map.vectors[i].dataurl).on('ready', function() {
    //       // After the 'ready' event fires, the GeoJSON contents are accessible
    //       // and you can iterate through layers to bind custom popups.
    //       L.eachLayer(function(marker) {
    //         // set icons according to index of forloop
    //         marker.setIcon(
    //           L.icon({
    //             iconUrl:
    //               '/leafletMarkers/marker-icon' + this.iconSuffixes[i] + '.png',
    //             shadowUrl: '/leafletMarkers/marker-shadow.png'
    //           })
    //         )
    //         marker.bindTooltip(marker.feature.properties.name)
    //         marker.bindPopup(marker.feature.properties.type, this.popupOptions)
    //       }).addLayer(this)
    //     })
    //   }
    //   overlayNames.forEach((key, j) => (this.overlayMaps[key] = overlayData[j]))
    // },
    addLayerControl: function() {
      console.log(this.overlayMaps, this.baseMaps)
      L.control.layers(this.baseMaps).addTo(this.leafletMap)

      // this.leafletMap.on('popupopen', function(e) {
      //   var px = this.leafletMap.project(e.popup._latlng)
      //   px.y -= e.popup._container.clientHeight / 2.5
      //   this.leafletMap.panTo(this.leafletMap.unproject(px), {
      //     animate: true
      //   })
      // })
    },
    initMap: function() {
      // Nprogress.start()
      SHService.getMap(this.id)
        .then(response => {
          this.map = response.data
          this.leafletMap = L.map('mapContainer', {
            center: this.map.center,
            zoom: this.map.zoom,
            scrollWheelZoom: false
          })
          // now add rasters
          var baseMapNames = []
          var baseMapTiles = []
          for (var i = 0; i < this.map.rasters.length; i++) {
            baseMapNames.push(this.map.rasters[i].name)

            this.map.rasters[i].name = L.tileLayer(
              this.map.rasters[i].tileUrl,
              {
                attribution: this.map.rasters[i].attrs.attribution
              }
            ).addTo(this.leafletMap)
            baseMapTiles.push(this.map.rasters[i].name)
          }
          baseMapNames.forEach(
            (key, j) => (this.baseMaps[key] = baseMapTiles[j])
          )
          console.log(this.baseMaps)
          this.addVectors()
          // this.addLayerControl()
          // Nprogress.done()
        })
        .catch(error => {
          console.log('RASTER ERROR', error.response)
          // Nprogress.done()
        })
        .finally(() => (this.loading = false))
    }
  },
  mounted() {
    this.initMap()
    setTimeout(this.addLayerControl, 4000)
  },

  beforeDestroy() {
    if (this.leafletMap) {
      this.leafletMap.remove()
    }
  }
}
//  self-invoking function to add the appropriate icons to the layer control
//    (function(){
//      for (var i = 0; i < Object.keys(overlayMaps).length; i++){
//        document.getElementById("icon"+i).src = "/static/maps/css/images/marker-icon" + icons[i] + ".png";
//      }
//    })();
</script>

<style>
#mapContainer {
  width: 100%;
  height: 100vh;
}

tr:nth-child(even) {
  background-color: #ddd;
}
</style>

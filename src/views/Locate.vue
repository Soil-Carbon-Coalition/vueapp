<template>
  <b-container>
    <h1>Add a location or site</h1>
    <b-form-input v-model="name" placeholder="Enter site name (required)" required />

    <div v-if="locationMode != 'drawPolygon'">
      <label for="lat">Latitude:</label>
      <b-form-input id="lat" type="number" step=".0000001" v-model="e.latlng.lat" />
      <label for="lng">Longitude:</label>
      <b-form-input id="lng" type="number" step=".0000001" v-model="e.latlng.lng" />
      <label for="acc">Accuracy in meters:</label>
      <b-form-input id="acc" type="number" v-model="e.accuracy" />
    </div>

    <b-form-group label="Choose a location mode:">
      <b-form-radio-group
        id="btn-radios-3"
        v-model="locationMode"
        buttons
        stacked
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-stacked"
        @change="check"
      >
        <b-form-radio value="mapLocate">GPS</b-form-radio>
        <b-form-radio value="clickMap" @checked="clickMap">Click on map</b-form-radio>
        <b-form-radio value="enterCoords" @checked="enterCoordinates">Enter coordinates</b-form-radio>
        <b-form-radio value="drawPolygon">Draw a polygon</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <div id="mapContainer"></div>
    <p>Button submit to store, offer choice of observation types</p>
  </b-container>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  // name: 'Locate.vue',

  data() {
    return {
      leafletMap: null,
      usermarker: null,
      e: {
        latlng: {},
        accuracy: 0
      },
      loading: true,
      name: '',
      locationMode: 'mapLocate'
    }
  },

  methods: {
    check(checked) {
      console.log(checked)
    },
    enterCoordinates() {
      console.log('enter coordinates')
    },
    clickMap() {
      console.log('click on map')
    },
    setupLeafletMap: function() {
      this.leafletMap = L.map('mapContainer')
      L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
        attribution:
          "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright'>ODbL</a>.",
        maxZoom: 18
      }).addTo(this.leafletMap)
    },
    get_location() {
      this.leafletMap
        .locate({
          setView: true,
          maxZoom: 18,
          watch: true,
          enableHighAccuracy: true,
          timeout: 10000
        })
        .on('locationfound', e => {
          var radius = e.accuracy / 2

          L.circle(e.latlng, radius).addTo(this.leafletMap)
          if (!this.usermarker) {
            this.usermarker = new L.marker(e.latlng)
              .addTo(this.leafletMap)
              .bindPopup(
                'This device believes it is within ' +
                  radius +
                  ' meters of this point'
              )
              .openPopup()
          } else {
            this.usermarker.setLatLng(e.latlng)
          }
          this.e = e
          this.loading = false
        })
        .on('locationerror', error => {
          console.log(error)
          if (this.usermarker) {
            this.leafletMap.removeLayer(this.usermarker)
            this.usermarker = undefined
          }
          this.leafletMap.stopLocate()
          this.loading = false
        })
    }

    // addMarker: function() {
    //   this.leafletMap.on('click', function(e) {
    //     new L.marker(e.latlng).addTo(this.leafletMap)
    //     console.log('new latlng: ', e.latlng)
    //   })
    // }
  },

  mounted() {
    this.setupLeafletMap()
    this.get_location()
  },
  beforeDestroy() {
    if (this.leafletMap) {
      this.leafletMap.remove()
      this.leafletMap.stopLocate()
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 80vw;
  height: 80vh;
}
</style>

<template>
  <b-container>
    <h3>Add a location or site</h3>
    <b-form-input
      class="mb-3"
      v-model="sitename"
      placeholder="Enter site name (required)"
      size="lg"
      required
    />
    <div v-if="locationMode != 'drawPolygon'">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Latitude"
        label-for="lat"
      >
        <b-form-input id="lat" size="lg" type="number" step=".0000001" v-model="latitude"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Longitude"
        label-for="lng"
      >
        <b-form-input id="lng" size="lg" type="number" step=".0000001" v-model="longitude"></b-form-input>
      </b-form-group>
      <b-form-group
        v-if="locationMode == 'mapLocate'"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Accuracy (m)"
        label-for="acc"
      >
        <b-form-input id="acc" size="lg" type="number" v-model="this.accuracy"></b-form-input>
      </b-form-group>
      <b-button
        v-if="locationMode == 'enterCoordinates'"
        type="submit"
        class="float-right w-50 p-3"
        @click="go_to_coordinates"
        variant="primary"
        d-inline
        size="lg"
      >Center map</b-button>
    </div>
    <hr />
    <div>
      <b-form-group label="Choose a location mode:">
        <b-form-radio-group
          id="btn-radios-3"
          v-model="locationMode"
          buttons
          stacked
          button-variant="outline-primary"
          size="lg"
          name="radio-btn-stacked"
          @change="call_location_mode"
        >
          <b-form-radio value="mapLocate">GPS</b-form-radio>
          <b-form-radio value="enterCoordinates">Enter coordinates</b-form-radio>
          <b-form-radio value="clickMap">Click on map</b-form-radio>
          <b-form-radio value="drawPolygon">Draw a polygon</b-form-radio>
        </b-form-radio-group>
        <b-button variant="info" class="m-3" size="lg" @click="modalShow = !modalShow">Location help</b-button>
      </b-form-group>
      <p class="hint">{{ hint }}</p>
    </div>
    <div id="mapContainer" class="map"></div>
    <p>Button submit to store, offer choice of observation types</p>

    <b-modal v-model="modalShow" ok-only>
      <template v-slot:modal-title>Location help</template>
      <template v-slot:default>
        <p>There are three ways to get a location:</p>
        <ol>
          <li>Use your device's GPS receiver, or the location of its network connection. This is the default and will be activated when this page loads.</li>
          <li>Enter coordinates (in decimal degrees of latitude and longitude). Remember that the western hemisphere uses negative numbers for longitude.</li>
          <li>Click the map at the correct location, or draw a polygon using the polygon tool. These both require that you are connected to a network so you can see base maps.</li>
        </ol>
        <p>Make the appropriate choice to define a new site.</p>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'

export default {
  name: 'Locate.vue',

  data() {
    return {
      map: null,
      marker: null,
      circle: null,
      latitude: 45,
      longitude: -117,
      accuracy: 10,
      sitename: '',
      locationMode: 'mapLocate',
      hint: '',
      polygon: null,
      modalShow: false
    }
  },
  methods: {
    call_location_mode(checked) {
      this[checked]()
    },
    makePoint() {
      // make a geojson feature geometry
      this.point = ``
    },
    enterCoordinates() {
      this.hint = 'Enter coordinates in decimal degrees and press Center map'
      this.map.removeLayer(this.circle)
    },
    go_to_coordinates() {
      this.marker.setLatLng([this.latitude, this.longitude])
      this.map.setView([this.latitude, this.longitude], 12)
    },
    clickMap() {
      this.hint =
        'Click on the map to select a new point. You must be online and can move and zoom the map to get a better view.'
      this.map.removeLayer(this.circle)
      this.map.on('click', e => {
        this.marker.setLatLng(e.latlng)
        this.latitude = e.latlng.lat
        this.longitude = e.latlng.lng
        this.map.setView(e.latlng, 12)
      })
    },
    drawPolygon() {
      this.hint =
        'You must be online to use this option. Select the polygon tool and click on map to define, edit, and save a single polygon.'
      this.map.removeLayer(this.circle)
      this.map.removeLayer(this.marker)
      console.log('draw polygon function')
      var drawnItems = new L.FeatureGroup()
      this.map.addLayer(drawnItems)
      var drawControl = new L.Control.Draw({
        draw: {
          polyline: false,
          polygon: true,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: drawnItems
        }
      })
      this.map.addControl(drawControl)
      this.map.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer
        drawnItems.addLayer(layer)
        // store the first polygon's geojson geometry
        this.polygon = drawnItems.toGeoJSON().features[0].geometry
      })
    },
    initMap() {
      this.map = L.map('mapContainer').fitWorld()
      L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
        attribution:
          "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright'>ODbL</a>.",
        maxZoom: 18
      }).addTo(this.map)
    },
    mapLocate() {
      this.hint =
        "Your device's GPS or internet connection will locate itself. If you are offline you may not see a map."
      this.map
        .locate({
          setView: true,
          maxZoom: 18,
          watch: true,
          enableHighAccuracy: true,
          timeout: 10000
        })
        .on('locationfound', e => {
          var radius = e.accuracy / 2
          this.circle = L.circle(e.latlng, radius).addTo(this.map)
          if (!this.marker) {
            this.marker = L.marker(e.latlng).addTo(this.map)
          } else {
            this.marker.setLatLng(e.latlng)
          }
          this.latitude = e.latlng.lat
          this.longitude = e.latlng.lng
          this.accuracy = e.accuracy
          this.map.stopLocate()
          // console.log('locate stopped')
        })
        .on('locationerror', error => {
          console.log(error)
          if (this.marker) {
            this.map.removeLayer(this.marker)
            this.map.removeLayer(this.circle)
            this.marker = undefined
          }
          this.map.stopLocate()
          // this.loading = false
        })
    }
  },

  mounted() {
    this.initMap()
    this.mapLocate()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
      this.map.stopLocate()
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 80vw;
  height: 80vh;
}
.hint {
  font-size: 1.4em;
}
</style>

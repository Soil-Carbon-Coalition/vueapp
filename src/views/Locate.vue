<template>
  <b-container>
    <h1>Add location</h1>
    <input v-model="this.name" placeholder="Name here" />

    <br />
    <div class="mt-2">Position: {{ this.position }}</div>

    <!-- 
3 RADIO BUTTONS CONTROLLING LOCATION MODE.
1. LOCATE FROM gps (DEFAULT)
2. LOCATE BY ENTERING COORDS
3. LOCATE BY CLICKING ON MAP
NEED TO TURN OFF GEOLOCATION FOR 2 AND 3

    -->

    <p>
      Latitude:
      <b-form-input type="number" v-model="this.latitude" />
    </p>
    <p>
      Longitude:
      <b-form-input type="number" v-model="this.longitude" />
    </p>
    <button type="submit" @click="this.loglat">get lat</button>

    <p>GPS accuracy: {{ this.accuracy }}</p>

    <button type="submit" @click="endWatch">Clear watch</button>
    <BaseLocateMap v-if="!loading" :position="position"></BaseLocateMap>
    <!-- <BasePointMap :position="position"></BasePointMap> -->
  </b-container>

  <!-- 
          NAME input (does not need to be unique)
          three radio buttons:
            locate with GPS
            point or draw on map using leaflet draw
  enter coordinates (map centers on these and puts marker)-->
</template>

<script>
export default {
  name: 'Locate.vue',

  data() {
    return {
      loading: true,
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      accuracy: {
        type: Number
      },
      name: {
        type: String,
        required: true
      },
      options: {
        enableHighAccuracy: true,
        timeout: 29 * 1000,
        maximumAge: 30 * 1000
      }
      // watchID: {
      //   type: Number
      // }
    }
  },
  computed: {
    position: function() {
      return [this.latitude, this.longitude]
    }
  },
  methods: {
    loglat: function() {
      console.log(this.latitude)
    },
    endWatch: function() {
      navigator.geolocation.clearWatch(this.watchID)
    },
    success: function(position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.accuracy = position.coords.accuracy
      this.endWatch(this.watchID)
      this.loading = false
    },
    error: function(error) {
      alert(`ERROR(${error.code}): ${error.message}`)
    },

    locate: function() {
      if (navigator.geolocation) {
        this.watchID = navigator.geolocation.watchPosition(
          this.success,
          this.error,
          this.options
        )
      } else {
        alert('Geolocation is not supported by this browser.')
      }
      console.log(this.watchID)
    }
  },

  mounted() {
    this.locate()
  }
}
</script>

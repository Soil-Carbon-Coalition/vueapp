<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <div id="mapContainer" class="map">
          <!-- <BasePopup ref="BasePopup" /> -->
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-check" v-for="layer in layers" :key="layer.id">
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="layer.active"
              @change="layerChanged(layer.id, layer.active)"
            />
            {{ layer.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  //   props: {
  //     features: {
  //       type: Array,
  //       required: true
  //     }
  //   },

  data() {
    return {
      map: null,
      loading: true,
      tileLayer: null,
      layers: [
        {
          id: 0,
          name: 'Restaurants',
          active: false,
          features: [
            {
              id: 0,
              name: "Bogart's Smokehouse",
              type: 'marker',
              coords: [38.6109607, -90.2050322]
            },
            {
              id: 1,
              name: "Pappy's Smokehouse",
              type: 'marker',
              coords: [38.6350008, -90.2261532]
            },
            {
              id: 2,
              name: 'Broadway Oyster Bar',
              type: 'marker',
              coords: [38.6188362, -90.1947098]
            },
            {
              id: 3,
              name: "Charlie Gitto's On the Hill",
              type: 'marker',
              coords: [38.617972, -90.2756436]
            },
            {
              id: 4,
              name: 'Sugarfire',
              type: 'marker',
              coords: [38.6304077, -90.1916921]
            },
            {
              id: 5,
              name: 'The Shaved Duck',
              type: 'marker',
              coords: [38.6036282, -90.2381407]
            },
            {
              id: 6,
              name: 'Mango Restaurant',
              type: 'marker',
              coords: [38.6313642, -90.1961267]
            },
            {
              id: 7,
              name: "Zia's Restaurant",
              type: 'marker',
              coords: [38.6157376, -90.27716]
            },
            {
              id: 8,
              name: "Anthonio's Taverna",
              type: 'marker',
              coords: [38.6143846, -90.280048]
            }
          ]
        },
        {
          id: 1,
          name: 'City/County Boundaries',
          active: false,
          features: [
            {
              id: 0,
              name: 'City of St. Louis',
              type: 'polygon',
              coords: [
                [38.770547, -90.168056],
                [38.753816, -90.177326],
                [38.74739, -90.183849],
                [38.731456, -90.206337],
                [38.587759, -90.20462],
                [38.577427, -90.219212],
                [38.56414, -90.232258],
                [38.545615, -90.248566],
                [38.70065, -90.265388],
                [38.717662, -90.253887],
                [38.722349, -90.238266],
                [38.729715, -90.221272],
                [38.764792, -90.184021],
                [38.77135, -90.183334]
              ]
            },
            {
              id: 1,
              name: 'St. Louis County',
              type: 'polygon',
              coords: [
                [38.771216, -90.169601],
                [38.78674, -90.144196],
                [38.799049, -90.124283],
                [38.813496, -90.11879],
                [38.82901, -90.141449],
                [38.827405, -90.170975],
                [38.821521, -90.186081],
                [38.824731, -90.20462],
                [38.477782, -90.717545],
                [38.471331, -90.712738],
                [38.492294, -90.406494],
                [38.484232, -90.409241],
                [38.47832, -90.416107],
                [38.472406, -90.422287],
                [38.465418, -90.422287],
                [38.454664, -90.413361],
                [38.454664, -90.401688],
                [38.492832, -90.273972],
                [38.510565, -90.268135],
                [38.531516, -90.258522],
                [38.724358, -90.237579],
                [38.727572, -90.227623],
                [38.734536, -90.21492],
                [38.740963, -90.20462],
                [38.747925, -90.198097],
                [38.756225, -90.189514],
                [38.763721, -90.185051],
                [38.771752, -90.184708]
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    initMap() {
      this.map = L.map('mapContainer').setView([38.63, -90.23], 12)
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        }
      )
      this.tileLayer.addTo(this.map)
    },
    initLayers() {
      this.layers.forEach(layer => {
        const markerFeatures = layer.features.filter(
          feature => feature.type === 'marker'
        )
        const polygonFeatures = layer.features.filter(
          feature => feature.type === 'polygon'
        )
        markerFeatures.forEach(feature => {
          feature.leafletObject = L.marker(feature.coords).bindTooltip(
            feature.name
          )
        })
        polygonFeatures.forEach(feature => {
          feature.leafletObject = L.polygon(feature.coords).bindPopup(
            feature.name
          )
        })
      })
      L.circle([38.63, -90.23], { radius: 200 }).addTo(this.map)
    },
    layerChanged(layerId, active) {
      const layer = this.layers.find(layer => layer.id === layerId)
      layer.features.forEach(feature => {
        if (active) {
          feature.leafletObject.addTo(this.map)
        } else {
          feature.leafletObject.removeFrom(this.map)
        }
      })
    }
  },

  mounted() {
    this.initMap()
    this.initLayers()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style scoped>
.map {
  height: 600px;
}
</style>

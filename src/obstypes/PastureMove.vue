<template>
  <b-container fluid>
    <h2>Rate your pasture move</h2>
    <h4>What would it take to fill the triangle?</h4>
    <div>
      <input
        type="range"
        id="grass"
        name="grass"
        min="0"
        max="100"
        value="56"
        v-model="this.stats[0].value"
      />
      <label for="grass">Grass residual, litter, soil health</label>
    </div>
    <div>
      <input
        type="range"
        id="animal"
        name="animal"
        min="0"
        max="100"
        value="77"
      />
      <label for="animal">Animal performance, fill, low-stress</label>
    </div>

    <div>
      <input
        type="range"
        id="convenience"
        name="convenience"
        min="0"
        max="100"
        value="25"
      />
      <label for="convenience"
        >Convenience and ease for you and your team</label
      >
    </div>

    <RadarChart
      :stats="stats"
      :polycolor="polycolor"
      :radar="radar"
      :scale="scale"
    >
    </RadarChart>
  </b-container>
</template>

<script>
// import SHService from '@/services/SHService.js'
import RadarChart from '@/obstypes/RadarChart.vue'
export default {
  data() {
    return {
      radar: {
        size: '800', // pixel unit
        viewbox: '1100', // unit used inside the svg (here 400px = 1000 unités)
        radius: '300', // same unit than above (diamètre = 900), keep the radius < (viewbox / 2)
        structure: {
          external: {
            // external stroke of the structure's polygon
            strokeColor: 'rgba(0, 0, 0, 1)', // color (any css format is usable (hexa, rgb, rgba...))
            strokeWidth: '4' // pixel unit
          },
          internals: {
            // internals stroke of the structure's polygon (one every 10%)
            strokeColor: '#FFF', // color (any css format is usable (hexa, rgb, rgba...))
            strokeWidth: '1' // pixel unit
          },
          average: {
            // average polygon (placed at 50%)
            strokeColor: 'rgba(0, 0, 0, 1)', // stroke color (any css format is usable (hexa, rgb, rgba...))
            strokeWidth: '1', // pixel unit
            fillColor: 'rgba(0, 0, 0, .1)' // polygon color (any css format is usable (hexa, rgb, rgba...))
          }
        },
        lines: {
          // lines from center to summits
          strokeColor: 'rgba(0, 0, 0, .6)', // color (any css format is usable (hexa, rgb, rgba...))
          strokeWidth: '2' // pixel unit
        }
      },
      scale: {
        // scales of corresponding statistic
        grass: 100, // key must be equal to the corresponding statistic, lowercased and without accents
        animal: 100,
        convenience: 100
      },
      stats: [
        {
          name: 'grass', // string
          value: 56, // int
          shortName: 'grass'
        },
        {
          name: 'animal',
          value: 77,
          shortName: 'animal'
        },
        {
          name: 'convenience',
          value: 25,
          shortName: 'convenience'
        }
      ],
      polycolor: '#7307D3' // color (any css format is usable (hexa, rgb, rgba...))
    }
  },
  components: {
    RadarChart
  },
  methods: {}
}
</script>

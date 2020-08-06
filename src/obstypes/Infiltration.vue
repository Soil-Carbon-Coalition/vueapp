<template>
  <b-container>
    <p>How many infiltration rings are you using? Because of the variability of this measurement, we recommend timing at least 3 in a small area, and 5 is even better, with multiple timings of an inch of water.</p>

    <b-form inline v-if="!this.numSelected">
      <b-form-group>
        <input id="input" type="number" v-model.number="num_rings" placeholder="how many?" />
        <b-button
          type="submit"
          class="ml-3"
          @click="this.renderArray"
          variant="dark"
        >Set up stopwatches</b-button>
      </b-form-group>
    </b-form>
    <div v-if="this.numSelected">
      <Stopwatch v-for="n in num_rings" :key="n" :n="n"></Stopwatch>
    </div>
  </b-container>
</template>

<script>
import Stopwatch from '@/obstypes/Stopwatch.vue'
export default {
  components: {
    Stopwatch
  },
  data() {
    return {
      numSelected: false,
      timings: [],
      num_rings: Number
    }
  },

  methods: {
    renderArray() {
      this.numSelected = true
    }
  }
}
</script>


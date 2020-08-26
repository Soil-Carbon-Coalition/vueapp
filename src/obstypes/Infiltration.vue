<template>
  <b-container>
    <div>
      <b-button
        class="w-50 m-4"
        size="lg"
        v-b-modal.how-to-infiltration
        variant="info"
      >Review the procedure</b-button>

      <b-modal id="how-to-infiltration" title="Water infiltration" ok-only>
        <p class="my-4">
          <b>How long does it take an inch of water to soak into soil?</b> Because of the variability of this measurement, we recommend concurrent timings of at least 3 rings in a small area, and 4 or 5 are even better, with
          <i>multiple timings of an inch of water.</i> Drive sharpened rings straight into soil halfway, or at least 2 inches. With your fingertips, tamp or firm any cracks along the inside of the ring. Number your rings, at least mentally. Place plastic sheet on soil surface, pour measured 1 inch of water for your ring onto plastic, gently pull the sheet aside, and start the stopwatch for that ring. Stop it when half the soil surface is exposed. If you make an error, you can edit the timings, including adding ++ to a timing if the last inch has not yet infiltrated.
        </p>
      </b-modal>
      <b-modal id="confirm" title="Confirm infiltration data is complete" ok-only>
        <p class="my-4">Is your data complete?</p>
      </b-modal>
    </div>

    <b-form inline v-if="!this.numSelected" @submit.prevent>
      <b-form-group label="How many infiltration rings are you using?">
        <b-form-input type="number" v-model.number="num_rings" placeholder="how many?" size="lg" />
        <b-button
          type="submit"
          class="m-3"
          @click="this.renderArray"
          variant="primary"
          size="lg"
        >Set up stopwatches</b-button>
      </b-form-group>
    </b-form>
    <div v-if="this.numSelected">
      <Stopwatch v-for="n in num_rings" :key="n" :n="n" ref="stopwatch"></Stopwatch>
    </div>
    <b-form-group label="Date">
      <b-form-datepicker v-model="date" placeholder="choose date" size="lg" />
    </b-form-group>
    <b-form-group label="Site description">
      <b-form-input
        id="input"
        type="text"
        v-model="siteDescription"
        placeholder="cover, moisture, known history"
        size="lg"
      />
    </b-form-group>
    <b-button @click="collectData">Collect Data</b-button>
  </b-container>
</template>

<script>
import Stopwatch from '@/obstypes/Stopwatch.vue'
import SHService from '@/services/SHService.js'
export default {
  components: {
    Stopwatch
  },
  data() {
    return {
      numSelected: false,
      num_rings: null,
      date: null,
      siteDescription: ''
    }
  },
  computed: {
    ringsData() {
      var rings = []
      for (var i = 0; i < this.$refs.stopwatch.length; i++) {
        rings.push(this.$refs.stopwatch[i].ringData)
      }
      return rings
    }
  },
  methods: {
    renderArray() {
      if (this.num_rings > 0) {
        this.numSelected = true
      } else {
        alert('You must enter 1 or more')
      }
    },
    collectData() {
      this.$bvModal.show('confirm')

      var rings = []
      for (var i = 0; i < this.$refs.stopwatch.length; i++) {
        rings.push(this.$refs.stopwatch[i].ringData)
      }
      var obs = {}
      obs.site = this.$store.getters.currentSite.id
      obs.project = this.$store.getters.currentProject.id
      obs.observer = this.$store.getters.authUser.id
      obs.obs_type = 19
      obs.kv = {}
      obs.kv.siteDescription = this.siteDescription
      obs.kv.ringdata = rings
      obs.kv.date = this.date
      obs = JSON.parse(JSON.stringify(obs))
      SHService.postObs(JSON.stringify(obs))
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log('There was an error', error.response)
        })
    }
  }
}
</script>

<template>
  <b-container v-if="!loading">
    <b-row>
      <h3>{{ feature.properties.Label }} on {{ feature.properties.Site }}</h3>
    </b-row>
    <b-row>
      <table width="50vw">
        <tr v-for="(value, name, index) in feature.properties" :key="index">
          <td v-if="value">
            <b>{{ name }}:</b>
          </td>
          <td v-if="value">{{ value }}</td>
        </tr>
      </table>

      <BaseFeatureMap v-if="!loading" :feature="feature"></BaseFeatureMap>
    </b-row>
    <b-row></b-row>
  </b-container>
</template>
<script>
import SHService from '@/services/SHService.js'
import Nprogress from 'nprogress'
export default {
  props: ['id'],
  data() {
    return {
      feature: {},
      loading: true,
      errored: false
    }
  },
  created() {
    Nprogress.start()
    SHService.getObs(this.id)
      .then(response => {
        this.feature = response.data
        Nprogress.done()
      })
      .catch(error => {
        console.log('There was an error', error.response)
        Nprogress.done()
        if (error.response && error.response.status == 404) {
          this.$router.push({
            name: '404',
            params: { resource: 'observation' }
          })
        } else {
          this.$router.push({ name: 'network-issue' })
        }
      })
      .finally(() => (this.loading = false))
  }
}
</script>
<style scoped>
tr,
td {
  padding: 12px;
}
tr:nth-child(even) {
  background-color: rgba(240, 240, 240, 0.6);
}
</style>

/* eslint-disable vue/require-v-for-key */
<template>
  <div>
    <input v-model="search" type="text" />

    <div v-for="continent in filtered" :key="continent">
      <h4>{{ continent.name }}</h4>
      <ul class="country-list">
        <li v-for="country in continent.countries" :key="country.name">{{ country.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      search: '',
      continents: [
        {
          name: 'South America',
          countries: [
            {
              name: 'Paraguay',
              cities: ['Ascension', 'Luque']
            },
            {
              name: 'Chile',
              cities: ['Santiago', 'Iquique']
            }
          ]
        },
        {
          name: 'North America',
          countries: [
            {
              name: 'Costa Rica',
              cities: ['Cartago', 'Jaco']
            },
            {
              name: 'Mexico',
              cities: ['DF', 'Guadalajara', 'Puebla']
            }
          ]
        }
      ]
    }
  },
  computed: {
    filtered() {
      // let regex = /this.search/gi
      return this.continents
        .map(continent =>
          Object.assign({}, continent, {
            countries: continent.countries.filter(country => {
              return country.name.match(new RegExp(this.search, 'i'))
            })
          })
        )
        .filter(continent => continent.countries.length)
    }
  }
}
</script>

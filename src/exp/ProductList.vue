<template>
  <div>
    <h4>This is the product list:</h4>
    <p>{{ getProductById(4) }}</p>
    <ul>
      <li v-for="product in saleProducts" :key="product.id">
        <span>{{ product.name }} (price: ${{ product.price }})</span>
      </li>
    </ul>
    <input type="number" v-model.number="incrementBy" />
    <button @click="incrementPrice(incrementBy)">Increment Prices</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      incrementBy: 0
    }
  },
  computed: {
    ...mapState(['products']),
    ...mapGetters(['getProductById', 'saleProducts', 'cheapProducts'])
    // getProduct() {
    //   return this.$store.getters.getProductById
    // },
    // products() {
    //   return this.$store.state.products
    // },
    // saleProducts() {
    //   return this.$store.getters.saleProducts
    // },
    // cheapProducts() {
    //   return this.$store.getters.cheapProducts
    // }
  },
  methods: {
    incrementPrice() {
      this.$store.dispatch('incrementPrice', this.incrementBy)
    }
  }
}
</script>

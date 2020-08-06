<template>
  <b-card border-variant="primary" class="mb-2">
    <p>
      ring
      <span class="num">{{ n }}</span>
    </p>
  </b-card>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.num {
  font-size: 200%;
}
</style>

<template>
  <div>
    <form @submit.prevent="createKV">
      <strong>key1:</strong>
      <input type="text" class="form-control" v-model="kv.key1" />
      <strong>value1:</strong>
      <input type="number" class="form-control" v-model="kv.val1" />
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
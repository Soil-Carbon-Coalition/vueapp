<template>
  <div>
    <h1>Outbox</h1>
    <p>This is will show an array in localForage AND store of site and observation objects to sync or upload, or continue editing</p>
    <p>SYNC button for making AXIOS POST request (singly or for all) and return success or error</p>
    <p>iF success, remove from outbox and store</p>
    <p>
      See
      https://medium.com/daily-now/optimistic-offline-first-apps-with-vuex-d8a412e105a7
      and
      https://netterminalmachine.com/blog/2018/persisting-a-vuex-store-to-indexed-db
    </p>
  </div>
</template>

<script>
export default {
  // props: object, array?
}
</script>

<style scoped>
</style>

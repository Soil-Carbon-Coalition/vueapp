<template>
  <b-container v-if="!loading">
    <h3>{{ post.title }}</h3>

    <p>
      <a :href="this.post.link">{{ post.link }}</a>
    </p>
    <p>
      posted by
      <b>{{ post.author }}</b>
      on {{ post.date }}
    </p>
    <div v-html="this.post.body"></div>
    <!-- LIST PROJECT RESOURCES AND MAPS? -->
  </b-container>
</template>
<script>
import SHService from '@/services/SHService.js'
export default {
  props: ['id'],
  data() {
    return {
      post: Object,
      loading: true
    }
  },
  mounted() {
    SHService.getPost(this.id)
      .then(response => (this.post = response.data))
      .catch(error => {
        console.log('There was an error', error.response)
        if (error.response && error.response.status == 404) {
          this.$router.push({
            name: '404',
            params: { resource: 'post' }
          })
        } else {
          this.$router.push({ name: 'network-issue' })
        }
      })
      .finally(() => (this.loading = false))
  }
}
</script>

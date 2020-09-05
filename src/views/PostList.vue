<template>
  <b-container>
    <b-row>
      <h3>
        <span v-if="!loading" style="color:blue">{{ filteredPosts.length }}</span>
        posts with matching text
      </h3>
    </b-row>
    <b-row v-if="!loading">
      <p>Enter any search term to filter list of posts</p>

      <div>
        <b-form inline @submit.prevent>
          <b-input v-model="search" class="m-3" placeholder="Search" type="search"></b-input>

          <b-button class="m-3" variant="info" @click="modalShow = !modalShow">Search tips</b-button>
        </b-form>
        <b-card v-for="post in filteredPosts" :key="post.id" header-tag="header">
          <template v-slot:header>
            <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
              <h3 class="m-2">{{ post.title }}</h3>
              <p>by {{ post.author }} on {{ post.date }} for {{ post.project }} project</p>
            </router-link>
          </template>
          <div v-html="post.body"></div>
        </b-card>
      </div>
    </b-row>
    <b-row>
      <div>
        <b-modal v-model="modalShow" ok-only>
          <template v-slot:modal-title>Search tips</template>
          <template
            v-slot:default
          >This offers a simple text-based search, not case-sensitive. Enter your term such as date (YYYY-MM-DD) such as 2020-05-24.</template>
        </b-modal>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import SHService from '@/services/SHService.js'
import store from '@/store/store.js'
import Nprogress from 'nprogress'

export default {
  name: 'PostList.vue',

  data() {
    return {
      loading: true,
      modalShow: false,
      search: '',
      posts: Array
    }
  },
  computed: {
    axiosParams() {
      const params = new URLSearchParams()
      params.append('project_id', this.$store.state.project.id)
      // params.append('type_id', 19)
      return params
    },
    filteredPosts() {
      return this.posts.filter(post => {
        return JSON.stringify(post).match(new RegExp(this.search, 'i'))
      })
    }
  },

  methods: {
    get_posts() {
      Nprogress.start()
      SHService.getPosts({ params: this.axiosParams })
        .then(response => {
          this.posts = response.data
          console.log(this.posts)
          Nprogress.done()
        })
        .catch(error => {
          console.log('There was an error:', error.response)
          Nprogress.done()
          this.$router.push({ name: 'network-issue' })
          // the following adds a notification with the namespaced module in the Vuex store
          const notification = {
            type: 'error',
            message:
              'There was a problem fetching observations: ' + error.message
          }
          store.dispatch('notification/add', notification, { root: true })
        })
        .finally(() => (this.loading = false))
    }
  },
  mounted() {
    this.get_posts()
  }
}
</script>

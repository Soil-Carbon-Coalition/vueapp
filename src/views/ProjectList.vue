<template>
  <b-container>
    <b-row>
      <h3>
        <span v-if="!loading" style="color:blue">{{ filteredProjects.length }}</span>
        projects with matching text
      </h3>
    </b-row>
    <b-row v-if="!loading">
      <p>Enter any search term to filter list of projects</p>

      <div>
        <b-form inline @submit.prevent>
          <b-input v-model="search" class="m-3" placeholder="Search" type="search"></b-input>

          <b-button class="m-3" variant="info" @click="modalShow = !modalShow">Search tips</b-button>
        </b-form>

        <b-card
          v-for="project in filteredProjects"
          :key="project.id"
          class="p-4"
          border-variant="primary"
        >
          <router-link :to="{ name: 'project-detail', params: { id: project.id } }">
            <h2>{{ project.name }}</h2>
          </router-link>
          <p>
            <em>Geography:</em>
            {{ project.geography }}
          </p>
          <p>
            <em>Description:</em>
            {{ project.description }}
          </p>
          <p>
            <em>Guidelines:</em>
            {{ project.guidelines }}
          </p>
          <div>
            <span>
              <em>Members-only</em>
              : {{ project.members_only }}
            </span>
          </div>
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
  name: 'projectList.vue',

  data() {
    return {
      loading: true,
      modalShow: false,
      search: '',
      projects: []
    }
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        return JSON.stringify(project).match(new RegExp(this.search, 'i'))
      })
    }
  },

  methods: {
    get_projects() {
      Nprogress.start()
      SHService.getProjects()
        .then(response => {
          this.projects = response.data
          Nprogress.done()
        })
        .catch(error => {
          console.log('There was an error:', error.response)
          Nprogress.done()
          this.$router.push({ name: 'network-issue' })
          // the following adds a notification with the namespaced module in the Vuex store
          const notification = {
            type: 'error',
            message: 'There was a problem fetching projects: ' + error.message
          }
          store.dispatch('notification/add', notification, { root: true })
        })
        .finally(() => (this.loading = false))
    }
  },
  mounted() {
    this.get_projects()
  }
}
</script>




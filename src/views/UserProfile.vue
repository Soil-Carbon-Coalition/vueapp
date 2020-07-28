<template>
  <b-container>
    <h1>My profile</h1>
    <p>
      If you are a participant or member in more than one project, you may choose a different default project that you will be directed to on login.
      You must be online and logged in to do this.
    </p>

    <b-form @submit="onSubmit">
      <b-form-group
        label="Your default project"
        label-for="project-select"
        description="This is the project whose page you will go to when you log in."
      >
        <b-form-select
          id="project-select"
          v-model="selectedProject"
          :options="this.$store.state.user.user_projects"
        ></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary" class="m-3">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import SHService from '@/services/SHService.js'
export default {
  data() {
    return {
      userData: {
        selectedProject: null,
        user_location: ''
      }
    }
  },
  methods: {
    onSubmit() {
      SHService.putUser()
    }
  }
  //get project list, default project from store
  //make POST request to db
}
</script>

<style>
</style>
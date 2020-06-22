<template>
  <b-container>
    <b-row align-h="center" class="mt-5">
      <b-col cols="5">
        <b-card class="p-3">Login</b-card>
        <form @submit.prevent="submit">
          <input
            v-model="inputs.email"
            type="text"
            id="email"
            placeholder="email"
          />
          <input
            v-model="inputs.password"
            type="password"
            id="password"
            placeholder="password"
          />
        </form>
        <button @click="login(inputs)" id="login-button">
          login
        </button>
        <div>
          <router-link to="/register">create account</router-link> |
          <router-link to="/password_reset">reset password</router-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

// mostly from https://github.com/jakemcdermott/vue-django-rest-auth/blob/master/client/src/views/Login.vue
export default {
  data() {
    return {
      inputs: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login({ email, password }) {
      this.$store
        .dispatch('auth/login', { email, password })
        .then(() => this.$router.push('/'))
    }
  }
}
</script>

<style scoped>
body {
  background: #eef1f4;
}
</style>

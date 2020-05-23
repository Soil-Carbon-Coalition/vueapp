<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/" small>
        <BIconHouse />&nbsp;soilhealth.app
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="inbox" v-if="$store.state.inbox.length > 0">
            <BIconDownload variant="light" v-b-tooltip.hover title="Observations downloaded" />
            <span style="color:magenta">({{ $store.state.inbox.length }})</span>
          </b-nav-item>
          <b-nav-item to="outbox" v-if="$store.state.outbox.length > 0">
            <BIconUpload variant="light" v-b-tooltip.hover title="Observations not yet uploaded" />
            <span style="color:magenta">({{ $store.state.outbox.length }})</span>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form v-if="!$store.state.project.name == ''">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Menu" right>
            <b-dropdown-item to="/projects">Projects</b-dropdown-item>
            <b-dropdown-item to="/observations">Observations</b-dropdown-item>
            <b-dropdown-item to="/sites">Sites</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="this.$store.state.user">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="/logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {}
</script>
<style scoped>
.navbar-brand {
  font-size: 1rem;
}
</style>
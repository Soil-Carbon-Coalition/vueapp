<template>
  <b-container>
    <vue-editor v-model="content"></vue-editor>
    <b-button variant="primary" @click="saveContent">Save Contents</b-button>
  </b-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
// import SHService from '@/services/SHService.js'

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: null
    }
  },
  methods: {
    setEditorContent: function() {
      this.content = '<h1>Html For Editor</h1><p>This is a pragraph</p>'
    },
    saveContent: function() {
      // You have the content to save
      console.log(this.content)
    }
  }
}
</script>

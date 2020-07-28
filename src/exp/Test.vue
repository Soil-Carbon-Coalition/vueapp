<template>
  <b-container fluid>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Event name" label-for="input-1" description="think of a good one">
        <b-form-input
          id="input-1"
          type="text"
          v-model="form.name"
          placeholder="event name"
          trim
          required
        />
      </b-form-group>
      <b-form-group
        label="Event description:"
        label-for="input-2"
        description="purpose and description"
      >
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          size="lg"
          rows="5"
          placeholder="event purpose and description"
          required
        />
      </b-form-group>
      <b-form-group label="number attending" label-for="input-3">
        <b-form-input
          id="input-3"
          label="Number attending"
          type="number"
          v-model="form.number_attending"
          placeholder="0"
        />
      </b-form-group>
      <b-form-group label="date" label-for="input-4" description="date of event">
        <b-form-datepicker id="input-4" v-model="form.date" class="mb-2"></b-form-datepicker>
        <p>Value: '{{ form.date }}'</p>
      </b-form-group>
      <b-button type="submit" variant="primary" class="m-3">Submit</b-button>
      <b-button type="reset" variant="danger" class="m-3">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        number_attending: null,
        date: ''
      },
      show: true,
      mycomponent: {
        name: 'SimpleForm',
        template: `
          <form action @submit.prevent = "submit">
          <input name="first" type="text" v-model="first">
          <label for "first" class="active">First Name</label>
          <input name="last" type="text" v-model="last">
          <label for "last">Last Name</label>
          <button type="submit">Submit></button></form>
            `,
        data: { first: 'Pete', last: 'Donvan' },
        script: `
          window.SimpleForm = {
            methods: {
              submit() {
                console.log(this.first + '' this.last)
              }
            }
            }`
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.description = ''
      this.form.number_attending = null
      this.form.date = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

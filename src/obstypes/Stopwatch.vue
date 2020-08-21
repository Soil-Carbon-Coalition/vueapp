<template>
  <div class="stopwatch">
    <div>
      <b-form-group label="Briefly describe soil surface, cover:">
        <b-form-input
          type="text"
          v-model="surface"
          placeholder="soil surface (required)"
          size="lg"
          required
        />
      </b-form-group>
    </div>
    <div :class="timerclass" @click="toggle">
      <b-badge pill variant="light">{{ n }}</b-badge>
      <div class="toggletext">{{ toggletext }}</div>
      <div class="clocktext">
        <span>{{ clocktext }}</span>
      </div>
    </div>
    <div class="timings">
      <b-form-input
        type="text"
        v-model="timings"
        placeholder="timings will be recorded here"
        size="lg"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      ringname: 'ring' + this.n,
      timings: '',
      surface: '',
      clock: null,
      running: false,
      key: 0,
      clocktext: '00:00',
      toggletext: 'START',
      classname: 'time'
    }
  },
  computed: {
    timerclass() {
      return this.running ? 'timer timer-running' : 'timer'
    },
    ringData() {
      return {
        ring: this.n,
        surface: this.surface,
        timings: this.timings
      }
    }
  },
  methods: {
    pad(val) {
      // pads values with zero
      return val > 9 ? val : '0' + val
    },
    formatTime(time) {
      var m = Math.floor(time / 60)
      var s = time % 60
      return this.pad(m) + ':' + this.pad(s)
    },

    toggle() {
      if (this.running) {
        this.stop()
        this.toggletext = 'START'
      } else {
        this.start()
        this.toggletext = 'STOP'
      }
    },
    start() {
      this.key += 1
      localStorage.setItem(
        'start' + this.n + 'ring' + this.key,
        new Date().getTime()
      )
      this.clock = setInterval(() => {
        var time = Math.floor(
          (new Date().getTime() -
            localStorage.getItem('start' + this.n + 'ring' + this.key)) /
            1000
        )
        this.clocktext = this.formatTime(time)
      }, 1000)

      this.running = true
    },
    stop() {
      clearInterval(this.clock)
      var elapsed = Math.floor(
        (new Date().getTime() -
          localStorage.getItem('start' + this.n + 'ring' + this.key)) /
          1000
      )
      this.timings += this.formatTime(elapsed)
      this.timings += ', '
      localStorage.removeItem('start' + this.n + 'ring' + this.key)
      this.running = false
      this.clock = null
      this.clocktext = '00:00'
    }
  }
}
</script>

<style scoped>
.stopwatch {
  border-radius: 10px;
  border: 5px solid;
  padding: 3px;
  margin: 2px;
}
.ringnumber {
  background-color: #ff0;
}
.timer {
  border-radius: 20px;
  background: rgb(255, 80, 80);
  border: 5px solid;
  padding: 5px;
  margin: 2px;
  width: 220px;
  height: 130px;
  font-size: 54px;
  font-weight: bold;
  font-family: sans-serif;
  cursor: pointer;
  display: block;
}
.timer-running {
  background: #8bd12a;
}
.toggletext {
  font-size: 36px;
  display: block;
  position: relative;
  left: 75px;
  bottom: 80px;
}
.clocktext {
  font-size: 42px;
  position: relative;
  left: 70px;
  bottom: 72px;
  display: block;
}
.timings {
  font-size: 22px;
  padding: 2px;
  margin: 2px;
  font-weight: bold;
  display: inline;
  position: relative;
}
</style>

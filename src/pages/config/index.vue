<template>
  <div id="app">
    <lottie
      :options="options"
      :height="300"
      :width="300"
      @animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import * as animationData from '@/assets/json/quiz_wait.json'

export default {
  name: 'SwitchLottie',
  components: {
    lottie: Lottie,
  },
  data() {
    return {
      options: { animationData: animationData.default },
      animationSpeed: 1,
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

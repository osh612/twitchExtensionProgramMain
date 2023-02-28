<template>
  <div :style="style" ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'Lottie-componant',
  watch: {
    options(newVal) {
      this.loadAnimation(newVal)
    },
  },

  props: {
    options: {
      type: Object,
      required: true,
    },
    height: Number,
    width: Number,
  },
  data() {
    return {
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
      anim: null,
    }
  },

  methods: {
    loadAnimation(options) {
      if (this.anim) {
        this.anim.destroy()
      }
      this.anim = lottie.loadAnimation({
        container: this.$refs.lavContainer,
        renderer: 'svg',
        loop: options.loop !== false,
        autoplay: options.autoplay !== false,
        animationData: options.animationData,
        rendererSettings: options.rendererSettings,
      })
    },
  },

  mounted() {
    this.loadAnimation(this.options)
  },
}
</script>

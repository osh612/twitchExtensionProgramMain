<template>
  <div class="component-kill-result-video result_action" v-if="isVideoActive">
    <video
      v-for="(url, idx) in videoUrls"
      :key="url"
      :src="url"
      v-show="isShowVideoTag(idx)"
      width="300"
      class="kill-video"
      ref="quizResultVideo"
      preload="auto"
    ></video>
    <!-- height="147" -->
  </div>
</template>

<script>
import ViewerQuizResultService from '@/scripts/service/viewer-quiz-result-service'
import store from '@/vuex/store'

const deathVideoUrl = require('@/assets/videos/death.webm')
const singleKillVideoUrl = require('@/assets/videos/singleKill.webm')
const doubleKillVideoUrl = require('@/assets/videos/doubleKill.webm')
const tripleKillVideoUrl = require('@/assets/videos/tripleKill.webm')
const quadraKillVideoUrl = require('@/assets/videos/quadraKill.webm')
const pentaKillVideoUrl = require('@/assets/videos/pentaKill.webm')
const hexaKillVideoUrl = require('@/assets/videos/hexaKill.webm')
const heptaKillVideoUrl = require('@/assets/videos/heptaKill.webm')
const octaKillVideoUrl = require('@/assets/videos/octaKill.webm')
const nonaKillVideoUrl = require('@/assets/videos/nonaKill.webm')
const decaKillVideoUrl = require('@/assets/videos/decaKill.webm')

export default {
  name: 'KillResultVideo',

  props: {
    kills: {
      type: Number || null,
      default: null,
    },

    isAttend: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    playVideo() {
      if (!this.isAttend) {
        return
      }
      this.isVideoActive = true
      if (store.state.isDeath) {
        this.$nextTick(() => {
          this.$refs.quizResultVideo[0].play()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.quizResultVideo[this.kills].play()
        })
      }
      ViewerQuizResultService.start(() => {
        this.isVideoActive = false
      })
    },

    isShowVideoTag(idx) {
      if (store.state.isDeath) {
        return idx === 0
      }
      return this.kills === idx
    },
  },

  data() {
    return {
      videoUrls: [
        deathVideoUrl,
        singleKillVideoUrl,
        doubleKillVideoUrl,
        tripleKillVideoUrl,
        quadraKillVideoUrl,
        pentaKillVideoUrl,
        hexaKillVideoUrl,
        heptaKillVideoUrl,
        octaKillVideoUrl,
        nonaKillVideoUrl,
        decaKillVideoUrl,
      ],
      isVideoActive: false,
    }
  },
}
</script>

<style scoped lang="scss">
.result_action {
  position: absolute;
  top: 3.375rem;
  left: 5.813rem;
}
</style>

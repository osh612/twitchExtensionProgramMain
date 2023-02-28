<template>
  <div class="drop_icon_wrap" :class="{ active: isActive }">
    <SvgAIWithHexagonal class="SvgTrophyWithHexagonal" />
  </div>
</template>

<script>
import SvgAIWithHexagonal from './svgs/SvgAIWithHexagonal.vue'
export default {
  name: 'AiIcon',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  components: { SvgAIWithHexagonal },
}
</script>

<style scoped lang="scss"></style>

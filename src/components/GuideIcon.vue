<template>
  <div class="drop_icon_wrap" :class="{ active: isActive }">
    <SvgIconGuide />
  </div>
</template>

<script>
import SvgIconGuide from './svgs/SvgIconGuide.vue'

export default {
  name: 'RankIcon',
  components: { SvgIconGuide },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss"></style>

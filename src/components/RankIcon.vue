<template>
  <div class="drop_icon_wrap" :class="{ active: isActive }">
    <SvgSquareThrophy class="SvgSquareThrophy" />
  </div>
</template>

<script>
import SvgSquareThrophy from './svgs/SvgSquareThrophy.vue'

export default {
  name: 'RankIcon',
  components: { SvgSquareThrophy },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss"></style>

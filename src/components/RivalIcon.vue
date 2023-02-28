<template>
  <div class="drop_icon_wrap" :class="{ active: isActive }">
    <SvgIconRival class="SvgSquareThrophy" />
  </div>
</template>

<script>
import SvgIconRival from './svgs/SvgIconRival.vue'

export default {
  name: 'RankIcon',
  components: { SvgIconRival },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss"></style>

<template>
  <div class="drop_icon_wrap" :class="{ active: isActive }">
    <SvgIconPrediction />
  </div>
</template>

<script>
import SvgIconPrediction from './svgs/SvgIconPrediction.vue'

export default {
  name: 'RankIcon',
  components: { SvgIconPrediction },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss"></style>

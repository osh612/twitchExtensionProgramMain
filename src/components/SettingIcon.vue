<template>
  <div class="drop_icon_wrap" :class="{ active: isActive }">
    <SvgIconSetting />
  </div>
</template>

<script>
import SvgIconSetting from './svgs/SvgIconSetting.vue'

export default {
  name: 'RankIcon',
  components: { SvgIconSetting },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss"></style>

<template>
  <div class="drop_icon_wrap" :class="{ active: isActive }">
    <div class="drop_icon">
      <SvgTrophyWithHexagonal class="SvgTrophyWithHexagonal" />
    </div>
    <div class="drop_icon_title">
      <span>응원하기</span>
      <span v-if="this.cheerPoolState !== 'reserving'" id="spanClosed"
        >closed</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SvgTrophyWithHexagonal from './svgs/SvgTrophyWithHexagonal'

export default {
  name: 'RankIcon',
  components: { SvgTrophyWithHexagonal },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState({
      cheerPoolState: state => state.cheerPoolState,
    }),
  },
}
</script>

<style scoped lang="scss">
#spanClosed {
  align-items: center;
  margin-left: 5px;
  text-align: left;
  font: normal normal bold 7px/1px Poppins;
  letter-spacing: 0px;
}
</style>

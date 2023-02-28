<template>
  <div class="cheerEnd_wrap" v-if="showModal">
    <div class="cheerEnd_background_box">
      <SvgCheerEndTooltip />
      <span>응원하기가 마감되었습니다.</span>
    </div>
  </div>
</template>

<script>
import SvgCheerEndTooltip from '../../../components/svgs/SvgCheerEndTooltip.vue'
export default {
  data() {
    return { showModal: false }
  },
  components: { SvgCheerEndTooltip },
}
</script>

<style lang="scss" scoped>
.cheerEnd_wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  .cheerEnd_background_box {
    width: 206px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    text-align: center;
    background: transparent linear-gradient(180deg, #1f1f1f 0%, #404040 100%);

    span {
      margin-left: 5px;
    }
  }
}
</style>

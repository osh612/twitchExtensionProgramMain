<template>
  <div class="setting_wrap">
    <div class="setting_header">
      <SvgMiniDecakill />
      <span>설정</span>
    </div>
    <div class="setting_content">
      <div class="setting one">
        <div class="left">
          <span>퀴즈 팝업 자동 출력</span>
        </div>
        <toggle-button
          :value="autoQuizPopUp"
          @change="autoQuizPopUpHandler"
          color="#AF51FF"
          :width="32"
          :height="18"
        />
      </div>
      <div class="setting two">
        <span>퀴즈 팝업 위치 변경 초기화</span>
        <button @click="callParent">기본값</button>
      </div>
      <!-- <div class="setting three"></div>
      <div class="setting four"></div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SvgMiniDecakill from '../../components/svgs/SvgMiniDecakill.vue'
export default {
  name: 'Setting-viewer',
  components: { SvgMiniDecakill },
  data() {
    return {}
  },
  props: [],
  created() {},
  mounted() {},
  computed: {
    ...mapState({
      autoQuizPopUp: state => state.autoQuizPopUp,
    }),
  },
  methods: {
    autoQuizPopUpHandler() {
      if (this.autoQuizPopUp === false) {
        this.$store.commit('AUTOQUIZPOPUP', true)
      } else {
        this.$store.commit('AUTOQUIZPOPUP', false)
      }
    },
    callParent() {
      this.$emit('resetPosition')
    },
  },
}
</script>

<style lang="scss" scoped>
.setting_wrap {
  width: 19.875rem;
  height: 7.9rem;
  padding: 17px;
  background-color: #000;
  .setting_header {
    font-size: 12px;
    font-weight: bold;
    padding: 2.5px 0px 2.5px 0px;
    margin-bottom: 7px;
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
    }
  }
  .setting_content {
    display: flex;
    flex-direction: column;
    width: 17.75rem;
    align-items: center;
    justify-content: center;
    .setting {
      width: 100%;
      height: 2.063rem;
      background-color: #222;
      display: flex;
      align-items: center;
      padding: 0px 12px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      font-size: 11px;

      &.one {
        margin-bottom: 4px;
      }
      .left {
        display: flex;

        span {
          font-size: 11px;
        }
      }
      &.two button {
        background-color: #444;
        color: #fff;
        font-size: 11px;
        width: 48px;
        height: 18px;
        border: none;
        border-radius: 1px;
        cursor: pointer;
        font-family: 'Noto Sans KR', sans-serif;
        line-height: 11px;
        font-weight: normal;

        &:hover {
          background-color: #555;
        }
        &:active {
          background-color: #666;
          box-shadow: inset 0px 0px 1px 1px #222;
        }
      }
    }
  }
}
</style>

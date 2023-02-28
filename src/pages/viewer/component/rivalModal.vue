<template>
  <div class="rivalModal_wrap" v-if="rivalModalState" @click="closeModal">
    <div class="rivalModal_content_box">
      <SvgTooltipIcon />
      <div class="rivalModal_content">{{ this.rivalModalText }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SvgTooltipIcon from '../../../components/svgs/SvgTooltipIcon.vue'

export default {
  name: 'rivalModal',
  components: { SvgTooltipIcon },
  data() {
    return {
      max: 75,
      cheerText: '',
    }
  },
  props: [],
  created() {},
  mounted() {},
  computed: {
    ...mapState({
      rivalModalText: state => state.rivalModalText,
      rivalModalState: state => state.rivalModalState,
    }),
  },
  methods: {
    closeModal() {
      this.$store.commit('RIVALMODALSTATE', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.rivalModal_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  cursor: pointer;

  .rivalModal_content_box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    background: linear-gradient(180deg, #1f1f1f 10%, #404040 90%);
    padding: 12px 10px;
    text-align: center;
    font-size: 10px;
    font-weight: normal;
    color: #fff;
    z-index: 2;

    & > svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }
  }
}
</style>

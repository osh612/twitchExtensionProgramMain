<template>
  <div class="cheerPool-wrap">
    <CheerModal />
    <div class="cheerIconWrap">
      <SvgCheerPoolHeaderIcon />
    </div>
    <div class="cheerPool_header">
      <div class="cheerPool_header_left">
        <span>응원하기</span>
        <SvgTooltipIcon />
      </div>
      <div class="cheerPool_header_right">
        <span>입력된 글자(</span>
        <span
          class="inputLength"
          v-text="max - (max - cheerText.length)"
        ></span>
        <span>/75)</span>
      </div>
    </div>
    <div class="cheerPool_body">
      <div class="cheerPool_input_wrap">
        <textarea
          type="text"
          class="cheerPool_input"
          :maxlength="max"
          v-model="cheerText"
        ></textarea>
      </div>
      <button
        class="cheer_buttom"
        :class="{ active: cheerActive }"
        @click="reserveCheerPool()"
      >
        <!-- :disabled="cheerEnd" -->
        2,000 비트로 응원하기
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { client, stompPublish } from '../../api/socket/webStompSocket'
import SvgCheerPoolHeaderIcon from '../../components/svgs/SvgCheerPoolHeaderIcon.vue'
import SvgTooltipIcon from '../../components/svgs/SvgTooltipIcon.vue'
import twitchChannelStorage from '../../storage/twitch-channel-storage'
import twitchUidStorage from '../../storage/twitch-uid-storage'
import store from '../../vuex/store'
import CheerModal from './component/cheerModal.vue'
import * as types from '@/vuex/mutation_types'

export default {
  name: 'ai-Prediction',
  components: {
    SvgCheerPoolHeaderIcon,
    SvgTooltipIcon,
    CheerModal,
  },
  data() {
    return {
      max: 75,
      cheerText: '',
    }
  },
  props: [],
  created() {},
  mounted() {
    client.activate()
  },
  computed: {
    cheerActive() {
      return this.cheerText.length > 4 ? true : false
    },
    ...mapState({
      leagueMatchIdx: state => state.leagueMatchIdx,
    }),
  },
  methods: {
    reserveCheerPool() {
      const cheerReserveData = {
        userId: twitchUidStorage.get(),
        broadcastId: twitchChannelStorage.get(),
        leagueMatchIdx: this.leagueMatchIdx,
        sign: this.cheerText,
      }
      //console.log('cheerReserveData', cheerReserveData)
      stompPublish('/send/extension/signboard/reserve', cheerReserveData)
      store.commit(types.FINISH_RESERVE_CHEERPOOL)
    },
  },
}
</script>

<style scoped lang="scss">
.cheerPool-wrap {
  width: 242px;
  height: 160px;
  background-color: #000;
  border: 1px solid #af51f9;
  position: relative;
  padding: 18.5px 18px;

  .cheerIconWrap {
    position: absolute;
    top: -17px;
    left: -17px;
  }

  .cheerPool_header {
    width: 206px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    color: #fff;

    .cheerPool_header_left {
      display: flex;
      align-items: center;
      font-size: 11px;
      font-weight: bold;

      span {
        margin-right: 3px;
      }
    }

    .cheerPool_header_right {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      font-size: 11px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: -0.17px;
      padding-bottom: 1px;
      font-family: 'Noto Sans KR', sans-serif;
      .inputLength {
        color: #f55400;
      }
    }
  }

  .cheerPool_body {
    width: 206px;
    height: 102px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .cheerPool_input_wrap {
      width: 100%;
      height: 76%;
      background-color: #333333;
      padding: 5px 8px;
      box-sizing: border-box;

      .cheerPool_input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;
        resize: none;
        background-color: transparent;
        color: #fff;
        font-size: 11px;
        line-height: 15px;
        font-weight: normal;
        letter-spacing: -0.17px;
        font-family: 'Noto Sans KR', sans-serif;

        &:focus {
          outline: none;
          border: none;
        }
      }
    }

    button {
      height: 20%;
      background-color: #333333;
      color: #9d9d9d;
      border: none;
      border-radius: 2px;
      font-size: 11px;
      line-height: 11px;
      font-weight: normal;
      letter-spacing: -0.17px;
      font-family: 'Noto Sans KR', sans-serif;

      &.active {
        background-color: #af51ff;
        color: #fff;
        cursor: pointer;
      }

      &:disabled {
        background-color: #333333;
        color: #9d9d9d;
        cursor: not-allowed;
      }
    }
  }
}
</style>

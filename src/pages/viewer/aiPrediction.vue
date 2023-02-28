<template>
  <div class="aiPrediction-wrap">
    <div class="aiPrediction-header">
      <p class="aiPrediction_title">실시간 승률</p>
      <div class="aiPrediction-time">
        <svgTimer class="svgTimer" />
        <p v-show="showLoading() === true">{{ timeStamp }}분 기준</p>
        <p v-show="showLoading() === false">예측 대기중</p>
      </div>
    </div>
    <div class="loading_aiPrediction" v-if="showLoading() === false">
      <lottie
        class="loading_icon"
        :options="options1"
        :width="130"
        :height="130"
      />
    </div>
    <div class="aiData-wrap" v-if="showLoading() === true">
      <div class="dataGauge-wrap">
        <div
          class="dataGauge-left"
          :style="{
            width: dataGauge_left + '%',
            background: dataGauge_color_left,
          }"
        >
          <div class="teamData-left">
            <p class="team-left">
              {{ aiPredictionData.slug1 }} {{ dataGauge_left }}%
            </p>
          </div>
        </div>
        <div
          class="dataGauge-right"
          :style="{
            width: dataGauge_right + '%',
            background: dataGauge_color_right,
          }"
        >
          <div class="teamData-right">
            <p class="team-right">
              {{ dataGauge_right }}% {{ aiPredictionData.slug2 }}
            </p>
          </div>
        </div>
      </div>
      <div class="winRateChange-wrap">
        <div class="winRateChange-left">
          <div class="svg-wrap">
            <svgWinRateUp />
          </div>
          <p class="winRate-left">{{ dataGauge_left }}%</p>
        </div>
        <div class="winRateChange-right">
          <div class="svg-wrap">
            <svgWinRateDown />
          </div>
          <p class="winRate-right">{{ dataGauge_right }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/vuex/store'
import Lottie from '@/components/Lottie.vue'
import * as animationData1 from '@/assets/json/rank_load.json'
import SvgTimer from '@/components/svgs/SvgTimer.vue'
import SvgWinRateUp from '@/components/svgs/SvgWinRateUp.vue'
import SvgWinRateDown from '@/components/svgs/SvgWinRateDown.vue'

export default {
  name: 'ai-Prediction',
  components: {
    lottie: Lottie,
    svgTimer: SvgTimer,
    svgWinRateUp: SvgWinRateUp,
    svgWinRateDown: SvgWinRateDown,
  },
  data() {
    return {
      options1: { animationData: animationData1.default },
    }
  },
  props: ['aiPredictionData'],
  created() {},
  mounted() {
    // // // //console.log(this.aiPredictionData)
  },
  computed: {
    dataGauge_left() {
      const data = this.aiPredictionData.realtimeProbTeam1 * 100
      let caculated = data.toFixed(1)
      return caculated
    },
    dataGauge_right() {
      const data = this.aiPredictionData.realtimeProbTeam2 * 100
      let caculated = data.toFixed(1)
      return caculated
    },
    dataGauge_color_left() {
      if (this.dataGauge_left > this.dataGauge_right) {
        let purple = '#6f48f9'
        return purple
      } else {
        let grey = '#333'
        return grey
      }
    },
    dataGauge_color_right() {
      if (this.dataGauge_left < this.dataGauge_right) {
        let purple = '#6f48f9'
        return purple
      } else {
        let grey = '#333'
        return grey
      }
    },
    timeStamp() {
      const calc = Math.floor(this.aiPredictionData.timestamp / 60000)
      return calc
    },
  },
  methods: {
    showLoading() {
      if (
        this.aiPredictionData === null ||
        this.aiPredictionData === undefined ||
        Object.keys(this.aiPredictionData).length === 0
      ) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style scoped lang="scss">
.aiPrediction-wrap {
  width: 250px;
  height: 104px;

  .aiPrediction-header {
    display: flex;
    position: absolute;
    width: 200px;
    top: 15px;
    left: 15px;

    .aiPrediction_title {
      color: #fff;
      font-size: 12px;
    }

    .aiPrediction-time {
      display: flex;
      margin-left: 10px;

      .svgTimer {
        top: 13px;
        left: 100px;
      }

      p {
        color: #888;
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }

  .aiData-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 43px;
    left: 16px;

    height: 46px;
    .dataGauge-wrap {
      display: flex;
      width: 218px;

      .dataGauge-left {
        display: flex;
        align-items: center;
        height: 26px;
        // background: #6f48f9;

        .teamData-left {
          height: 16px;
          display: flex;
          align-items: center;
          margin-left: 11px;
          justify-content: space-between;

          .team-left {
            position: absolute;
            left: 4%;
          }

          p {
            height: 11px;
            font-size: 11px;
            font-weight: bold;
            color: #fff;
          }
        }
      }
      .dataGauge-right {
        display: flex;
        align-items: center;
        height: 26px;
        background: #656565;

        .teamData-right {
          height: 16px;
          display: flex;
          align-items: center;
          margin-right: 11px;
          justify-content: space-between;

          .team-right {
            position: absolute;
            right: 3%;
          }

          p {
            height: 11px;
            font-size: 11px;
            font-weight: bold;
            color: #fff;
          }
        }
      }
    }
  }

  .winRateChange-wrap {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 11px;
      color: #fff;
    }

    .winRate-left {
      color: #8767f9;
    }

    .winRate-right {
      color: #f55400;
    }

    .winRateChange-left {
      display: flex;
    }
    .winRateChange-right {
      display: flex;
    }

    .svg-wrap {
      display: flex;
      align-items: center;
      margin-right: 3px;
    }
  }

  .loading_icon {
    transform: translate(-50%, -40%);
  }
}
</style>

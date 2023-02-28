<template>
  <div class="viewer" ref="viewer">
    <div
      class="decakill_icon_wrap"
      ref="floatingWidget"
      :class="{
        invisible: isInvisibleWhileVideo,
      }"
    >
      <div
        class="menu_icon_hover"
        :class="{ active: isMenuActive }"
        :ranking-icon-position="rankingIconPosition"
      >
        <div class="menu_icon_wrap">
          <AiIcon
            @click.native="handleClickAiIcon"
            v-if="aiPredictionData !== null"
          />
          <RankIcon @click.native="handleClickRankingIcon" />
          <!-- <CheerIcon
              @click.native="handleClickCheerIcon"
              :class="{
                active: this.cheerPoolState === 'reserving',
                disable: this.cheerPoolState !== 'reserving',
              }"
            /> -->
        </div>
      </div>
      <!-- <div class="bubble_wrap" :class="{ active: isMenuActive }">
        <div class="bubble" ref="bubble"> -->
      <!-- [bubbleOn]: isVisibleBubble, -->
      <!-- <div class="bubble_icon_icon_wrap">
            <img :src="$store.getters.getBubbleIcon" class="bubble_icon_icon" />
          </div> -->
      <!-- </div>
        <lottie
          class="index_loading_icon"
          :options="options1"
          :width="80"
          :height="80"
        />
        <div class="bubble_text_wrap">
          <span class="bubble_text">{{ bubble }}</span>
          <span class="bubble_text2">
            {{ bubble2 }} -->
      <!-- 미참여 -->
      <!-- </span>
        </div>
      </div> -->
      <JewelIcon
        :is-invisible="isActiveQuizState"
        @click.native="handleClickJewelIcon"
        class="JewelIcon"
      />
    </div>
    <!-- <StatusBar
      :isMenuActive="isMenuActive"
      :rankingData="rankingData"
      :myRankingData="myRankingData"
      :class="{
        invisible: isInvisibleWhileVideo,
        active: isMenuActive,
      }"
    /> -->
    <KillResultVideo
      :kills="$store.state.kills"
      :is-attend="$store.state.isAttend"
      ref="killResultVideo"
    />
    <vue-resizable
      class="resizable"
      ref="resizableComponent"
      dragSelector=".timerBar"
      :maximize="false"
      @drag:move="handleDragMoveJewel"
      :fitParent="fit"
      :max-width="maxW"
      :min-width="minW"
      :min-height="minH"
      :width="width"
      :height="height"
      :left="left"
      :top="top"
      :active="null"
    >
      <QuizWindow
        :position="jewelPosition"
        :class="{
          active: isActiveQuizState,
        }"
        :auth.sync="auth"
        ref="quizWindow"
      />
    </vue-resizable>
    <div
      class="menu-wrap"
      :class="{ active: isMenuActive, [jewelPosition]: jewelPosition }"
    >
      <div id="tabs">
        <!-- 조건식으로 해당 index에서 active 클래스 넣어주기 -->
        <!-- 클릭시 해당 index 값 currentTab에 넣어줌 -->
        <div class="tab-button-wrap">
          <span
            class="tab-button"
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: currentTab === tab.id }"
            @click="moveRouteTo(tab.id)"
            >{{ tab.name }}</span
          >
        </div>
        <div class="tab-content">
          <!-- button의 클릭된 index값에 따라 각 컴포넌트로 router.replace -->
          <router-view
            :rankingData="rankingData"
            :myRankingData="myRankingData"
          ></router-view>
        </div>
      </div>
      <div id="pop_close" @click="closePop">
        <CloseIconWithBlackGradiant />
      </div>
    </div>
    <div
      class="ai-wrap"
      :class="{ active: isAiActive, [jewelPosition]: jewelPosition }"
    >
      <div class="ai-content">
        <router-view name="aiPrediction" :aiPredictionData="aiPredictionData" />
      </div>
      <div id="pop_close_ai" @click="closePop">
        <CloseIconWithBlackGradiant />
      </div>
    </div>
    <div
      class="cheer-wrap"
      :class="{ active: isCheerActive, [jewelPosition]: jewelPosition }"
    >
      <div class="cheer-content">
        <router-view name="cheerPool" />
      </div>
      <div id="pop_close_cheer" @click="closePop">
        <CloseIconWithBlackGradiant />
      </div>
    </div>
    <div
      class="cheerPoolActive-wrap"
      :class="{ active: isCheerPoolActive, [jewelPosition]: jewelPosition }"
    >
      <CheerPoolActive />
      <div id="pop_close_cheer" @click="handleCheerPoolActive">
        <CloseIconWithBlackGradiant />
      </div>
      <!-- <router-view name="cheerPoolActive" /> -->
    </div>
    <!-- <div class="backback"></div> -->
    <!-- <video src="@/assets/videos/lck_sample.mp4" type="video/mp4"></video> -->
  </div>
</template>
<script>
import store from '@/vuex/store'
import VueResizable from 'vue-resizable'
import JewelIcon from '@/components/JewelIcon'
import RankIcon from '@/components/RankIcon'
// import CheerIcon from '@/components/CheerIcon'
import AiIcon from '@/components/AiIcon'

import TwitchUidStorage from '@/storage/twitch-uid-storage.js'

import ViewerQuizTimerService from '@/scripts/service/viewer-quiz-timer-service.js'
import { mapGetters } from 'vuex'
import * as types from '@/vuex/mutation_types'
import PickCountingService from '@/scripts/service/pick-counting-service'
// import TestRunService from '@/scripts/service/test-run-service'
import RankService from '@/scripts/service/rank-service'
import ViewerQuizJewelService from '@/scripts/service/viewer-quiz-jewel-service'
import ViewerRankingIconService from '@/scripts/service/viewer-ranking-icon-service'
import KillResultVideo from '@/components/KillResultVideo'
import QuizWindow from '@/components/QuizWindow.vue'
import TwitchAuthService from '@/scripts/service/twitch-auth-service'
import ViewerQuizResultService from '@/scripts/service/viewer-quiz-result-service'

import CloseIconWithBlackGradiant from '@/components/svgs/SvgCloseIconWithBlackGradiant'
// import Lottie from '@/components/Lottie.vue'
import * as animationData1 from '@/assets/json/rank_load.json'
import {
  client,
  stompPublish,
  stompSubscribe,
  // stompUnsubscribe,
} from '../../api/socket/webStompSocket'
import twitchChannelStorage from '../../storage/twitch-channel-storage'
// import StatusBar from './statusBar.vue'
import apiTokenStorage from '../../storage/api-token-storage'
import { AISubscribe, clientForAI } from '../../api/socket/webStompForAI'
import twitchUidStorage from '../../storage/twitch-uid-storage'
// import rivalApiService from '../../api/axios/rival-api-service'
import CheerPoolActive from './cheerPoolActive.vue'
// import SvgCheerPoolHeaderIcon from '../../components/svgs/SvgCheerPoolHeaderIcon.vue'

export default {
  name: 'viewer-component',

  components: {
    KillResultVideo,
    CloseIconWithBlackGradiant,
    RankIcon,
    AiIcon,
    VueResizable: VueResizable,
    JewelIcon,
    QuizWindow,
    // lottie: Lottie,
    // StatusBar,
    // CheerIcon,
    CheerPoolActive,
  },

  data() {
    return {
      left: 200,
      top: 400,
      options1: { animationData: animationData1.default },
      currentTab: 'Ranking',
      tabs: [
        {
          name: '랭킹',
          id: 'Ranking',
        },
        {
          name: '라이벌',
          id: 'Rival',
        },
        {
          name: '예측현황',
          id: 'Prediction',
        },
      ],
      aiPredictionData: null,
      jewelPosition: 'bottom-left',
      isMenuActive: false,
      isAiActive: false,
      isCheerActive: false,
      isCheerPoolActive: false,
      maxW: 100,
      minW: 100,
      minH: 100,
      height: 100,
      width: 100,
      fit: true,
      innerHeightChange: window.innerHeight,
      apiToken: apiTokenStorage.get(),
      // channelID: TwitchChannelStorage.get(),
      isCheerMesnuActive: false,
    }
  },
  watch: {
    $route: {
      handler(newRoute) {
        if (this.isMenuFloatedPage) {
          this.isMenuActive = true
          this.currentTab = newRoute.name
          if (
            newRoute.name === 'RivalRanking' ||
            newRoute.name === 'RivalCheckRequest' ||
            newRoute.name === 'RivalAddUser'
          ) {
            this.currentTab = 'Rival'
          }
        } else if (this.isAiFloatedPage) {
          this.isMenuActive = false
          this.isAiActive = true
          this.isCheerActive = false
        } else if (this.isCheerFloatedPage) {
          this.isCheerActive = true
          this.isMenuActive = false
          this.isAiActive = false
        } else {
          this.isMenuActive = false
          this.isAiActive = false
          this.isCheerActive = false
        }
        // this.isAiActive = this.isAiFloatedPage
        // this.isCheerActive = this.isCheerFloatedPage
      },
      immediate: true,
    },
  },
  async created() {
    await this.requestTwitchAuth()
  },

  async mounted() {
    // await this.requestTwitchAuth()
    //console.log(window.location.hostname)
    await this.startQuizOnMounted()
    this.connect()
    // this.connectAISocket()
    //console.log('cheerPoolState', this.cheerPoolState)
  },
  computed: {
    ...mapGetters({
      myRankingData: 'getMyRankData',
      rankingData: 'getRankData',
      quizList: 'getQuizList',
      // bubble: 'getBubble',
      // bubble2: 'getBubble2',
      leagueMatchIdx: 'getLeagueMatchIdx',
      cheerPoolState: 'getCheerPoolState',
      cheerPoolIdx: 'getCheerPoolIdx',
      cheerPoolTimer: 'getCheerPoolTimer',
      cheerPoolText: 'getCheerPoolText',
      cheerPrejectCauseoolIdx: 'getRejectCause',
    }),
    channelID() {
      return twitchChannelStorage.get()
      // return '123123123'
    },
    userId() {
      return twitchUidStorage.get()
    },
    autoPlayToggleValue() {
      return store.getters.getAutoPlayState
    },

    auth() {
      return this.$store.getters.getAuth
    },
    rankingIconPosition() {
      return ViewerRankingIconService.getPosition(this.jewelPosition)
    },
    isMenuFloatedPage() {
      return (
        this.$route.name === 'Ranking' ||
        this.$route.name === 'Prediction' ||
        this.$route.name === 'Rival' ||
        this.$route.name === 'RivalRanking' ||
        this.$route.name === 'RivalCheckRequest' ||
        this.$route.name === 'RivalAddUser'
      )
    },
    isAiFloatedPage() {
      return this.$route.name === 'AiPrediction'
    },
    isCheerFloatedPage() {
      return this.$route.name === 'CheerPool'
    },
    canOpenQuizState() {
      return (
        this.$store.getters.getSt === 'ready' ||
        this.$store.getters.getSt === 'start' ||
        this.$store.getters.getSt === 'process' ||
        this.$store.getters.getSt === 'chosen' ||
        this.$store.getters.getSt === 'result2' ||
        this.$store.getters.getSt === 'resultBeforeAlert' ||
        this.$store.getters.getSt === 'not'
      )
    },

    isActiveQuizState() {
      return (
        store.getters.getSt === 'start' ||
        store.getters.getSt === 'result2' ||
        store.getters.getSt === 'chosenOpen' ||
        this.$store.getters.getSt === 'resultBeforeAlert'
        // store.getters.getSt === 'wait' ||
      )
    },

    isInvisibleWhileVideo() {
      return store.getters.getSt === ''
    },
  },

  methods: {
    connect() {
      client.onConnect = () => {
        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/start`,
          res => {
            let data = JSON.parse(res.body).startQuizData
            console.log('startQuizData', data)
            this.$store.commit(types.START_QUIZ, data)
            this.startQuizForce()
          },
          {},
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/count`,
          res => {
            let data = JSON.parse(res.body).countQuizData
            // console.log('countQuizData', data)
            let picks = data.pick
            let pickArray = Object.values(picks)
            let totalData = data.total

            if (pickArray.length > 0) {
              const pickRates = PickCountingService.calcPickRates(
                pickArray,
                totalData,
              )
              const pickKills = PickCountingService.calcPickKills(
                pickArray,
                totalData,
              )
              store.commit(types.PICK_COUNTING, {
                totalData,
                pickRates,
                pickKills,
              })
            }
          },
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/shutdown`,
          res => {
            if (store.getters.getSt === 'wait') {
              return
            }
            let data = JSON.parse(res.body).shutDownQuizData
            this.$store.commit(types.CUT_QUIZ, data)
            ViewerQuizTimerService.clear()
          },
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/finish`,
          res => {
            //console.log('this.state', this.state)
            if (store.getters.getSt === 'wait') {
              //console.log('대기중이여서 안됨')
              return
            }
            //console.log('퀴즈 종료 신호 받음')
            let data = JSON.parse(res.body).finishQuizData
            //console.log('종료 신호 받고 받은 데이터', data)
            this.$store.commit(types.END_QUIZ, data)
            if (
              this.quizType === 1 &&
              store.getters.getAutoPlayState === true
            ) {
              //console.log('this.quizType', this.quizType)
              //console.log('자동예측 정보 전달')
              let uid = TwitchUidStorage.get()
              let autoPickList = {
                uid: uid,
                quizIdx: store.getters.getQuiz,
                quizItemIdx: store.getters.getQuizItem,
                order: store.getters.getOrders,
              }
              stompPublish('/send/extension/quiz/auto/select', autoPickList)
            }
            ViewerQuizTimerService.clear()
          },
        )
        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/correct`,
          res => {
            if (store.getters.getSt === 'wait') {
              return
            }
            let data = JSON.parse(res.body).correctExtensionQuiz
            //console.log('correctExtensionQuiz', data)
            this.$store.commit(types.GRADE_QUIZ_RESULT, data)
            this.showResult()
          },
        )
        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/settle`,
          res => {
            let data = JSON.parse(res.body).settleQuizData
            this.$store.commit(types.SETTLE_QUIZ, data)
          },
        )
        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/all/correct`,
          res => {
            if (store.getters.getSt === 'wait') {
              return
            }
            let data = JSON.parse(res.body).allCorrectExtensionQuiz
            this.$store.commit(types.GRADE_QUIZ_RESULT_ALLKILL, data)
            this.showResult()
          },
        )
        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/all/wrong`,
          res => {
            if (store.getters.getSt === 'wait') {
              return
            }
            let data = JSON.parse(res.body).allWrongExtensionQuiz
            this.$store.commit(types.GRADE_QUIZ_RESULT_ALLDEATH, data)
            this.showResult()
          },
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/realtime/rank`,
          res => {
            let ranks = JSON.parse(res.body).realTimeRanking
            //console.log('realTimeRanking', ranks)
            RankService.save(ranks)
          },
        )
        // stompSubscribe(
        //   `/subscribe/${this.channelID}/extension/signboard/reserve/start`,
        //   res => {
        //     let data = JSON.parse(res.body).reserveStartSignBoard
        //     //console.log('reserveStartSignBoard', data)
        //     store.commit(types.START_RESERVE_CHEERPOOL, data)
        //     const time = this.cheerPoolTimer * 1000
        //     setTimeout(() => {
        //       store.commit(types.FINISH_RESERVE_CHEERPOOL)
        //     }, time)
        //   },
        // )
        // stompSubscribe(
        //   `/subscribe/${this.channelID}/extension/signboard/start`,
        //   res => {
        //     let data = JSON.parse(res.body)
        //     //console.log(data)
        //   },
        // )
        // stompSubscribe(
        //   `/subscribe/${this.channelID}/extension/signboard/reject/${this.userId}`,
        //   res => {
        //     let data = JSON.parse(res.body)
        //     //console.log(data)
        //   },
        // )
        // stompSubscribe(
        //   `/subscribe/${this.channelID}/extension/signboard/shutdown`,
        //   res => {
        //     let data = JSON.parse(res.body)
        //     //console.log(data)
        //   },
        // )
        // stompSubscribe(
        //   `/subscribe/${this.channelID}/extension/signboard/restart`,
        //   res => {
        //     let data = JSON.parse(res.body)
        //     //console.log(data)
        //   },
        // )
      }
    },
    connectAISocket() {
      clientForAI.onConnect = () => {
        const leagueName = 'LCK'
        AISubscribe(`/subscribe/extension/ai/live/v1/${leagueName}`, res => {
          const data = JSON.parse(res.body).leagueLive
          //console.log('AiData', data)
          this.aiPredictionData = data
          //console.log('this.aiPredictionData', this.aiPredictionData)
        })
      }
    },
    requestTwitchAuth() {
      TwitchAuthService.auth(this.handleOnAuthorizedTwitchExtension)
    },
    async handleOnAuthorizedTwitchExtension(_, isLinkedViewer) {
      this.$store.commit('AUTH', isLinkedViewer)
    },
    startQuizForce() {
      if (!this.canOpenQuizState) {
        return
      }
      if (this.$route.name !== 'Viewer') {
        this.moveRouteTo('Viewer')
      }
      this.$nextTick(() => {
        this.$refs.quizWindow.openQuiz()
      })
    },
    startQuizOnMounted() {
      if (this.$route.name !== 'Viewer') {
        return
      }
      this.startQuizForce()
    },
    async handleDragMoveJewel() {
      const jewelPosition = this.$refs.floatingWidget.getBoundingClientRect()

      this.decideJewelPosition(jewelPosition)
    },

    decideJewelPosition(jewelPosition) {
      this.jewelPosition = ViewerQuizJewelService.getQuadrant(jewelPosition, {
        width: window.innerWidth,
        height: window.innerHeight,
      })
    },

    closePop() {
      this.moveRouteTo('Viewer')
    },
    handleClickJewelIcon() {
      this.startQuizForce()
    },

    showResult() {
      //console.log('showResult')
      ViewerQuizResultService.showResult(store.state.isAttend)
      if (this.$route.name !== 'Viewer') {
        this.moveRouteTo('Viewer')
      }
      this.$nextTick(() => {
        this.$refs.killResultVideo.playVideo()
      })
    },

    handleClickRankingIcon() {
      this.showOrHideMenu()
    },

    handleClickAiIcon() {
      this.showOrHideAi()
    },

    handleClickCheerIcon() {
      if (this.cheerPoolState !== 'reserving') {
        return
      }
      this.showOrHideCheer()
    },

    handleCheerPoolActive() {
      if (this.isCheerPoolActive) {
        this.isCheerPoolActive = false
      } else {
        this.isCheerPoolActive = true
      }
    },

    showOrHideMenu() {
      if (this.isMenuFloatedPage) {
        this.moveRouteTo('Viewer')
        return
      }
      this.moveRouteTo('Ranking')
    },

    showOrHideAi() {
      if (this.isAiFloatedPage) {
        this.moveRouteTo('Viewer')
        return
      }
      this.moveRouteTo('AiPrediction')
    },
    showOrHideCheer() {
      if (this.isCheerFloatedPage) {
        this.moveRouteTo('Viewer')
        return
      }
      this.moveRouteTo('CheerPool')
    },

    moveRouteTo(routeName) {
      this.currentTab = routeName
      this.$router.replace({
        name: routeName,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.backback {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
.viewer {
  width: 100%;
  height: 100%;
  font-family: 'Noto Sans KR', 'sans-serif';
  position: relative;
  display: inline-block;

  video {
    width: 100%;
    transform: translate(0%, -20%);
  }

  .decakill_icon_wrap {
    .menu-wrap.left-top {
      top: 0;
      transform: translate(15%, 0%);
    }
  }
  .decakill_icon_wrap.invisible {
    display: flex;
  }
  .invisible {
    display: none;
  }

  * {
    box-sizing: border-box;
  }
}
</style>

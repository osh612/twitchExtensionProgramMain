<template>
  <div
    class="viewer"
    ref="viewer"
    @mousemove="mouseMoveCheck()"
    :class="{
      viewerHide: this.viewerHide === true,
      viewerShow: this.viewerHide === false,
    }"
  >
    <div
      class="decakill_icon_wrap"
      ref="floatingWidget"
      :class="{
        viewerHide: this.viewerHide === true,
        viewerShow: this.viewerHide === false,
        active: isMenuActive || isQuizWindowOpen,
      }"
    >
      <img
        class="newQuizAlert"
        src="../../components/svgs/SvgNewQuizAlert.svg"
        v-if="isQuizActive"
      />
      <JewelIcon @click.native="handleClickJewelIcon" />
      <div
        class="menu_icon_wrap"
        :class="{ active: isMenuActive }"
        :ranking-icon-position="rankingIconPosition"
      >
        <RankIcon
          @click.native="handleClickRankingIcon"
          class="animation one"
          :class="{ active: isRankingIconActive }"
        />
        <RivalIcon
          @click.native="handleClickRivalIcon"
          class="animation two"
          :class="{ active: isRivalIconActive }"
        />
        <PredictionIcon
          @click.native="handleClickPredictionIcon"
          class="animation three"
          :class="{ active: isPredictionIconActive }"
        />
        <SettingIcon
          @click.native="handleClickSettingIcon"
          class="animation four"
          :class="{ active: isSettingIconActive }"
        />
        <GuideIcon
          @click.native="handleClickGuideIcon"
          class="animation five"
          :class="{ active: isGuideIconActive }"
        />
      </div>
    </div>
    <KillResultVideo
      :kills="$store.state.kills"
      :is-attend="$store.state.isAttend"
      ref="killResultVideo"
    />
    <vue-resizable
      class="resizable"
      ref="resizableComponent"
      dragSelector="#quiz_main_wrap"
      @drag:end="eHandler"
      :maximize="false"
      :fitParent="true"
      :max-width="294"
      :min-width="294"
      :max-height="234"
      :width="294"
      :left="left"
      :top="top"
      :class="{
        active: isActiveQuizState,
      }"
      :active="null"
    >
      <QuizWindow
        :class="{
          active: isActiveQuizState,
        }"
        :auth.sync="auth"
        ref="quizWindow"
      />
    </vue-resizable>
    <div class="menu-wrap" :class="{ active: isMenuActive }">
      <router-view
        :rankingData="rankingData"
        :myRankingData="myRankingData"
        @resetPosition="resetPosition"
      ></router-view>
      <div id="pop_close" @click="closePop">
        <CloseIconWithBlackGradiant />
      </div>
    </div>
    <div class="ai-wrap" :class="{ active: isAiActive }">
      <div class="ai-content">
        <router-view name="aiPrediction" :aiPredictionData="aiPredictionData" />
      </div>
      <div id="pop_close_ai" @click="closePop">
        <CloseIconWithBlackGradiant />
      </div>
    </div>
    <div class="cheer-wrap" :class="{ active: isCheerActive }">
      <div class="cheer-content">
        <router-view name="cheerPool" />
      </div>
      <div id="pop_close_cheer" @click="closePop">
        <CloseIconWithBlackGradiant />
      </div>
    </div>
    <div class="cheerPoolActive-wrap" :class="{ active: isCheerPoolActive }">
      <CheerPoolActive />
      <div id="pop_close_cheer" @click="handleCheerPoolActive">
        <CloseIconWithBlackGradiant />
      </div>
    </div>
    <!-- <video
      src="@/assets/videos/lck_sample.mp4"
      type="video/mp4"
      autoplay
    ></video> -->
  </div>
</template>
<script>
import store from '@/vuex/store'
import VueResizable from 'vue-resizable'
import JewelIcon from '@/components/JewelIcon'
import RankIcon from '@/components/RankIcon'
// import CheerIcon from '@/components/CheerIcon'
// import AiIcon from '@/components/AiIcon'

import TwitchUidStorage from '@/storage/twitch-uid-storage.js'

import ViewerQuizTimerService from '@/scripts/service/viewer-quiz-timer-service.js'
import { mapGetters } from 'vuex'
import * as types from '@/vuex/mutation_types'
import PickCountingService from '@/scripts/service/pick-counting-service'
import RankService from '@/scripts/service/rank-service'
// import ViewerQuizJewelService from '@/scripts/service/viewer-quiz-jewel-service'
import ViewerRankingIconService from '@/scripts/service/viewer-ranking-icon-service'
import KillResultVideo from '@/components/KillResultVideo'
import QuizWindow from '@/components/QuizWindow.vue'
import TwitchAuthService from '@/scripts/service/twitch-auth-service'
import ViewerQuizResultService from '@/scripts/service/viewer-quiz-result-service'

import CloseIconWithBlackGradiant from '@/components/svgs/SvgCloseIconWithBlackGradiant'
import * as animationData1 from '@/assets/json/rank_load.json'
import {
  client,
  stompPublish,
  stompSubscribe,
  // stompUnsubscribe,
} from '../../api/socket/webStompSocket'
import twitchChannelStorage from '../../storage/twitch-channel-storage'
import apiTokenStorage from '../../storage/api-token-storage'
import { AISubscribe, clientForAI } from '../../api/socket/webStompForAI'
import twitchUidStorage from '../../storage/twitch-uid-storage'
// import rivalApiService from '../../api/axios/rival-api-service'
import CheerPoolActive from './cheerPoolActive.vue'
import PredictionIcon from '../../components/PredictionIcon.vue'
import RivalIcon from '../../components/RivalIcon.vue'
import SettingIcon from '../../components/SettingIcon.vue'
import GuideIcon from '../../components/GuideIcon.vue'
// import SvgCheerPoolHeaderIcon from '../../components/svgs/SvgCheerPoolHeaderIcon.vue'

export default {
  name: 'viewer-component',

  components: {
    KillResultVideo,
    CloseIconWithBlackGradiant,
    RankIcon,
    // AiIcon,
    VueResizable: VueResizable,
    JewelIcon,
    QuizWindow,
    CheerPoolActive,
    PredictionIcon,
    RivalIcon,
    SettingIcon,
    GuideIcon,
  },

  data() {
    return {
      left: 93,
      top: 54,
      options1: { animationData: animationData1.default },
      aiPredictionData: null,
      jewelPosition: 'bottom-left',
      isMenuActive: false,
      isAiActive: false,
      isCheerActive: false,
      isCheerPoolActive: false,
      innerHeightChange: window.innerHeight,
      apiToken: apiTokenStorage.get(),
      isCheerMesnuActive: false,
      viewerHide: false,
      mouseTimer: null,
      menuActive: false,
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
      },
      immediate: true,
    },
  },
  async created() {
    await this.requestTwitchAuth()
  },

  async mounted() {
    // await this.requestTwitchAuth()
    await this.startQuizOnMounted()
    this.connect()
    // this.connectAISocket()
  },
  computed: {
    ...mapGetters({
      myRankingData: 'getMyRankData',
      rankingData: 'getRankData',
      quizList: 'getQuizList',
      leagueMatchIdx: 'getLeagueMatchIdx',
      cheerPoolState: 'getCheerPoolState',
      cheerPoolIdx: 'getCheerPoolIdx',
      cheerPoolTimer: 'getCheerPoolTimer',
      cheerPoolText: 'getCheerPoolText',
      cheerPrejectCauseoolIdx: 'getRejectCause',
      isQuizWindowOpen: 'getIsQuizWindowOpen',
      isQuizActive: 'getIsQuizActive',
    }),
    channelID() {
      return twitchChannelStorage.get()
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
        this.$route.name === 'RivalAddUser' ||
        this.$route.name === 'Setting' ||
        this.$route.name === 'Guide'
      )
    },
    isAiFloatedPage() {
      return this.$route.name === 'AiPrediction'
    },
    isCheerFloatedPage() {
      return this.$route.name === 'CheerPool'
    },

    isActiveQuizState() {
      if (this.isQuizWindowOpen === true) {
        return true
      } else {
        return false
      }
    },

    isRankingIconActive() {
      if (this.$route.name === 'Ranking') {
        return true
      } else {
        return false
      }
    },
    isRivalIconActive() {
      if (
        this.$route.name === 'Rival' ||
        this.$route.name === 'RivalRanking' ||
        this.$route.name === 'RivalCheckRequest' ||
        this.$route.name === 'RivalAddUser'
      ) {
        return true
      } else {
        return false
      }
    },
    isPredictionIconActive() {
      if (this.$route.name === 'Prediction') {
        return true
      } else {
        return false
      }
    },
    isSettingIconActive() {
      if (this.$route.name === 'Setting') {
        return true
      } else {
        return false
      }
    },
    isGuideIconActive() {
      if (this.$route.name === 'Guide') {
        return true
      } else {
        return false
      }
    },
  },

  methods: {
    connect() {
      client.onConnect = () => {
        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/start`,
          res => {
            let data = JSON.parse(res.body).startQuizData
            this.$store.commit(types.START_QUIZ, data)
            this.startQuizForce()
          },
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/count`,
          res => {
            let data = JSON.parse(res.body).countQuizData
            console.log('countQuizData', data)
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
            let data = JSON.parse(res.body).shutDownQuizData
            this.$store.commit(types.CUT_QUIZ, data)
            ViewerQuizTimerService.clear()
          },
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/finish`,
          res => {
            let data = JSON.parse(res.body).finishQuizData
            this.$store.commit(types.END_QUIZ, data)
            if (
              this.quizType === 1 &&
              store.getters.getAutoPlayState === true
            ) {
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
            let data = JSON.parse(res.body).correctExtensionQuiz
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
            let data = JSON.parse(res.body).allCorrectExtensionQuiz
            this.$store.commit(types.GRADE_QUIZ_RESULT_ALLKILL, data)
            this.showResult()
          },
        )
        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/all/wrong`,
          res => {
            let data = JSON.parse(res.body).allWrongExtensionQuiz
            this.$store.commit(types.GRADE_QUIZ_RESULT_ALLDEATH, data)
            this.showResult()
          },
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/message`,
          res => {
            let data = JSON.parse(res.body)
            console.log('공지사항', data)
          },
        )

        stompSubscribe(
          `/subscribe/${this.channelID}/extension/quiz/realtime/rank`,
          res => {
            let ranks = JSON.parse(res.body).realTimeRanking
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
          this.aiPredictionData = data
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
      if (!this.isQuizActive) {
        console.log('퀴즈 상태', this.isQuizActive)
        return
      }
      if (this.$route.name !== 'Viewer') {
        console.log('퀴즈 상태', this.isQuizActive)
        this.moveRouteTo('Viewer')
      }
      console.log('퀴즈 상태', this.isQuizActive)
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

    closePop() {
      this.moveRouteTo('Viewer')
    },
    handleClickJewelIcon() {
      this.startQuizForce()
      if (this.isQuizActive) {
        this.$store.commit(types.OPEN_QUIZ_WINDOW)
      }
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
    handleClickPredictionIcon() {
      this.showOrHidePrediction()
    },
    handleClickRivalIcon() {
      this.showOrHideRival()
    },
    handleClickSettingIcon() {
      this.showOrHideSetting()
    },
    handleClickGuideIcon() {
      this.showOrHideGuide()
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
      if (this.$route.name === 'Ranking') {
        this.moveRouteTo('Viewer')
        return
      }
      this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      this.moveRouteTo('Ranking')
    },
    showOrHidePrediction() {
      if (this.$route.name === 'Prediction') {
        this.moveRouteTo('Viewer')
        return
      }
      this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      this.moveRouteTo('Prediction')
    },
    showOrHideSetting() {
      if (this.$route.name === 'Setting') {
        this.moveRouteTo('Viewer')
        return
      }
      this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      this.moveRouteTo('Setting')
    },
    showOrHideGuide() {
      if (this.$route.name === 'Guide') {
        this.moveRouteTo('Viewer')
        return
      }
      this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      this.moveRouteTo('Guide')
    },
    showOrHideRival() {
      if (
        this.$route.name === 'Rival' ||
        this.$route.name === 'RivalRanking' ||
        this.$route.name === 'RivalCheckRequest' ||
        this.$route.name === 'RivalAddUser'
      ) {
        this.moveRouteTo('Viewer')
        return
      }
      this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      this.moveRouteTo('Rival')
    },

    showOrHideAi() {
      if (this.isAiFloatedPage) {
        this.moveRouteTo('Viewer')
        return
      }
      this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      this.moveRouteTo('AiPrediction')
    },
    // showOrHideCheer() {
    //   if (this.isCheerFloatedPage) {
    //     this.moveRouteTo('Viewer')
    //     return
    //   }
    //   this.moveRouteTo('CheerPool')
    // },

    moveRouteTo(routeName) {
      this.currentTab = routeName
      this.$router.replace({
        name: routeName,
      })
    },

    // mouseInandOut() {
    //   if (this.viewerHide !== true) {
    //     this.viewerHide = true
    //     console.log('mouserIn')
    //   } else {
    //     this.viewerHide = false
    //     console.log('mouserOut')
    //   }
    // },
    mouseMoveCheck() {
      clearTimeout(this.mouseTimer)
      if (this.viewerHide === true) {
        this.viewerHide = false
        console.log(this.viewerHide)
      }
      this.mouseTimer = setTimeout(() => {
        this.viewerHide = true
        console.log(this.viewerHide)
      }, 3000)
    },
    menuActivation() {
      if (this.$router.name === 'Ranking') {
        this.menuActive = true
      }
    },
    resetPosition() {
      console.log('resetPosition')
      this.top = 54
      this.left = 93
    },
    eHandler(data) {
      console.log(data)
      this.left = data.left
      this.top = data.top
    },
  },
}
</script>

<style scoped lang="scss">
.newQuizAlert {
  position: absolute;
  top: -14px;
  left: 32px;
}
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
    &.active {
      opacity: 1;
    }
  }
  .viewerHide {
    opacity: 0;
  }
  .viewerActive {
    opacity: 1;
  }
  .decakill_icon_wrap.invisible {
    display: none;
  }
  .invisible {
    display: none;
  }

  * {
    box-sizing: border-box;
  }
}
</style>

<template>
  <div id="quiz_outer_wrap">
    <div id="quiz_main_gradient"></div>
    <div class="timerBar">
      <div
        class="timerBar_gauge"
        :is-timer-activated="changeTimer"
        ref="timerBar_gauge"
        :style="{ width: guageRate + '%' }"
        :class="{
          timeup: timeup,
          competition: quizType === 1,
          nonCompetition: quizType === 2,
          Trivia: quizType === 3,
        }"
      ></div>
    </div>
    <div id="quiz_main_wrap">
      <div id="quiz_close" @click="handleClickCloseQuizWindow">
        <CloseIconWithBlackGradiant />
      </div>
      <div id="share_auth_outer_wrap" :class="{ active: auth === false }">
        <div id="share_auth_inner_wrap">
          <div class="share_title">
            권한을 허용해주셔야<br />예측 참여가 가능합니다.
          </div>
          <div class="share_btn" @click="requestTwitchAuth">권한 허용하기</div>
        </div>
      </div>
      <div class="quiz_inner_wrap">
        <div class="quiz_title_wrap">
          <div class="quizInfo_wrap">
            <div class="timer_wrap">
              <svg-timer-ico
                :class="{
                  timeup: timeup,
                  competition: quizType === 1,
                  nonCompetition: quizType === 2,
                  Trivia: quizType === 3,
                }"
              />
              <span
                class="timer"
                :is-timer-activated="changeTimer"
                :times="times"
                :class="{
                  timeup: timeup,
                  competition: quizType === 1,
                  nonCompetition: quizType === 2,
                  Trivia: quizType === 3,
                }"
              >
                <!-- {{ times }} -->

                {{ convertLiveSecondToMinute }}
              </span>
            </div>

            <div class="quizTypeInfo">
              <div class="quizTypeInfoTooltip">
                <div class="quizTypeInfo_icon">
                  <SvgGiftBox v-if="fixKill !== 0" />
                </div>
                <span class="quizTypeInfo_text" v-if="fixKill !== 0">{{
                  convertKillToKillText(fixKill)
                }}</span>
                <div class="quizTypeInfo_icon">
                  <SvgTalkingBalloon v-if="fixKill === 0 && toolTip" />
                </div>
                <span class="quizTypeInfo_text" v-if="fixKill === 0 && toolTip"
                  >문제정보</span
                >
                <div class="tooltiptext" v-if="quizType === 1">
                  <div class="frist_p">
                    <div>
                      {{ toolTip }}
                    </div>
                  </div>
                </div>
                <div class="tooltiptext" v-if="quizType === 2">
                  <div class="frist_p">
                    <div>
                      {{
                        `설문에 응답한 모든분께 ${convertKillToKillText(
                          fixKill,
                        )}을 부여합니다.`
                      }}
                    </div>
                    <div>콤보킬과 멀티킬에도 반영됩니다.</div>
                  </div>
                </div>
                <div class="tooltiptext" v-if="quizType === 3">
                  <div class="frist_p">
                    <div>
                      {{
                        `퀴즈를 맞춘분께 ${convertKillToKillText(
                          fixKill,
                        )}을 부여합니다.`
                      }}
                    </div>
                    <div>퀴즈를 틀린 경우 데스를 부여합니다.</div>
                    <div>콤보킬과 멀티킬에도 반영됩니다.</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="counting_inner_wrap">
              <svg-ico-human />
              <span class="counting_num">{{ convertUCount }}</span>
            </div>
          </div>
          <div class="quiz_title">{{ name }}</div>
          <!-- <div class="quiz_title">이번 게임에서 MVP를 받을 선수는?</div> -->
        </div>
        <div class="quiz_pick_outer_wrap">
          <div class="swiper-button-prev"></div>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(data, i) in item" :key="i">
              <div class="pick_content_wrap">
                <input
                  type="radio"
                  name="quiz_pick"
                  class="quiz_pick"
                  :id="`quiz_pick${i}`"
                  :disabled="quizPickDisabled"
                  :checked="getIsCheckedQuizPick(data.idx)"
                  @click="handleClickQuizPick(i, data.name, data.idx)"
                />
                <label
                  class="pick_content"
                  :for="`quiz_pick${i}`"
                  :class="{
                    competition: quizType === 1,
                    nonCompetition: quizType === 2,
                    Trivia: quizType === 3,
                  }"
                >
                  <div class="pick_front">
                    <span class="pick_title">{{ data.name }}</span>
                    <SvgCheck
                      class="pick_icon"
                      :class="{
                        competition: quizType === 1,
                        nonCompetition: quizType === 2,
                        Trivia: quizType === 3,
                      }"
                    />
                  </div>
                  <div class="pick_back">
                    <div
                      class="pick_rate"
                      v-if="quizType === 1 || quizType === 2"
                    >
                      <SvgPersonIcon class="pick_count_icon" />
                      <span>{{ pickRate[i] }}%</span>
                    </div>
                    <div
                      class="pick_rate_kill"
                      v-if="quizType === 1"
                      :class="{
                        competition: quizType === 1,
                        nonCompetition: quizType === 2,
                        Trivia: quizType === 3,
                      }"
                    >
                      <SvgSwordIcon class="pick_kill_icon" />
                      <span>{{ convertKillToKillText(pickKill[i]) }}</span>
                    </div>
                  </div>
                  <div
                    class="pick_rate_background"
                    :style="{ width: pickRate[i] + '%' }"
                    v-if="quizType === 2"
                    :class="{
                      competition: quizType === 1,
                      nonCompetition: quizType === 2,
                      Trivia: quizType === 3,
                    }"
                  ></div>
                </label>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-next"></div>
          <div
            class="swiper-pagination"
            :class="{
              competition: quizType === 1,
              nonCompetition: quizType === 2,
              Trivia: quizType === 3,
            }"
            slot="pagination"
          ></div>
        </div>
        <div v-if="quizType === 1" class="autoPlayToggle_wrap">
          <input
            type="checkbox"
            id="autoPlayToggleInput"
            class="autoPlayToggle_input"
            :value="autoPlayToggleValue"
            @change="toggleAutoPlay()"
          />
          <label for="autoPlayToggleInput" class="autoPlayToggle_box">✔</label>
          <span>정답 자동 예측</span>
          <div class="autoPlayTooltip">
            <svg-auto-play-tooltip-icon />
            <div class="tooltiptext">
              <div class="frist_p">
                <div>
                  자동예측 시 사람들이 투표한 비율에 따라 무작위로 정답이
                  선택됩니다.
                </div>
              </div>
              <div class="second_p">
                <div>
                  단, 네트워크 상태가 좋지 않을 경우 자동예측에 실패할 수
                  있습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="confirm_wrap">
          <div class="my_pick_wrap">
            <div class="my_pick_title">나의 선택</div>
            <div class="my_pick">{{ myPick }}</div>
          </div>
          <div
            class="my_pick_btn"
            @click="handleClickCommitMyQuizPick"
            :class="{
              competition: quizType === 1,
              nonCompetition: quizType === 2,
              Trivia: quizType === 3,
            }"
          >
            확인
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TwitchUidStorage from '@/storage/twitch-uid-storage.js'
import ViewerPickDisabledService from '@/scripts/service/viewer-pick-disabled-service'
import DateTimeService from '@/scripts/service/date-time-service.js'
import store from '@/vuex/store'
import * as types from '@/vuex/mutation_types'
import ViewerQuizTimerService from '@/scripts/service/viewer-quiz-timer-service'
import { mapGetters } from 'vuex'
import TwitchAuthService from '@/scripts/service/twitch-auth-service'
import CloseIconWithBlackGradiant from '@/components/svgs/SvgCloseIconWithBlackGradiant'
import SvgCheck from '@/components/svgs/SvgCheck.vue'
import SvgSwordIcon from '@/components/svgs/SvgSwordIcon'
import SvgPersonIcon from '@/components/svgs/SvgPersonIcon'
import SvgIcoHuman from '@/components/svgs/SvgIcoHuman'
import SvgTimerIco from '@/components/svgs/SvgTimerIco'
import SvgAutoPlayTooltipIcon from '@/components/svgs/SvgAutoPlayTooltipIcon'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { client, stompPublish } from '../api/socket/webStompSocket'
import SvgTalkingBalloon from './svgs/SvgTalkingBalloon.vue'
import SvgGiftBox from './svgs/SvgGiftBox.vue'

export default {
  name: 'QuizWindow',

  components: {
    CloseIconWithBlackGradiant,
    SvgCheck,
    SvgSwordIcon,
    SvgIcoHuman,
    SvgPersonIcon,
    SvgAutoPlayTooltipIcon,
    Swiper,
    SwiperSlide,
    SvgTimerIco,
    SvgTalkingBalloon,
    SvgGiftBox,
  },

  props: {
    auth: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  data() {
    return {
      quizPickDisabled: false,
      ratingDisabled: false,
      quizRatingGood: false,
      quizRatingBad: false,
      changeTimer: false,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        slidesPerGroup: 5,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        mousewheel: true,
        spaceBetween: 5,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        edgeSwipeDetection: 'prevent',
        effect: 'slide',
        nested: true,
        watchOverflow: true,
      },
    }
  },

  mounted() {
    console.log(this.tooltip)
    if (this.quizType === 1) {
      if (this.autoPlayToggleValue === true) {
        let uid = TwitchUidStorage.get()
        let autoList = {
          uid: uid,
          quizIdx: store.getters.getQuiz,
        }
        client.onConnect = () => {
          stompPublish('/send/extension/quiz/auto/select/list', autoList)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      times: 'getTimes',
      orders: 'getOrders',
      item: 'getItem',
      pickRate: 'getPickRate',
      pickKill: 'getPickKill',
      uCount: 'getUCount',
      name: 'getName',
      myPick: 'getMyPick',
      fixKill: 'getFixKill',
      toolTip: 'getToolTip',
      quizType: 'getType',
    }),
    liveTime() {
      return store.getters.getTimes
    },
    autoPlayToggleValue() {
      return store.getters.getAutoPlayState
    },
    startTime() {
      return DateTimeService.getQuizDuration(
        store.getters.getStartDate,
        store.getters.getStartTime,
      )
    },
    guageRate() {
      const rate = Math.floor((this.liveTime / (this.startTime - 1)) * 100)
      console.log('this.liveTime', this.liveTime)
      console.log('this.startTime', this.startTime)
      if (rate > 6) {
        console.log('rate', rate)
        return rate
      } else {
        console.log('rate0', rate)
        return 0
      }
    },
    convertLiveSecondToMinute() {
      let min = parseInt((this.times % 3600) / 60)
      let min2 = min.toString().padStart(2, '0')
      let sec = (this.times % 60) - 1
      let sec2 = sec.toString().padStart(2, '0')

      return min2 + ':' + sec2
    },
    convertUCount() {
      let convertUCount = this.uCount
      // return convertUCount.toLocaleString()
      return convertUCount
    },
    timeup() {
      return this.times < 16
    },
  },
  methods: {
    //자동 정답 처리
    toggleAutoPlay() {
      if (this.quizType !== 1) {
        return
      }
      if (this.autoPlayToggleValue === false) {
        this.$store.commit(types.AUTO_PLAY_TRUE)
        let uid = TwitchUidStorage.get()
        let autoList = {
          uid: uid,
          quizIdx: store.getters.getQuiz,
        }
        stompPublish('/send/extension/quiz/auto/select/list', autoList)
      } else if (this.autoPlayToggleValue === true) {
        this.$store.commit(types.AUTO_PLAY_FALSE)
      }
    },

    requestTwitchAuth() {
      TwitchAuthService.auth((_, isLinkedViewer) => {
        this.$emit('update:auth', isLinkedViewer)
      })
    },

    convertKillToKillText(kill) {
      const normalizedKill = Math.max(1, Math.min(kill, 10))
      let killText = {
        1: '싱글킬',
        2: '더블킬',
        3: '트리플킬',
        4: '쿼드라킬',
        5: '펜타킬',
        6: '헥사킬',
        7: '헵타킬',
        8: '옥타킬',
        9: '노나킬',
        10: '데카킬',
      }
      return killText[normalizedKill]
    },

    getIsCheckedQuizPick(quiz_value) {
      return quiz_value === store.getters.getQuizItem
    },

    preventClickQuizPick() {
      this.quizPickDisabled = true
      ViewerPickDisabledService.onTimerEnd(() => {
        this.quizPickDisabled = false
      })
    },

    setMyPick(pickIndex, name, dataIndex) {
      this.$store.commit(types.SET_MY_PICK, {
        quizItemIdx: dataIndex,
        myPickOrder: pickIndex,
        myPickName: name,
      })
    },

    sendQuizLog(quizItemIndex) {
      let uid = TwitchUidStorage.get()
      let quizObj = {
        uid: uid,
        quizIdx: store.getters.getQuiz,
        quizItemIdx: quizItemIndex,
      }
      stompPublish('/send/extension/quiz/select', quizObj)
    },

    // sendQuizLog2(quizItemIndex) {
    //   let uid = TwitchUidStorage.get()
    //   let quiz_obj = {
    //     uid: uid,
    //     quiz_idx: store.getters.getQuiz,
    //     quiz_item_idx: quizItemIndex,
    //     item: store.getters.getItem,
    //     orders: store.getters.getOrders,
    //   }
    //   let sendData = this.$com_socket.emit('/twitch/quiz', quiz_obj)
    // },

    handleClickQuizPick(pickIndex, name, quizItemIndex) {
      this.preventClickQuizPick()
      this.setMyPick(pickIndex, name, quizItemIndex)
      // this.sendQuizLog2(quizItemIndex)
      this.sendQuizLog(quizItemIndex)
    },

    handleClickCloseQuizWindow() {
      if (this.times > 0) {
        this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      }
    },

    handleClickCommitMyQuizPick() {
      if (store.getters.getMyPick && store.getters.getTimes > 0) {
        this.$store.commit(types.CLOSE_QUIZ_WINDOW)
      }
    },

    async openQuizForce() {
      if (this.times <= 0) {
        return
      }
      this.$store.commit(types.OPEN_QUIZ_WINDOW)
      this.changeTimer = false

      await this.$nextTick()

      const quizDuration = DateTimeService.getQuizDuration(
        store.getters.getStartDate,
        store.getters.getTimes,
      )

      ViewerQuizTimerService.start({
        startTime: quizDuration,
        onTimerWillEnd: () => {
          this.changeTimer = true
        },
      })
      if (this.$route.name !== 'Viewer') {
        this.$router.replace('Viewer')
      }
    },
    async openQuiz() {
      if (this.times <= 0) {
        return
      }
      // this.$store.commit(types.OPEN_QUIZ_WINDOW)
      this.changeTimer = false

      await this.$nextTick()

      const quizDuration = DateTimeService.getQuizDuration(
        store.getters.getStartDate,
        store.getters.getTimes,
      )

      ViewerQuizTimerService.start({
        startTime: quizDuration,
        onTimerWillEnd: () => {
          this.changeTimer = true
        },
      })
      if (this.$route.name !== 'Viewer') {
        this.$router.replace('Viewer')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.timerBar_gauge.timeup {
  background: #ff5858;
}
// #quiz_outer_wrap.left-bottom {
// }

// #quiz_outer_wrap.left-top {
// }

// #quiz_outer_wrap.right-bottom {
// }

// #quiz_outer_wrap.right-top {
// }
</style>

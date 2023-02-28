// src/vuex/mutation.js
import * as types from './mutation_types'
import store from '@/vuex/store'
import twitchUidStorage from '@/storage/twitch-uid-storage'
import rankApiService from '@/api/axios/rank-api-service'

// const alarmIcon = require('@/assets/image/ico-alarm.svg')

const mutations = {
  [types.ACCESS_TOKEN](state, access_token) {
    state.access_token = access_token
  },
  [types.AUTH](state, auth) {
    state.auth = auth
  },
  [types.ST](state, st) {
    state.st = st
  },
  [types.BUBBLE](state, bubble) {
    state.bubble = bubble
  },
  [types.BUBBLE2](state, bubble2) {
    state.bubble2 = bubble2
  },
  // [types.BUBBLEON](state, bubbleOn) {
  //   state.bubbleOn = bubbleOn
  // },
  // [types.BUBBLEICON](state, bubbleIcon) {
  //   state.bubbleIcon = bubbleIcon
  // },
  [types.ORDERS](state, orders) {
    state.orders = orders
  },
  [types.QUIZ_IDX](state, quiz_idx) {
    state.quiz_idx = quiz_idx
  },
  [types.QUIZ_ITEM_IDX](state, quiz_item_idx) {
    state.quiz_item_idx = quiz_item_idx
  },
  [types.TIMES](state, times) {
    state.times = times
  },
  [types.ITEM](state, item) {
    state.item = item
  },
  [types.PICK_RATE](state, pick_rate) {
    state.pickRate = pick_rate
  },
  [types.PICK_KILL](state, pick_kill) {
    state.pickKill = pick_kill
  },
  [types.MYPICK](state, mypick) {
    state.myPick = mypick
  },
  [types.MYPICKORDER](state, mypickOrder) {
    state.myPickOrder = mypickOrder
  },
  [types.UCOUNT](state, uCount) {
    state.uCount = uCount
  },
  [types.SEARCHEDRIVALUSER](state, searchedRivalUser) {
    state.searchedRivalUser = searchedRivalUser
  },
  [types.NAME](state, name) {
    state.name = name
  },
  [types.QUIZ_LIST](state, quizList) {
    state.quizList = quizList
  },
  [types.OPAQUEID](state, opaqueId) {
    state.opaqueId = opaqueId
  },
  [types.ID](state, id) {
    state.id = id
  },
  [types.LOGIN](state, login) {
    state.login = login
  },
  [types.MYREALTIMERANK](state, myRealTimeRank) {
    state.myRealTimeRank = myRealTimeRank
  },
  [types.DISPLAY_NAME](state, display_name) {
    state.display_name = display_name
  },
  [types.PROFILE_IMAGE_URL](state, profile_image_url) {
    state.profile_image_url = profile_image_url
  },
  [types.PLATFORM](state, platform) {
    state.platform = platform
  },
  [types.DESCRIPTION](state, description) {
    state.description = description
  },
  [types.CREATED_AT](state, created_at) {
    state.created_at = created_at
  },
  [types.STARTDATE](state, startDate) {
    state.startDate = startDate
  },
  [types.QUIZ_GROUP_IDX](state, quiz_group_idx) {
    state.quiz_group_idx = quiz_group_idx
  },
  [types.ATTEND](state, attend) {
    state.attend = attend
  },
  [types.SETNUM](state, setNum) {
    state.setNum = setNum
  },
  [types.RESULTORDERS](state, resultorders) {
    state.resultOrders = resultorders
  },
  [types.RANKDATA](state, rankData) {
    state.rankData = rankData
  },

  [types.MYRANKDATA](state, myRankData) {
    state.myRankData = myRankData
  },
  [types.AIDATASTORED](state, aiDataStored) {
    state.aiDataStored = aiDataStored
  },
  [types.IDENTITYNUM](state, identityNum) {
    state.identityNum = identityNum
  },
  [types.CHANNELDATA](state, channelData) {
    state.channelData = channelData
  },
  [types.RIVALRANK](state, rivalRank) {
    state.rivalRank = rivalRank
  },
  [types.RIVALGROUPINFO](state, rivalGroupInfo) {
    state.rivalGroupInfo = rivalGroupInfo
  },
  [types.RIVALGROUPIDX](state, rivalGroupIdx) {
    state.rivalGroupIdx = rivalGroupIdx
  },
  [types.RIVALREQUESTSEND](state, rivalRequestSend) {
    state.rivalRequestSend = rivalRequestSend
  },
  [types.RIVALREQUESTRECEIVE](state, rivalRequestReceive) {
    state.rivalRequestReceive = rivalRequestReceive
  },
  [types.RIVALINVITESEND](state, rivalInviteSend) {
    state.rivalInviteSend = rivalInviteSend
  },
  [types.RIVALINVITERECEIVE](state, rivalInviteReceive) {
    state.rivalInviteReceive = rivalInviteReceive
  },
  [types.RIVALCOMPARE](state, rivalCompare) {
    state.rivalCompare = rivalCompare
  },
  [types.LEAGUEMATCHIDX](state, leagueMatchIdx) {
    state.leagueMatchIdx = leagueMatchIdx
  },
  [types.CHEERPOOLIDX](state, cheerPoolIdx) {
    state.cheerPoolIdx = cheerPoolIdx
  },
  [types.CHEERPOOLTIMER](state, cheerPoolTimer) {
    state.cheerPoolTimesr = cheerPoolTimer
  },
  [types.CHEERPOOLTEXT](state, cheerPoolText) {
    state.cheerPoolText = cheerPoolText
  },
  [types.REJECTCAUSE](state, rejectCause) {
    state.rejectCause = rejectCause
  },
  [types.CHEERPOOLSTATE](state, cheerPoolState) {
    state.cheerPoolState = cheerPoolState
  },
  [types.FIXKILL](state, fixKill) {
    state.fixKill = fixKill
  },
  [types.TOOLTIP](state, tooltip) {
    state.tooltip = tooltip
  },
  [types.TYPE](state, type) {
    state.type = type
  },
  [types.RIVALMODALTEXT](state, rivalModalText) {
    state.rivalModalText = rivalModalText
  },
  [types.RIVALMODALSTATE](state, rivalModalState) {
    state.rivalModalState = rivalModalState
  },
  [types.ISQUIZWINDOWOPEN](state, isQuizWindowOpen) {
    state.isQuizWindowOpen = isQuizWindowOpen
  },
  [types.AUTOQUIZPOPUP](state, autoQuizPopUp) {
    state.autoQuizPopUp = autoQuizPopUp
  },

  //퀴즈 시작 상태
  [types.START_QUIZ]: (state, payload) => {
    if (state.quiz_group_idx !== payload.quizGroupIdx) {
      state.quiz_group_idx = payload.quizGroupIdx
      state.quizList = []
      state.rankData = []
      state.myRankData = []
    }

    if (state.autoQuizPopUp === true) {
      state.isQuizWindowOpen = true
    } else if (state.autoQuizPopUp === false) {
      state.isQuizWindowOpen = false
    }
    state.isQuizActive = true
    state.type = payload.type
    state.fixKill = payload.fixKill
    state.tooltip = payload.tooltip
    state.st = payload.state
    state.quiz_idx = payload.quizIdx
    state.orders = payload.orders
    state.name = payload.quizName
    state.times = Number(payload.time) - 1
    state.startTime = Number(payload.time)
    state.item = payload.item
    state.startDate = new Date()
    state.attend = ''
    state.pickRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    state.pickKill = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    state.myPick = ''
    state.myPickOrder = ''
    state.uCount = 0
    state.preKill = 0

    const newQuizList = state.quizList.slice(0)
    newQuizList[payload.orders - 1] = {
      ...payload,
      // mypick: '',
      // mypickName: '',
      // preKill: '',
    }
    state.quizList[payload.orders - 1] = newQuizList[payload.orders - 1]
  },

  //긴급 종료 상태
  [types.CUT_QUIZ]: (state, { state: payloadState }) => {
    state.isQuizActive = false
    state.isQuizWindowOpen = false
    state.st = payloadState
    let beforeOrders = store.getters.getOrders
    state.quiz_idx = ''
    state.quiz_item_idx = ''
    // state.orders = ''
    state.startDate = 0
    state.times = 0
    state.item = ''
    state.pickRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    state.pickKill = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    state.myPick = ''
    state.myPickOrder = ''
    state.uCount = 0
    state.name = ''
    state.attend = ''
    state.type = 1
    state.fixKill = 0
    state.tooltip = ''

    const quizIdx = beforeOrders - 1
    state.quizList[quizIdx] = {
      quizIdx: 0,
    }
  },

  //퀴즈 종료 상태
  [types.END_QUIZ]: (state, { order, state: payloadState }) => {
    state.st = payloadState
    state.isQuizActive = false
    state.isQuizWindowOpen = false
    const pickKill = state.pickKill
    const quizList = state.quizList
    const quizIdx = order - 1
    if (!quizList[quizIdx].preKill) {
      return
    }

    if (pickKill !== null || pickKill !== undefined) {
      if (state.fixKill !== 0) {
        quizList[quizIdx].preKill = state.fixKill
      } else {
        quizList[quizIdx].preKill = pickKill[store.getters.getMyPickOrder]
      }
    } else {
      quizList[quizIdx].preKill = undefined
    }
    console.log('quizList.preKill', quizList[quizIdx].preKill)

    state.quizList = quizList
    console.log('state.quizList', state.quizList)

    if (state.autoPlayState === true && state.type === 1) {
      let convertedPickRate = []
      for (let i = 0; i < state.pickRate.length; i++) {
        convertedPickRate[i] = state.pickRate[i] / 100
      }

      let select = function (allItemIdx, convertedPickRate) {
        let sum = 0
        let factor = 0
        let random = Math.random()

        for (let i = convertedPickRate.length - 1; i >= 0; i--) {
          sum += convertedPickRate[i]
        }

        random *= sum

        for (let i = convertedPickRate.length - 1; i >= 0; i--) {
          factor += convertedPickRate[i]
          if (random <= factor) {
            return allItemIdx[i]
          }
        }
      }

      let randomSelectedItem = select(state.item, convertedPickRate)

      let newQuizList = store.getters.getQuizList.slice()
      const quizIdx = store.getters.getOrders - 1
      const myPickOrder = state.item.indexOf(randomSelectedItem)
      newQuizList[quizIdx].mypickName = randomSelectedItem.name
      newQuizList[quizIdx].mypick = randomSelectedItem.idx
      newQuizList[quizIdx].preKill = state.pickKill[myPickOrder]

      state.quizList = newQuizList
      state.quiz_item_idx = randomSelectedItem.idx
      state.myPickOrder = myPickOrder
      state.myPick = randomSelectedItem.name

      const pickKill = state.pickKill
      const quizList = state.quizList
      state.attend = true

      if (pickKill !== null || pickKill !== undefined) {
        quizList[quizIdx].preKill = pickKill[store.getters.getMyPickOrder]
      } else {
        quizList[quizIdx].preKill = undefined
      }
      console.log('preKill: ' + quizList[quizIdx].preKill)

      state.quizList = quizList
      console.log('state.quizList', state.quizList)
    }
  },

  //정답 처리 상태
  [types.GRADE_QUIZ_RESULT]: (state, payload) => {
    state.quiz_item_idx = payload.item.idx
    state.kills = payload.item.kills
    state.times = 0
    state.item = ''
    state.pickRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    state.pickKill = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    state.myPick = ''
    state.myPickOrder = ''
    state.uCount = 0
    state.name = ''
    state.startDate = ''
    state.attend = ''
    state.type = 1
    state.tooltip = ''
    state.fixKill = 0

    const quizList = store.getters.getQuizList
    const quizIdx = payload.order - 1

    if (quizList.length !== 0) {
      quizList[quizIdx].quiz_result = payload.item.idx
      quizList[quizIdx].answer = payload.item.name
      quizList[quizIdx].kills = payload.item.kills

      state.isDeath = quizList[quizIdx].mypick !== payload.item.idx

      state.quizList = quizList

      const myPick = quizList[quizIdx].mypick
      state.isAttend = !!myPick
    }
  },

  //전원 정답 처리 상태
  [types.GRADE_QUIZ_RESULT_ALLKILL]: (state, payload) => {
    state.bubble = '전원 정답'
    state.quiz_idx = payload.quizIdx
    state.orders = ''
    state.kills = payload.kill
    state.times = 0
    state.item = ''
    state.pickRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    state.pickKill = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    state.myPick = ''
    state.myPickOrder = ''
    state.uCount = 0
    state.name = ''
    state.startDate = ''
    state.attend = ''

    const quizList = store.getters.getQuizList
    const quizIdx = payload.order - 1

    quizList[quizIdx].quiz_result = '전원 정답'
    quizList[quizIdx].answer = '전원 정답'
    quizList[quizIdx].kills = payload.kill

    state.isDeath = false

    state.quizList = quizList
    const myPick = quizList[quizIdx].mypick
    state.isAttend = !!myPick
  },

  //전원 오답 처리 상태
  [types.GRADE_QUIZ_RESULT_ALLDEATH]: (state, payload) => {
    state.bubble = '전원 오답'
    state.quiz_idx = payload.idx
    state.quiz_item_idx = ''
    state.orders = payload.order
    state.kills = payload.kill
    state.times = 0
    state.item = ''
    state.pickRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    state.pickKill = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    state.myPick = ''
    state.myPickOrder = ''
    state.uCount = 0
    state.name = ''
    state.startDate = ''
    state.attend = ''

    const quizList = store.getters.getQuizList
    const quizIdx = payload.order - 1

    quizList[quizIdx].quiz_result = '전원 오답'
    quizList[quizIdx].answer = '전원 오답'
    quizList[quizIdx].kills = 0

    state.isDeath = true

    state.quizList = quizList
    const myPick = quizList[quizIdx].mypick
    state.isAttend = !!myPick
  },

  //마감 임박 상태
  // [types.WILL_END_QUIZ]: state => {},

  //퀴즈 창 열기 상태
  [types.OPEN_QUIZ_WINDOW]: state => {
    state.isQuizWindowOpen = true
  },
  //퀴즈 창 닫기
  [types.CLOSE_QUIZ_WINDOW]: state => {
    state.isQuizWindowOpen = false
  },
  //정답 클릭시
  [types.SET_MY_PICK]: (state, { quizItemIdx, myPickOrder, myPickName }) => {
    let newQuizList = store.getters.getQuizList.slice()
    const quizIdx = store.getters.getOrders - 1
    newQuizList[quizIdx].mypickName = myPickName
    newQuizList[quizIdx].mypick = quizItemIdx

    state.quizList = newQuizList
    state.quiz_item_idx = quizItemIdx
    state.myPickOrder = myPickOrder
    state.myPick = myPickName
  },

  [types.SETTLE_QUIZ]: (state, payload) => {
    if (state.quiz_group_idx !== payload.quizGroupIdx) {
      state.quiz_group_idx = payload.quizGroupIdx
      state.quizList = []
      state.myRankData = []
    }
  },

  [types.PICK_COUNTING]: (state, { totalData, pickRates, pickKills }) => {
    let newQuizList = store.getters.getQuizList.slice()
    const quizIdx = store.getters.getOrders - 1
    const myPickOrder = store.getters.getMyPickOrder
    try {
      if (state.fixKill !== 0) {
        newQuizList[quizIdx].preKill = state.fixKill
      } else {
        newQuizList[quizIdx].preKill = state.pickKill[myPickOrder]
      }
    } catch {
      console.log('미선택')
    }
    state.uCount = totalData
    state.pickRate = pickRates
    state.pickKill = pickKills
  },

  [types.RESULT_AND_ATTEND]: state => {
    const data = {
      quizGroupIdx: state.quiz_group_idx,
      userId: twitchUidStorage.get(),
    }

    //console.log('getRealTimeRank', data)
    rankApiService.getRealTimeRank(data)

    // if (
    //   store.getters.getSt === 'start' ||
    //   store.getters.getSt === 'process' ||
    //   store.getters.getSt === 'chosen' ||
    //   store.getters.getSt === 'result2' ||
    //   store.getters.getSt === 'resultBeforeAlert' ||
    //   store.getters.getSt === 'not'
    // ) {
    //   return
    // }
    state.attend = 'on'
    state.st = ''
  },

  // [types.RESULT_AND_ATTEND_EFFECT_TIMEOVER]: state => {
  //   if (
  //     store.getters.getSt === 'start' ||
  //     store.getters.getSt === 'process' ||
  //     store.getters.getSt === 'chosen' ||
  //     store.getters.getSt === 'result2' ||
  //     store.getters.getSt === 'resultBeforeAlert' ||
  //     store.getters.getSt === 'not'
  //   ) {
  //     return
  //   } else {
  //     state.st = 'result'
  //   }
  // },

  //미참여 결과
  [types.RESULT_BUT_NOT_ATTEND]: state => {
    // const data = {
    //   quizGroupIdx: state.quiz_group_idx,
    //   userId: twitchUidStorage.get(),
    // }
    //console.log('data', data)
    // rankApiService.getRealTimeRank(data)

    // if (
    //   store.getters.getSt === 'start' ||
    //   store.getters.getSt === 'process' ||
    //   store.getters.getSt === 'chosen' ||
    //   store.getters.getSt === 'result2' ||
    //   store.getters.getSt === 'resultBeforeAlert' ||
    //   store.getters.getSt === 'not'
    // ) {
    //   console.log('return')
    //   return
    // }
    state.attend = ''
  },
  [types.SET_TWITCH_USERINFO]: (state, twitchInfo) => {
    state.id = twitchInfo.id
    state.login = twitchInfo.login
    state.display_name = twitchInfo.display_name
    state.profile_image_url = twitchInfo.profile_image_url
    state.description = twitchInfo.description
    state.created_at = twitchInfo.created_at
  },
  // [types.SET_STATE_WAIT]: state => {
  //   state.st = 'wait'
  //   state.bubble = '문제 준비중'
  // },
  [types.AUTO_PLAY_TRUE]: state => {
    state.autoPlayState = true
  },
  [types.AUTO_PLAY_FALSE]: state => {
    state.autoPlayState = false
  },
  [types.SET_AI_ROUTE]: (state, payload) => {
    state.route = payload.route
  },
  //응원하기 예약 시작상태
  [types.START_RESERVE_CHEERPOOL]: (state, payload) => {
    state.cheerPoolState = 'reserving'
    state.cheerPoolTimer = payload.time
    state.leagueMatchIdx = payload.leagueMatchIdx
  },
  //응원하기 예약 마감상태
  [types.FINISH_RESERVE_CHEERPOOL]: state => {
    state.cheerPoolState = 'reservingFinished'
    state.cheerPoolTimer = 0
  },
  // //응원하기 예약 시작상태
  // [types.START_RESERVE_CHEERPOOL]: (state, payload) => {
  //   state.cheerPoolState = 'reserving'
  //   state.cheerPoolTimer = payload.time
  // },
}

export default mutations

// src/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  auth: '',
  access_token: '',
  opaqueId: '',
  id: '',
  login: '',
  display_name: '',
  profile_image_url: '',
  platform: 'twitch',
  description: '',
  created_at: '',
  st: 'wait',
  bubble: '문제 준비중',
  orders: '',
  resultOrders: '',
  quiz_group_idx: 0,
  quiz_idx: '',
  quiz_item_idx: 0,
  times: 0,
  item: [],
  pickRate: [0, 0, 0, 0, 0, 0],
  pickKill: [1, 1, 1, 1, 1, 1],
  myPick: '',
  myPickOrder: '',
  uCount: 0,
  name: '',
  quizList: [
    {
      fixKill: 0,
      item: [],
      orders: 0,
      quiz_group_idx: 0,
      quizIdx: 0,
      quizName: '',
      state: '',
      time: 0,
      tooltip: '',
      type: 0,
      mypick: '',
      mypickName: '',
      preKill: 0,
    },
  ],
  startDate: '',
  attend: '',
  rankData: [],
  myRankData: {},
  kills: 0,
  isDeath: false,
  startTime: 0,
  autoPlayState: false,
  aiDataStored: {},
  setNum: 1,
  route: '',
  idendityNum: '',
  channelData: {},
  myRealTimeRank: {},
  rivalRank: [],
  searchedRivalUser: {
    id: '',
    displayName: '',
    userRivalGroupIdx: 0,
  },
  rivalGroupInfo: {},
  rivalGroupIdx: 0,
  rivalRequestSend: [
    {
      idx: 0,
      userRivalGroupIdx: 0,
      displayName: '',
    },
  ],
  rivalRequestReceive: [],
  rivalInviteSend: [
    {
      idx: 0,
      displayName: '',
    },
  ],
  rivalInviteReceive: [],
  rivalCompare: {},
  leagueMatchIdx: 0,
  cheerPoolIdx: 0,
  cheerPoolState: 'closed',
  cheerPoolTimer: 0,
  cheerPoolText: 0,
  rejectCause: '',
  fixKill: 0,
  tooltip: '',
  type: 1,
  rivalModalText: '',
  rivalModalState: false,
  isQuizWindowOpen: false,
  autoQuizPopUp: true,
  isQuizActive: false,
}

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, // store를 session storage 에 유지
    }),
  ],
  state,
  mutations,
  getters,
})

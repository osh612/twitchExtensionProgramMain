// src/vuex/getters.js

export default {
  getToken: state => state.access_token,
  getAuth: state => state.auth,
  getOpaqueId: state => state.opaqueId,
  getId: state => state.id,
  getLogin: state => state.login,
  getDisplay_name: state => state.display_name,
  getProfile_image_url: state => state.profile_image_url,
  getPlatform: state => state.platform,
  getDescription: state => state.description,
  getCreated_at: state => state.created_at,
  getSt: state => state.st,
  getBubble: state => state.bubble,
  getBubble2: state => state.bubble2,
  // getBubbleOn: state => state.bubbleOn,
  // getBubbleIcon: state => state.bubbleIcon,
  getQuizGroup: state => state.quiz_group_idx,
  getQuiz: state => state.quiz_idx,
  getQuizItem: state => state.quiz_item_idx,
  getChannelData: state => state.channelData,
  getOrders: state => state.orders,
  getTimes: state => state.times,
  getStartTime: state => state.startTime,
  getItem: state => state.item,
  getIdentityNum: state => state.identityNum,
  getPickRate: state => state.pickRate,
  getPickKill: state => state.pickKill,
  getMyPick: state => state.myPick,
  getMyPickOrder: state => state.myPickOrder,
  getUCount: state => state.uCount,
  getName: state => state.name,
  getQuizList: state => state.quizList,
  getStartDate: state => state.startDate,
  getAttend: state => state.attend,
  getResultOrders: state => state.resultOrders,
  getRankData: state => state.rankData,
  getMyRankData: state => state.myRankData,
  getAiRoute: state => state.route,
  getAutoPlayState: state => state.autoPlayState,
  getMyRealTimeRank: state => state.myRealTimeRank,
  getRivalRank: state => state.rivalRank,
  getSetNum: state => state.setNum,
  getAiDataStored: state => state.aiDataStored,
  getCanCheckRankState: state => state.st !== 'start' && state.st !== '',
  getIsStateStart: state => state.st === 'start',
  getIsStateReady: state => state.st === 'ready',
  getIsStateProcess: state => state.st === 'process',
  getIsStateWait: state => state.st === 'wait',
  getIsStateCut: state => state.st === 'cut',
  getIsStateNot: state => state.st === 'not',
  getIsStateResult: state => state.st === 'result',
  getIsStateResult2: state => state.st === 'result2',
  getIsStateresultBeforeAlert: state => state.st === 'resultBeforeAlert',
  getIsStateChosen: state => state.st === 'chosen',
  getIsMyPickNotSelected: state => !state.myPick,
  getSearchedRivalUser: state => state.searchedRivalUser,
  getIsSameMyPick: state => {
    return myPick => state.myPick === myPick
  },
  getRivalGroupInfo: state => state.rivalGroupInfo,
  getRivalGroupIdx: state => state.getRivalGroupIdx,
  getRivalRequestSend: state => state.rivalRequestSend,
  getRivalRequestReceive: state => state.rivalRequestReceive,
  getRivalInviteSend: state => state.rivalInviteSend,
  getRivalInviteReceive: state => state.rivalInviteReceive,
  getRivalCompare: state => state.rivalCompare,
  getLeagueMatchIdx: state => state.leagueMatchIdx,
  getCheerPoolIdx: state => state.cheerPoolIdx,
  getCheerPoolState: state => state.cheerPoolState,
  getCheerPoolTimer: state => state.cheerPoolTimer,
  getCheerPoolText: state => state.cheerPoolText,
  getRejectCause: state => state.rejectCause,
  getFixKill: state => state.fixKill,
  getToolTip: state => state.tooltip,
  getType: state => state.type,
  getRivalModalText: state => state.rivalModalText,
  getRivalModalState: state => state.rivalModalState,
  getIsQuizWindowOpen: state => state.isQuizWindowOpen,
  getAutoQuizPopUp: state => state.autoQuizPopUp,
  getIsQuizActive: state => state.isQuizActive,
}
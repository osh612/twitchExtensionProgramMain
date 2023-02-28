import {
  axiosPost,
  axiosPatch,
  axiosPut,
  axiosDelete,
} from '@/api/axios/axios.js'
import store from '../../vuex/store'

export default {
  //라이벌 참가 신청
  requestJoinRival(data) {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: '/user/rival/request',
        data,
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          switch (err.status.errorCode) {
            case 4:
              store.commit(
                'RIVALMODALTEXT',
                '상대방의 라이벌 그룹 인원이 초과되었습니다.',
              )
              break
            case 5:
              store.commit('RIVALMODALTEXT', '이미 신청한 사용자입니다.')
              break

            default:
              store.commit('RIVALMODALTEXT', '라이벌 참가 신청 실패')
              break
          }
          reject(err)
        })
    })
  },

  //라이벌 초대
  inviteRival(data) {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: '/user/rival/invite',
        data,
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          switch (err.status.errorCode) {
            case 4:
              store.commit(
                'RIVALMODALTEXT',
                '상대방의 라이벌 그룹 인원이 초과되었습니다.',
              )
              break
            case 5:
              store.commit('RIVALMODALTEXT', '이미 초대한 사용자입니다.')
              break

            default:
              store.commit('RIVALMODALTEXT', '라이벌 초대 실패')
              break
          }
          store.commit('RIVALMODALSTATE', true)
          reject(err)
        })
    })
  },

  //라이벌 검색
  searchRival(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/search',
        data,
      })
        .then(res => {
          if (
            res.data.rivalSearch.userRivalGroupIdx === undefined ||
            res.data.rivalSearch.userRivalGroupIdx === null
          ) {
            const undefinedIdx = {
              displayName: res.data.rivalSearch.displayName,
              id: res.data.rivalSearch.id,
              userRivalGroupIdx: 0,
            }
            store.commit('SEARCHEDRIVALUSER', undefinedIdx)
          } else {
            store.commit('SEARCHEDRIVALUSER', res.data.rivalSearch)
          }
          resolve(res)
        })
        .catch(err => {
          switch (err.status.errorCode) {
            case 1:
              store.commit('RIVALMODALTEXT', '검색할 이름을 작성해주세요.')
              break
            default:
              store.commit('RIVALMODALTEXT', '유저 검색 실패')
              break
          }
          store.commit('RIVALMODALSTATE', true)
          reject(err)
        })
    })
  },

  //라이벌 보낸 참가 신청 리스트
  getRivalSendRequest(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/request/send/list',
        data,
      })
        .then(res => {
          store.commit('RIVALREQUESTSEND', res.data.rivalRequestSend)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  //라이벌 받은 참가 신청 리스트
  getRivalReceivedRequest(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/request/receive/list',
        data,
      })
        .then(res => {
          store.commit('RIVALREQUESTRECEIVE', res.data.rivalRequestReceive)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //라이벌 초대한 리스트
  getRivalSendInvite(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/invite/send/list',
        data,
      })
        .then(res => {
          store.commit('RIVALINVITESEND', res.data.rivalInviteSendList)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //라이벌 받은 초대 리스트
  getRivalReceivedInvite(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/invite/receive/list',
        data,
      })
        .then(res => {
          store.commit('RIVALINVITERECEIVE', res.data.rivalInviteReceive)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //라이벌 그룹 가져오기
  getRivalGroup(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/get/groupInfo',
        data,
      })
        .then(res => {
          if (
            res.data.rivalGroupInfo === null ||
            res.data.rivalGroupInfo === undefined
          ) {
            store.commit('RIVALGROUPINFO', {
              rivalGroupIdx: 0,
              master: 0,
            })
          } else {
            store.commit('RIVALGROUPINFO', res.data.rivalGroupInfo)
          }
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //라이벌 랭킹
  getRivalRank(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/rank',
        data,
      })
        .then(res => {
          store.commit('RIVALRANK', res.data.rivalRank)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //라이벌 상대 전적
  getRivalCompare(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rival/compare',
        data,
      })
        .then(res => {
          store.commit('RIVALCOMPARE', res.data.rivalCompare)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //라이벌 참가 신청 수락, 거절
  rivalRequestPermit(data) {
    return new Promise((resolve, reject) => {
      axiosPatch({
        url: '/user/rival/request/permit',
        data,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          switch (err.status.errorCode) {
            case 3:
              store.commit('RIVALMODALTEXT', '상대방이 요청을 취소하였습니다.')
              break
            case 4:
              store.commit(
                'RIVALMODALTEXT',
                '해당 유저는 이미 라이벌 그룹에 속해있습니다.',
              )
              break
            case 5:
              store.commit(
                'RIVALMODALTEXT',
                '해당 유저의 라이벌 그룹의 인원이 초과되었습니다.',
              )
              break
            default:
              store.commit('RIVALMODALTEXT', '참가신청 수락 실패')
              break
          }
          store.commit('RIVALMODALSTATE', true)
          reject(err)
        })
    })
  },

  //라이벌 초대 수락, 거절
  rivalInvitePermit(data) {
    return new Promise((resolve, reject) => {
      axiosPatch({
        url: '/user/rival/invite/permit',
        data,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          switch (err.status.errorCode) {
            case 3:
              store.commit('RIVALMODALTEXT', '상대방이 초대를 취소하였습니다.')
              break
            case 4:
              store.commit(
                'RIVALMODALTEXT',
                '해당 유저는 이미 라이벌 그룹에 속해있습니다.',
              )
              break
            case 5:
              store.commit(
                'RIVALMODALTEXT',
                '해당 유저의 라이벌 그룹의 인원이 초과되었습니다.',
              )
              break
            default:
              store.commit('RIVALMODALTEXT', '초대 수락 실패')
              break
          }
          store.commit('RIVALMODALSTATE', true)
          reject(err)
        })
    })
  },

  //라이벌 그룹 탈퇴
  leaveRivalGroup(data) {
    return new Promise((resolve, reject) => {
      axiosDelete({
        url: '/user/rival/withdraw',
        data,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //라이벌 그룹 강퇴
  kickRivalGroup(data) {
    return new Promise((resolve, reject) => {
      axiosDelete({
        url: '/user/rival/kick',
        data,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  cancelRivalApply(idx) {
    return new Promise((resolve, reject) => {
      axiosDelete({
        url: `/user/rival/cancel/${idx}`,
        idx,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}

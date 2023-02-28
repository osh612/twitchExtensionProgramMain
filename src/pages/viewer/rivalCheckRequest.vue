<template>
  <div class="rival-request-wrap">
    <div class="rival-check-header">
      <div class="go-back" @click="moveRouteTo('RivalRanking')">
        <SvgGoBack />
      </div>
      <span class="title">요청 확인</span>
    </div>
    <div class="rival-request-body">
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :class="{ active: currentTab === tab.id }"
          @click="changeTab(tab.id)"
        >
          <span>{{ tab.name }}</span>
        </div>
      </div>
      <div class="rival-tab-content">
        <div
          class="received-tab-content"
          v-show="this.currentTab === 'Received'"
        >
          <div
            class="received_content"
            v-for="(data, index) in receivedList"
            :key="index"
          >
            <span>{{ data.displayName }}</span>
            <div class="rival-tab-button-wrap">
              <button
                class="rival-tab-button"
                @click="confirmRival(data.idx, 2)"
              >
                거절
              </button>
              <button
                class="rival-tab-button accept"
                @click="confirmRival(data.idx, 1)"
              >
                수락
              </button>
            </div>
          </div>
          <div
            class="received_content not_received"
            v-if="receivedList.length === 0"
          >
            <span>받은 요청이 없습니다</span>
          </div>
        </div>
        <div class="received_content" v-show="this.currentTab === 'Send'">
          <div class="received-tab-content" v-show="this.currentTab === 'Send'">
            <div
              class="received_content"
              v-for="(data, index) in sendList"
              :key="index"
            >
              <span>{{ data.displayName }}</span>
              <div class="rival-tab-button-wrap">
                <button
                  class="rival-tab-button reject"
                  @click="cancelRivalRequest(data.idx)"
                >
                  요청 취소
                </button>
              </div>
            </div>
            <div
              class="received_content not_received"
              v-if="sendList.length === 0"
            >
              <span>보낸 요청이 없습니다</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rival-request-footer">
      * 요청은 10개 까지만 받을 수 있으며, 그 이상은 자동 거절 됩니다.
    </div>
  </div>
</template>
<script>
// import store from '../../vuex/store'
import { mapState } from 'vuex'
import rivalApiService from '../../api/axios/rival-api-service'
import SvgGoBack from '../../components/svgs/SvgGoBack.vue'
import twitchChannelStorage from '../../storage/twitch-channel-storage'
import twitchUidStorage from '../../storage/twitch-uid-storage'
import store from '../../vuex/store'
// import rivalApiService from '../../api/axios/rival-api-service'

export default {
  name: 'viewer-rival-check-request',
  components: { SvgGoBack },
  data() {
    return {
      currentTab: 'Received',
      tabs: [
        {
          name: '받은 요청',
          id: 'Received',
        },
        {
          name: '보낸 요청',
          id: 'Send',
        },
      ],
    }
  },
  props: [],
  async mounted() {
    this.getMyList()
    this.getRivalGroupInfo()
  },
  computed: {
    ...mapState({
      rivalIdx: state => state.rivalGroupInfo.rivalGroupIdx,
      rivalInviteReceive: state => state.rivalInviteReceive,
      rivalRequestReceive: state => state.rivalRequestReceive,
      rivalInviteSend: state => state.rivalInviteSend,
      rivalRequestSend: state => state.rivalRequestSend,
    }),

    //모든 받은 요청 리스트 데이터
    receivedList() {
      //console.log('rivalInviteReceive', this.rivalInviteReceive)
      //console.log('rivalRequestReceive', this.rivalRequestReceive)
      if (
        this.rivalIdx === 0 ||
        this.rivalIdx === null ||
        this.rivalIdx === undefined
      ) {
        return this.rivalInviteReceive
      } else {
        return this.rivalRequestReceive
      }
    },

    //모든 보낸 요청 리스트 데이터
    sendList() {
      if (
        this.rivalIdx === 0 ||
        this.rivalIdx === null ||
        this.rivalIdx === undefined
      ) {
        //console.log('보낸 참가 신청', store.getters.getRivalRequestSend)
        return this.rivalRequestSend
      } else {
        //console.log('보낸 참가 요청(초대)', store.getters.getRivalInviteSend)
        return this.rivalInviteSend
      }
    },
  },
  methods: {
    //라우터 이동
    moveRouteTo(routeName) {
      this.$router.push({
        name: routeName,
      })
    },
    //탭 변경
    changeTab(id) {
      this.currentTab = id
    },

    //모든 리스트 데이터 가져오기
    getMyList() {
      this.getRivalSendRequest()
      this.getRivalReceivedReqeust()
      this.getRivalSendInvite()
      this.getRivalReceivedInvite()
    },

    //라이벌 그룹 정보 가져오기
    getRivalGroupInfo() {
      let data = {
        channelId: twitchChannelStorage.get(),
        userId: twitchUidStorage.get(),
      }
      rivalApiService.getRivalGroup(data)
    },

    //라이벌 참가신청한 리스트 가져오기
    getRivalSendRequest() {
      let data = {
        channelId: twitchChannelStorage.get(),
        sendId: twitchUidStorage.get(),
      }
      //console.log('getRivalSendRequest', data)
      rivalApiService.getRivalSendRequest(data)
    },

    //라이벌 초대한 리스트 가져오기
    getRivalSendInvite() {
      if (this.rivalIdx === 0 || this.rivalIdx === null) {
        return
      }
      let data = {
        userRivalGroupIdx: this.rivalIdx,
        sendId: twitchUidStorage.get(),
      }
      //console.log('getRivalSendInvite', data)
      rivalApiService.getRivalSendInvite(data)
    },

    //라이벌 받은 참가신청 리스트 가져오기
    getRivalReceivedReqeust() {
      if (this.rivalIdx === 0 || this.rivalIdx === null) {
        return
      }
      let data = {
        channelId: twitchChannelStorage.get(),
        rivalGroupIdx: this.rivalIdx,
        receiveId: twitchUidStorage.get(),
      }
      //console.log('getRivalReceivedRequest', data)
      rivalApiService.getRivalReceivedRequest(data)
    },

    //라이벌 받은 초대 리스트 가져오기
    getRivalReceivedInvite() {
      let data = {
        channelId: twitchChannelStorage.get(),
        receiveId: twitchUidStorage.get(),
      }
      //console.log('getRivalReceivedInvite', data)
      rivalApiService.getRivalReceivedInvite(data)
    },

    //참가 신청, 초대 구분
    confirmRival(idx, isAccept) {
      //console.log('confirmRival', this.rivalIdx)
      if (this.rivalIdx === 0) {
        this.confirmInvitation(idx, isAccept)
      } else {
        this.confirmRequest(idx, isAccept)
      }
    },

    //참가 신청 수락 거절
    async confirmRequest(idx, isAccept) {
      let data = {
        idx: idx,
        quizGroupIdx: store.getters.getQuizGroup,
        permit: isAccept,
      }
      //console.log('rivalRequestPermit', data)
      await rivalApiService.rivalRequestPermit(data)
      this.getMyList()
    },

    //초대 수락 거절
    async confirmInvitation(idx, isAccept) {
      let data = {
        idx: idx,
        quizGroupIdx: store.getters.getQuizGroup,
        permit: isAccept,
      }
      //console.log('rivalInvitePermit', data)
      await rivalApiService.rivalInvitePermit(data)
      this.getMyList()
    },

    //참가요청, 초대 요청 취소
    async cancelRivalRequest(idx) {
      await rivalApiService.cancelRivalApply(idx)
      //console.log('cancelRivalApply', idx)
      this.getMyList()
    },
  },
}
</script>
<style lang="scss" scoped>
.rival-request-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .rival-check-header {
    height: 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 17px;

    .go-back {
      position: relative;
      width: 13px;
      height: 13px;
      margin-right: 6px;

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease-in-out;

        &:hover {
          cursor: pointer;
          opacity: 0.9;
        }
        &:active {
          opacity: 1;
        }
      }
    }
    .title {
      color: #fff;
      // font-size: 12px;
      // font-weight: bold;
      // line-height: normal;
      letter-spacing: -0.24px;
      font-size: 12px;
      font-family: 'Noto Sans KR', sans-serif;
      padding-bottom: 1px;
    }
  }

  .rival-request-body {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .tabs {
      display: flex;
      flex-direction: row;
      margin-bottom: 4px;
      .tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 28px;
        background-color: #000;
        border-top: 1px solid #707070;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
          border-top: 1px solid #8b41cb;
          background-color: #333333;
        }
        &:active {
          border-top: 1px solid #8b41cb;
        }
        &.active {
          border-top: 1px solid #8b41cb;
          pointer-events: none;
        }
      }
    }
    .rival-tab-content {
      flex: 1 1 auto;
      height: 0px;
      width: 100%;
      flex-direction: column;
      overflow-y: auto;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding-right: 3px;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 2px;
      }

      .received-tab-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .received_content {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-weight: normal;
          color: #fff;
          background-color: #262626;
          padding: 8px 12px;
          margin-bottom: 4px;

          &:last-child {
            margin-bottom: 0;
          }

          &.not_received {
            justify-content: center;
          }

          span {
            font: normal normal normal 11px/11px;
          }

          .rival-tab-button-wrap {
            display: flex;
            flex-direction: row;

            .rival-tab-button {
              width: 40px;
              height: 20px;
              background-color: #767676;
              border-radius: 3px;
              justify-content: center;
              align-items: center;
              color: #fff;
              font-size: 11px;
              border: none;
              letter-spacing: -0.22px;
              cursor: pointer;
              transition: all 0.2s ease-in-out;
              font-family: 'Noto Sans KR', sans-serif;
              &:hover {
                opacity: 0.8;
              }
              &:active {
                opacity: 1;
              }
              &.accept {
                margin-left: 6px;
                background-color: #af51ff;
              }
              &.reject {
                margin-left: 6px;
                width: 60px;
                font: normal normal normal 11px/12px;
                background-color: #af51ff;
              }
            }
          }
        }
      }
      .send-tab-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .rival-request-footer {
    font-size: 10px;
    text-align: left;
    letter-spacing: -0.2px;
    color: #767676;
  }
}
</style>

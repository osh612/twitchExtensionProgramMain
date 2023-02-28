<template>
  <div class="rival-user-wrap">
    <div class="rival-user-header">
      <div class="go-back" @click="moveRouteTo('RivalRanking')">
        <SvgGoBack />
      </div>
      <span class="title">라이벌 추가</span>
    </div>
    <div class="rival-user-body">
      <div class="rival-user-search-wrap">
        <div class="rival-user-search">
          <div class="rival-user-search-input">
            <input
              type="text"
              placeholder="유저 닉네임을 입력하세요."
              v-model="searchingValue"
            />
          </div>
          <div class="rival-user-search-button" @click="searchRivalUser">
            <SvgMagnifier />
          </div>
        </div>
        <div class="input_info">
          데카킬에 권한 부여를 완료한 유저만 초대할 수 있습니다.
        </div>
      </div>
      <div
        class="rival-user-item"
        v-if="
          this.searchedRivalUser.displayName !== null &&
          this.searchedRivalUser.displayName !== undefined
        "
      >
        <div class="rival-user-item-name">
          {{ searchedRivalUser.displayName }}
        </div>
        <button v-if="!findMe">본인</button>
        <button v-else-if="!alreadySended" @click="offerRival">
          요청 하기
        </button>
        <button v-else-if="alreadyJoin">참여중</button>
        <button v-else-if="alreadySended">요청중</button>
      </div>
      <div
        class="rival-user-item none"
        v-if="this.searchedRivalUser.displayName === null"
      >
        <div
          class="rival-user-item none"
          v-if="
            this.searchedRivalUser.displayName === null &&
            this.searchedRivalUser.id === null
          "
        >
          검색된 유저가 없습니다
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import store from '../../vuex/store'
import { mapState } from 'vuex'
import rivalApiService from '../../api/axios/rival-api-service'
import SvgGoBack from '../../components/svgs/SvgGoBack.vue'
import SvgMagnifier from '../../components/svgs/SvgMagnifier.vue'
import twitchChannelStorage from '../../storage/twitch-channel-storage'
import twitchUidStorage from '../../storage/twitch-uid-storage'
import store from '../../vuex/store'

export default {
  name: 'viewer-rival-add-user',
  components: { SvgGoBack, SvgMagnifier },
  data() {
    return {
      userRivalGroupIdx: 1,
      currentTab: 'Received',
      searchingValue: '',
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
      isActive: false,
    }
  },

  props: [],

  mounted() {},

  computed: {
    ...mapState({
      rivalIdx: state => state.rivalGroupInfo.rivalGroupIdx,
      rivalInviteSend: state => state.rivalInviteSend,
      rivalRequestSend: state => state.rivalRequestSend,
      searchedRivalUser: state => state.searchedRivalUser,
      quizGroupIdx: state => state.quiz_group_idx,
      rivalRank: state => state.rivalRank,
    }),

    //검색한 사람이 본인인지 여부
    findMe() {
      if (twitchUidStorage.get() !== this.searchedRivalUser.id) {
        return true
      } else {
        return false
      }
    },

    //이미 보낸 요청인지 여부
    alreadySended() {
      if (this.sendList.length === 0 || this.sendList === undefined) {
        //console.log('요청 리스트 없음')
        return false
      } else {
        //console.log('요청 리스트 있음')
        //console.log('요청 리스트', this.sendList)
        const found = this.sendList.filter(
          e => e.displayName === this.searchedRivalUser.displayName,
        )
        if (found.length === 0) {
          return false
        } else {
          //console.log('검색된 유저', this.searchedRivalUser.displayName)
          console.log('found', found)
          if (this.searchedRivalUser.displayName === found[0].displayName) {
            //console.log('요청 중')
            return true
          } else {
            //console.log('요청 안됨')
            return false
          }
        }
      }
    },

    alreadyJoin() {
      const found = this.rivalRank.filter(
        e => e.displayName === this.searchedRivalUser.displayName,
      )
      if (found.length === 0) {
        return false
      } else {
        //console.log('기존랭크검색내역', found)
        if (this.searchedRivalUser.displayName === found[0].displayName) {
          //console.log('참여중')
          return true
        } else {
          //console.log('그룹 없음')
          return false
        }
      }
    },

    //모든 보낸 리스트 데이터
    sendList() {
      if (
        this.rivalIdx === 0 ||
        this.rivalIdx === null ||
        this.rivalIdx === undefined
      ) {
        //보낸 참가 신청 리스트
        //console.log('보낸 참가신청 리스트', this.rivalRequestSend)
        return this.rivalRequestSend
      } else {
        //보낸 참가 요청(초대) 리스트
        console.log('보낸 참가 요청(초대) 리스트', this.rivalInviteSend)
        return this.rivalInviteSend
      }
    },
  },
  methods: {
    //라우터 이동(뒤로 가기)
    moveRouteTo(routeName) {
      store.commit('SEARCHEDRIVALUSER', {})
      //console.log('SEARCHEDRIVALUSER', store.getters.getSearchedRivalUser)
      this.$router.push({
        name: routeName,
      })
    },

    //라이벌 보낸/받은 요청 탭 변경
    changeTab(id) {
      this.currentTab = id
    },

    //라이벌 검색하기
    searchRivalUser() {
      const data = {
        channelId: twitchChannelStorage.get(),
        displayName: this.searchingValue,
      }
      if (data.searchingValue === '') {
        return //console.log('유저를 입력하세요')
      }
      //console.log('data', data)
      rivalApiService.searchRival(data)
    },

    //라이벌 idx 조회
    async getRivalIdx() {
      const data = {
        channelId: twitchChannelStorage.get(),
        userId: twitchUidStorage.get(),
      }
      await rivalApiService.getRivalGroup(data)
    },

    //라이벌 랭킹 조회
    async getRivalRank() {
      const data = {
        quizGroupIdx: this.quizGroupIdx,
        rivalGroupIdx: this.rivalIdx,
      }
      await rivalApiService.getRivalRank(data)
    },

    //라이벌 모든 요청 보내기
    async offerRival() {
      if (
        this.searchedRivalUser.userRivalGroupIdx === null ||
        this.searchedRivalUser.userRivalGroupIdx === undefined ||
        this.searchedRivalUser.userRivalGroupIdx === 0
      ) {
        //console.log('참가요청(초대) 전송')
        await this.inviteRival()
      } else {
        //console.log('참가 신청 전송')
        await this.requestJoinRival()
      }
      await this.getRivalIdx()
      await this.getMyList()
    },

    //라이벌 참가 요청(초대) 보내기
    async inviteRival() {
      const data = {
        channelId: twitchChannelStorage.get(),
        sendId: twitchUidStorage.get(),
        receiveId: this.searchedRivalUser.id,
      }
      await rivalApiService.inviteRival(data)
    },

    //라이벌 참가 신청 보내기
    async requestJoinRival() {
      const data = {
        channelId: twitchChannelStorage.get(),
        userRivalGroupIdx: this.searchedRivalUser.userRivalGroupIdx,
        sendId: twitchUidStorage.get(),
        receiveId: this.searchedRivalUser.id,
      }
      await rivalApiService.requestJoinRival(data)
    },

    //모든 보낸 리스트 가져오기
    getMyList() {
      this.getRivalSendRequest()
      this.getRivalSendInvite()
    },

    //보낸 초대 리스트 가져오기
    async getRivalSendInvite() {
      let data = {
        userRivalGroupIdx: this.rivalIdx,
        sendId: twitchUidStorage.get(),
      }
      //console.log('보낸 초대 리스트 파라미터', data)
      await rivalApiService.getRivalSendInvite(data)
    },

    //보낸 참가 신청 리스트 가져오기
    async getRivalSendRequest() {
      let data = {
        channelId: twitchChannelStorage.get(),
        sendId: twitchUidStorage.get(),
      }
      //console.log('보낸 참가 신청 리스트 파라미터', data)
      await rivalApiService.getRivalSendRequest(data)
    },
  },
}
</script>
<style lang="scss" scoped>
.rival-user-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .rival-user-header {
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
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: bold;
      font-size: 12px;
      padding-bottom: 1px;
    }
  }

  .rival-user-body {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

    .rival-user-search-wrap {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      .rival-user-search {
        display: flex;
        width: 100%;
        height: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 5px;

        .rival-user-search-input {
          display: flex;
          width: calc(100% - 30px);
          height: 100%;
          align-items: center;
          justify-content: center;

          input {
            width: 90%;
            height: 100%;
            border: none;
            outline: none;
            background: none;
            text-align: left;
            font-size: 11px;
            line-height: 12px;
            font-family: 'Noto Sans KR', sans-serif;
            letter-spacing: -0.22px;
            color: #333333;
          }
        }
        .rival-user-search-button {
          display: flex;
          width: 30px;
          height: 30px;
          align-items: center;
          justify-content: center;
          background-color: #8b41cb;
          cursor: pointer;
          transition: all 0.1s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:active {
            opacity: 1;
          }
        }
      }
      .input_info {
        text-align: left;
        font-size: 10px;
        line-height: 12px;
        font-family: 'Noto Sans KR', sans-serif;
        letter-spacing: -0.2px;
        color: #767676;
      }
    }
    .rival-user-item {
      width: 100%;
      height: 36px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      background-color: #262626;
      padding: 8px 12px;
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }

      &.none {
        justify-content: center;
        font-size: 11px;
        color: #767676;
      }

      // .rival-user-item-left {
      //   display: flex;
      //   flex-direction: row;

      .rival-user-item-name {
        font-size: 11px;
        line-height: 12px;
        font-family: 'Noto Sans KR', sans-serif;
      }
      // .rival-user-item-rank {
      //   font: normal normal normal 11px/12px Noto Sans CJK KR;
      //   margin-right: 8px;
      //   color: #a473cd;
      // }
      // }

      button {
        width: 62px;
        height: 20px;
        background-color: #8b41cb;
        border: none;
        font-size: 11px;
        letter-spacing: -0.22px;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        font-size: 11px;
        line-height: 12px;
        font-family: 'Noto Sans KR', sans-serif;
        &:hover {
          opacity: 0.8;
        }
        &:active {
          opacity: 1;
        }
      }
    }
  }
}
</style>

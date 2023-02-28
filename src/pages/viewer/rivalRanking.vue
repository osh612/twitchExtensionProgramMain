<template>
  <div class="rival-rank-wrap">
    <div class="rival-header">
      <div class="rival_left_box">
        <SvgMiniDecakill />
        <span>라이벌 랭킹</span>
      </div>
      <div class="right_box">
        <div class="headerButton" @click="moveRouteTo('RivalCheckRequest')">
          <SvgMessageEnvelope />
          <img
            v-if="receivedList.length !== 0"
            class="newRival"
            src="../../components/svgs/SvgNewRival.svg"
          />
        </div>
        <div class="headerButton" @click="refreshPage()">
          <SvgRefresh />
        </div>
      </div>
    </div>
    <div class="rival-table-wrap">
      <table>
        <tr class="tableHead">
          <th v-for="(tableHead, index) in tableHead" :key="index">
            {{ tableHead }}
          </th>
        </tr>
        <!-- <tr
          class="entireRank"
          v-if="myRealTimeRank.length > 0 && rivalRank.length === 0"
        >
          <td class="rank-td">
            <div>
              {{ myRealTimeRank.rank }}
            </div>
          </td>
          <td class="nickname-td">
            <div class="nickname-td-data">
              {{ myRealTimeRank.displayName }}
            </div>
          </td>
          <td class="kill-td">{{ myRealTimeRank.kill }}</td>
          <td class="death-td">{{ myRealTimeRank.death }}</td>
          <td class="multiKill-td">
            {{ covertKill(myRealTimeRank.multiKill) }}
          </td>
        </tr> -->
        <tr class="rival-none-wrap" v-if="rivalRank.length === 0">
          <td colspan="5">
            <div class="rival-none">
              <span class="t-1">함께 경쟁할 유저를 초대해보세요.</span>
              <span>순위에 따라 추가 보상을 드립니다.</span>
            </div>
          </td>
        </tr>
        <tr
          class="entireRank"
          v-for="data in rivalRank"
          :key="data.userId"
          v-show="rivalRank.length > 0"
          :style="{
            backgroundColor: data.userId === userId ? '#4B1F71' : '',
          }"
        >
          <td class="rank-td">
            <!-- <div class="rankUpDownIcon">
              <span v-if="rankIcon(data.ranks, data.before_ranks) === '-'">
                {{ rankIcon(data.ranks, data.before_ranks) }}
              </span>
              <svg-rank-up-icon
                v-if="rankIcon(data.ranks, data.before_ranks) === 'up'"
              />
              <svg-rank-down-icon
                v-if="rankIcon(data.ranks, data.before_ranks) === 'down'"
              />
            </div> -->
            <div v-if="data.rank">
              {{ data.rank }}
            </div>
            <div v-else>-</div>
          </td>
          <td
            class="nickname-td"
            :class="{ active: data.userId === selectedUser }"
          >
            <div class="nickname-td-data" @click="showHeadToHead(data.userId)">
              <span>{{ data.displayName }}</span>
            </div>
            <div class="rivalInfo">
              <div class="info-header">
                <span>상대전적</span>
                <div class="info-header-right" v-if="master === 1">
                  <div class="line-icon"></div>
                  <div class="kick-icon" @click="kickRivalGroup">
                    <SvgSquareWithArrow />
                  </div>
                </div>
              </div>
              <div class="info-footer">
                <div class="infoBox-wrap">
                  <div class="infoBox kill">승</div>
                  <div class="infoBox-data">
                    {{ rivalCompare.myKill }}
                  </div>
                </div>
                <div class="infoBox-wrap">
                  <div class="infoBox death">패</div>
                  <div class="infoBox-data">
                    {{ rivalCompare.myDeath }}
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td class="kill-td" v-if="data.kill">{{ data.kill }}</td>
          <td class="kill-td noData" v-else>-</td>
          <td class="death-td" v-if="data.death">{{ data.death }}</td>
          <td class="death-td noData" v-else>-</td>
          <td class="multiKill-td">{{ covertKill(data.multiKill) }}</td>
        </tr>
      </table>
    </div>
    <div class="rival-footer">
      <div class="left_box">
        <div
          class="footerButton exit"
          @click="leaveRivalGroup()"
          :class="{ none: rivalIdx === 0 || rivalIdx === undefined }"
        >
          <SvgExitButton />
          <span>나가기</span>
        </div>
      </div>
      <div class="footerButton" @click="moveRouteTo('RivalAddUser')">
        <SvgCross />
        <span>라이벌 추가</span>
      </div>
    </div>
  </div>
</template>
<script>
import * as animationData1 from '@/assets/json/rank_load.json'
import SvgMessageEnvelope from '../../components/svgs/SvgMessageEnvelope.vue'
import SvgRefresh from '../../components/svgs/SvgRefresh.vue'
import SvgMiniDecakill from '../../components/svgs/SvgMiniDecakill.vue'
// import store from '../../vuex/store'
import rivalApiService from '../../api/axios/rival-api-service'
import SvgSquareWithArrow from '../../components/svgs/SvgSquareWithArrow.vue'
import twitchChannelStorage from '../../storage/twitch-channel-storage'
import twitchUidStorage from '../../storage/twitch-uid-storage'
import { mapState } from 'vuex'
import store from '../../vuex/store'
import SvgCross from '../../components/svgs/SvgCross.vue'
import SvgExitButton from '../../components/svgs/SvgExitButton.vue'

export default {
  name: 'viewer-rival-ranking',
  components: {
    SvgMessageEnvelope,
    SvgRefresh,
    SvgMiniDecakill,
    SvgSquareWithArrow,
    SvgCross,
    SvgExitButton,
  },
  data() {
    return {
      tableHead: ['순위', '닉네임', '킬', '데스', '멀티킬'],
      options1: { animationData: animationData1.default },
      animationSpeed: 1,
      headToHead: false,
      selectedUser: null,
    }
  },
  props: [],
  async mounted() {
    await this.getRivalInfo()
    await this.getRivalRank()
    this.getMyList()
  },
  computed: {
    ...mapState({
      myRealTimeRank: state => state.myRealTimeRank,
      rivalRank: state => state.rivalRank,
      rivalIdx: state => state.rivalGroupInfo.rivalGroupIdx,
      master: state => state.rivalGroupInfo.master,
      quizGroupIdx: state => state.quiz_group_idx,
      rivalCompare: state => state.rivalCompare,
      rivalInviteReceive: state => state.rivalInviteReceive,
      rivalRequestReceive: state => state.rivalRequestReceive,
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

    userId() {
      return twitchUidStorage.get()
    },
    channelId() {
      return twitchChannelStorage.get()
    },
  },
  methods: {
    //페이지 새로 고침
    async refreshPage() {
      await this.getRivalInfo()
      await this.getRivalRank()
    },
    //라이벌 그룹 idx 가져오기
    async getRivalInfo() {
      const data = {
        channelId: this.channelId,
        userId: this.userId,
      }
      await rivalApiService.getRivalGroup(data)
    },

    //라이벌 랭킹 가져오기
    async getRivalRank() {
      const data = {
        quizGroupIdx: this.quizGroupIdx,
        rivalGroupIdx: this.rivalIdx,
      }
      //console.log(data)
      await rivalApiService.getRivalRank(data)
    },

    //모든 받은 리스트 가져오기
    getMyList() {
      this.getRivalReceivedReqeust()
      this.getRivalReceivedInvite()
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

    //라이벌 그룹 나가기
    async leaveRivalGroup() {
      const data = {
        channelId: twitchChannelStorage.get(),
        userRivalGroupIdx: this.rivalIdx,
        userId: twitchUidStorage.get(),
      }
      //console.log('leaveRivalGroupData', data)
      await rivalApiService.leaveRivalGroup(data)
      await this.getRivalInfo()
      this.getRivalRank()
    },

    //선택 유저 추방하기
    async kickRivalGroup() {
      const data = {
        channelId: twitchChannelStorage.get(),
        userRivalGroupIdx: this.rivalIdx,
        userId: twitchUidStorage.get(),
        quizGroupIdx: this.quizGroupIdx,
        kickId: this.selectedUser,
      }
      //console.log('kickRivalGroupData', data)
      await rivalApiService.kickRivalGroup(data)
      this.getRivalRank()
    },

    //라우트 이동
    moveRouteTo(routeName) {
      store.commit('SEARCHEDRIVALUSER', {})
      this.$router.push({
        name: routeName,
      })
    },

    //상대전적 데이터 가져오기
    getRivalCompare() {
      const data = {
        quizGroupIdx: this.quizGroupIdx,
        userId: twitchUidStorage.get(),
        rivalId: this.selectedUser,
      }
      //console.log('getRivalCompareData', data)
      rivalApiService.getRivalCompare(data)
    },

    // 상대전적 팝업창 열기
    showHeadToHead(user) {
      if (this.selectedUser === user) {
        this.selectedUser = null
        return
      }
      this.selectedUser = user
      this.getRivalCompare()
    },

    //랭킹 등락 정보 아이콘 변경 함수
    rankIcon(ranks, before_ranks) {
      let rankIcon = '-'
      if (ranks === before_ranks) {
        rankIcon = '-'
      } else {
        if (ranks > before_ranks) {
          rankIcon = 'down'
        } else if (ranks < before_ranks) {
          rankIcon = 'up'
        }
      }
      // rankIcon = ''
      // // //console.log('rankIcon')
      // // //console.log(rankIcon)
      return rankIcon
    },

    //콤보킬 텍스트 전환
    getComboKill(combokill, combokill_tmp) {
      let combokillText = '-'
      if (combokill == 0 && combokill_tmp == 0) {
        combokillText = '-'
      } else {
        if (combokill_tmp > combokill) {
          combokill = combokill_tmp
        }
        combokillText = combokill
      }
      return combokillText
    },

    //킬 텍스트 전환
    covertKill(kill) {
      let killText = ''
      if (kill > 10) {
        kill = 10
      }
      switch (kill) {
        case 1:
          killText = '싱글킬'
          break
        case 2:
          killText = '더블킬'
          break
        case 3:
          killText = '트리플킬'
          break
        case 4:
          killText = '쿼드라킬'
          break
        case 5:
          killText = '펜타킬'
          break
        case 6:
          killText = '헥사킬'
          break
        case 7:
          killText = '헵타킬'
          break
        case 8:
          killText = '옥타킬'
          break
        case 9:
          killText = '노나킬'
          break
        case 10:
          killText = '데카킬'
          break
        default:
          killText = '-'
          break
      }
      return killText
    },
  },
}
</script>
<style lang="scss" scoped>
.rival-rank-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .rival-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
    height: 17px;

    .rival_left_box {
      display: flex;
      align-items: center;
      height: 17px;

      svg {
        margin-right: 5px;
      }

      span {
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        padding-bottom: 1px;
      }
    }

    .right_box {
      display: flex;

      .headerButton:last-child {
        margin-left: 5px;
      }

      .headerButton {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 3px;
        background-color: #262626;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover {
          background-color: #555555;
        }
        &:active {
          background-color: #262626;
        }
        &:focus {
          outline: none;
        }
        .svg-message-envelope {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .svg-refresh {
          width: 20px;
          height: 20px;
        }

        .newRival {
          z-index: 1;
          position: absolute;
          left: 14px;
          top: -4px;
        }
      }
    }
  }

  .rival-table-wrap {
    position: relative;
    width: 100%;
    max-height: 297px;
    background-color: #262626;
    min-height: 135px;

    // height: 297px;

    table {
      width: 100%;
      font-size: 11px;
      border-collapse: collapse;
      cursor: default;
      .tableHead {
        top: 0;
        z-index: 1;
      }

      th {
        background: #000;
        color: #808080;
        height: 27px;
        font-weight: 700;
        vertical-align: middle;
      }

      td {
        height: 27px;
        font-size: 11px;
        text-align: center;
        vertical-align: middle;
      }
      .rival-none-wrap {
        height: 135px;
        background-color: #262626;
        .rival-none {
          display: flex;
          flex-direction: column;
          color: #888;

          .t-1 {
            margin-bottom: 3px;
          }
        }
      }

      .nickname-td {
        align-items: center;
        width: 88px;
        text-align: left;
        position: relative;

        .nickname-td-data {
          cursor: pointer;
        }
        .rivalInfo {
          position: absolute;
          top: 27px;
          transform: translateY(-70%) scale(0);
          transition: transform 0.1s ease-in;
          transform-origin: left;
          display: flex;
          flex-direction: column;
          background: #262626;
          z-index: 20;
          width: 100px;
          height: 50px;
          border: 1px solid black;
          overflow: visible;
          box-sizing: border-box;
          padding: 4px 9px;
          justify-content: space-between;

          .info-header {
            font-size: 11px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 20px;
            .info-header-right {
              width: 17px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .line-icon {
                height: 10px;
                border-left: 1px solid #707070;
              }
              .kick-icon {
                cursor: pointer;
              }

              &:first-child {
                margin-left: 5px;
              }
            }
          }

          .info-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 20px;

            .infoBox-wrap {
              display: flex;
              .infoBox {
                text-align: center;
                width: 24px;
                height: 14px;
                background-color: #8b41cb;
                font-size: 10px;
                font-family: 'Noto Sans KR', sans-serif;
                line-height: 13px;
                font: #fff;
                border-radius: 2px;

                &.death {
                  background-color: #eb4242;
                }
              }
              .infoBox-data {
                margin-left: 5px;
                text-align: center;
              }
            }
          }
        }
        &.active {
          .rivalInfo {
            transform: translateY(0) scale(1);
          }
        }
      }

      .nickname-td-data {
        width: 76px;
        margin-left: 6px;
        line-height: 27px;
        white-space: nowrap;
        // overflow: hidden;
        text-overflow: ellipsis;
        line-height: 27px;
      }

      .entireRank {
        display: relative;
      }

      #my_tag {
        width: 18px;
        height: 11px;
        background-color: #f55400;
        padding: 2px 3px;
        border-radius: 3px;
        font-weight: 800;
      }

      .kill-td {
        width: 34px;
        color: #b09bff;
      }

      .death-td {
        width: 34px;
        color: #f55400;

        &.noData {
          color: #fff;
        }
      }
      .noData {
        color: #fff;
      }

      .entireRank:nth-child(odd) {
        background: #262626;
      }

      .entireRank:nth-child(2n) {
        background: #343434;
      }
    }
  }
  .rival-table-wrap::-webkit-scrollbar {
    width: 4px;
  }

  .rival-table-wrap::-webkit-scrollbar-track {
    background: transparent;
  }

  .rival-table-wrap::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 2px;
  }

  .rival-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;

    .footerButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 91px;
      height: 27px;
      background: #262626 0% 0% no-repeat padding-box;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      opacity: 1;

      &.exit {
        width: 71px;
      }
      &:hover {
        background-color: #555555;
      }
      &:active {
        background-color: #262626;
      }
      &:focus {
        outline: none;
      }
      &.none {
        display: none;
      }

      span {
        text-align: right;
        font-weight: normal;
        font-size: 11px;
        letter-spacing: -0.22px;
        color: #767676;
        opacity: 1;
        margin-left: 4px;
        font-family: 'Noto Sans KR', sans-serif;
      }
    }
  }
}
</style>

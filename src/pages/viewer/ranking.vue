<template>
  <div class="rank-wrap">
    <div class="rank_header">
      <SvgMiniDecakill />
      <span>랭킹</span>
    </div>
    <div class="loading_rank" v-if="rankingData.length === 0">
      <lottie
        class="loading_icon"
        :options="options1"
        :width="130"
        :height="130"
      />
      현재 랭킹 집계 중입니다.
    </div>
    <div class="table-wrap" v-else>
      <table>
        <tr class="rankTableHead">
          <th v-for="(tableHead, index) in tableHead" :key="index">
            {{ tableHead }}
          </th>
        </tr>
        <tr class="myRank" v-if="myRankingData">
          <td class="rank-td">
            <div class="myRankData">
              <!-- <span
                v-if="
                  rankIcon(myRankingData.ranks, myRankingData.before_ranks) ===
                  '-'
                "
              >
                {{ rankIcon(myRankingData.ranks, myRankingData.before_ranks) }}
              </span>
              <svg-rank-up-icon
                v-if="
                  rankIcon(myRankingData.ranks, myRankingData.before_ranks) ===
                  'up'
                "
              />
              <svg-rank-down-icon
                v-if="
                  rankIcon(myRankingData.ranks, myRankingData.before_ranks) ===
                  'down'
                "
              /> -->
              <div>
                {{ myRankingData.rank }}
              </div>
            </div>
          </td>
          <td class="nickname-td" id="mynickname">
            <div class="myNickname_data">
              <div>
                {{ myRankingData.displayName }}
              </div>
              <span id="my_tag">MY</span>
            </div>
          </td>
          <td class="kill-td">{{ myRankingData.kill }}</td>
          <td class="comboKill-td">
            {{
              getComboKill(myRankingData.comboKill, myRankingData.comboKillTmp)
            }}
          </td>
          <td class="multiKill-td">
            {{ covertKill(myRankingData.multiKill) }}
          </td>
          <td class="death-td">{{ myRankingData.death }}</td>
        </tr>
        <tr
          class="entireRank"
          v-for="(data, index) in rankingData.slice(0, 100)"
          :key="index"
        >
          <td class="rank-td">
            <div class="myRankData">
              <!-- <span v-if="rankIcon(data.ranks, data.before_ranks) === '-'">
                {{ rankIcon(data.ranks, data.before_ranks) }}
              </span>
              <svg-rank-up-icon
                v-if="rankIcon(data.ranks, data.before_ranks) === 'up'"
              />
              <svg-rank-down-icon
                v-if="rankIcon(data.ranks, data.before_ranks) === 'down'"
              /> -->
              <div>
                {{ data.rank }}
              </div>
            </div>
          </td>
          <td class="nickname-td">
            <div class="nickname-td-data">
              {{ data.displayName }}
            </div>
          </td>
          <td class="kill-td">{{ data.kill }}</td>
          <td class="comboKill-td">
            {{ getComboKill(data.comboKill, data.comboKillTmp) }}
          </td>
          <td class="multiKill-td">{{ covertKill(data.multiKill) }}</td>
          <td class="death-td">{{ data.death }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
// import rankDataimport from '@/assets/temp/rankData.js'
import Lottie from '@/components/Lottie.vue'
// import SvgRankUpIcon from '@/components/svgs/SvgRankUpIcon.vue'
// import SvgRankDownIcon from '@/components/svgs/SvgRankDownIcon.vue'
import * as animationData1 from '@/assets/json/rank_load.json'
import SvgMiniDecakill from '../../components/svgs/SvgMiniDecakill.vue'

export default {
  name: 'viewer-ranking',
  components: {
    lottie: Lottie,
    SvgMiniDecakill,
  },
  data() {
    return {
      tableHead: ['순위', '닉네임', '킬', '콤보킬', '멀티킬', '데스'],
      options1: { animationData: animationData1.default },
      animationSpeed: 1,
    }
  },
  props: ['rankingData', 'myRankingData'],
  mounted() {
    // //console.log('rankingData', this.rankingData)
    // //console.log('myRankingData', this.myRankingData)
    // // //console.log(this.rankingData)
    // // //console.log('myrankingData')
    // // //console.log(this.myRankingData)
    // // //console.log('tableHead')
    // // //console.log(this.tableHead)
    // //console.log(this.rankingData)
  },
  methods: {
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

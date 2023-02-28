<template>
  <div class="statusBar" :class="{ active: isMenuActive }">
    <span> MY </span>
    <div class="bar"></div>
    <div class="statusBar_data_wrap">
      <div class="statusBar_data">
        <svg-kill />
        <span>{{ isDataUndefined(this.myRankingData.kill) }} 킬</span>
      </div>
      <div
        class="statusBar_data"
        v-if="
          this.myRankingData.rank <= 3 || this.myRankingData.rank === undefined
        "
      >
        <svg-throphy />
        <span>{{ isDataUndefined(this.myRankingData.rank) }} 등</span>
      </div>
      <div class="statusBar_data" v-if="this.myRankingData.rank > 3">
        <svg-throphy />
        <span v-if="myPerRank !== NaN"
          >상위 {{ isDataUndefined(myPerRank) }} %</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../vuex/store'

import SvgThrophy from '@/components/svgs/SvgThrophy.vue'
import SvgKill from '@/components/svgs/SvgKill.vue'
// import SvgMultiKill from '@/components/svgs/SvgMultiKill.vue'

export default {
  name: 'statusBar',
  components: {
    SvgThrophy,
    SvgKill,
    // SvgMultiKill,
  },
  data() {
    return {}
  },
  props: ['rankingData', 'myRankingData', 'isMenuActive'],
  created() {},
  mounted() {},
  computed: {
    myRealTimeRank() {
      return store.getters.getMyRealTimeRank
    },
    myPerRank() {
      const calc = (this.myRealTimeRank.rank / this.myRealTimeRank.total) * 100
      // //console.log(calc)
      return calc
    },
  },
  methods: {
    isDataUndefined(data) {
      if (
        data === undefined ||
        data === null ||
        data.length === 0 ||
        isNaN(data) === true
      ) {
        return '-'
      } else {
        return data
      }
    },
    myRankTotal(rank, total) {
      // //console.log(rank)
      // //console.log(total)
      const rankPercentage = (rank / total) * 100
      // //console.log(rankPercentage)
      return rankPercentage
    },
  },
}
</script>

<style lang="scss" scoped></style>

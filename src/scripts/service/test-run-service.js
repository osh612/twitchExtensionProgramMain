import PickCountingService from '@/scripts/service/pick-counting-service'
import store from '@/vuex/store'
import * as types from '@/vuex/mutation_types'

let total
let picks = new Array()
picks = [0, 0, 0, 0, 0]

export default {
  testRunCase1() {
    let countPick = function () {
      // for (let i = 0; i < 5; i++) {
      picks[0] += Math.floor(Math.random() * 350) + 250
      picks[1] += Math.floor(Math.random() * 350) + 210
      picks[2] += Math.floor(Math.random() * 100) + 5
      picks[3] += Math.floor(Math.random() * 100) + 10
      picks[4] += Math.floor(Math.random() * 250) + 9
      // }
      for (let i = 0; i < 5; i++) {
        total = picks[i]++
      }
      const pickRates = PickCountingService.calcPickRates(picks, total)
      const pickKills = PickCountingService.calcPickKills(picks, total)
      store.commit(types.PICK_COUNTING, { total, pickRates, pickKills })
    }
    let setRandomInterval
    let startRandom = function () {
      setRandomInterval = setInterval(() => {
        countPick()
        if (total > 20000) {
          // setTimeout(() => {
          clearRandom()
          // }, 2000)
        }
      }, 1000)
    }

    startRandom()

    let clearRandom = function () {
      clearInterval(setRandomInterval)
    }
  },

  testRunCase2() {
    let countPick = function () {
      // for (let i = 0; i < 5; i++) {
      picks[0] -= Math.floor(Math.random() * 60) + 10
      picks[1] += Math.floor(Math.random() * 150) + 50
      // picks[2] += Math.floor(Math.random() * 100) + 5
      // picks[3] += Math.floor(Math.random() * 100) + 10
      // picks[4] += Math.floor(Math.random() * 250) + 9
      // }
      total = picks[0] + picks[1]
      //  + picks[2] + picks[3] + picks[4]
      // // //console.log(picks)
      // // //console.log(total)
      const pickRates = PickCountingService.calcPickRates(picks, total)
      const pickKills = PickCountingService.calcPickKills(picks, total)
      store.commit(types.PICK_COUNTING, { total, pickRates, pickKills })
    }
    let setRandomInterval
    let startRandom = function () {
      setRandomInterval = setInterval(() => {
        countPick()
        // if (total > 30000) {
        setTimeout(() => {
          clearRandom()
        }, 6000)
        // }
      }, 500)
    }

    startRandom()

    let clearRandom = function () {
      clearInterval(setRandomInterval)
    }
  },

  testRunCase3() {
    let countPick = function () {
      // for (let i = 0; i < 5; i++) {
      picks[0] += Math.floor(Math.random() * 850) + 450
      picks[1] += Math.floor(Math.random() * 250) + 130
      // picks[2] += Math.floor(Math.random() * 100) + 5
      // picks[3] += Math.floor(Math.random() * 100) + 10
      // picks[4] += Math.floor(Math.random() * 250) + 9
      // }
      total = picks[0] + picks[1]
      //  + picks[2] + picks[3] + picks[4]
      // // //console.log(picks)
      // // //console.log(total)
      const pickRates = PickCountingService.calcPickRates(picks, total)
      const pickKills = PickCountingService.calcPickKills(picks, total)
      store.commit(types.PICK_COUNTING, { total, pickRates, pickKills })
    }
    let setRandomInterval
    let startRandom = function () {
      setRandomInterval = setInterval(() => {
        countPick()
        // if (total > 30000) {
        setTimeout(() => {
          clearRandom()
        }, 100000)
        // }
      }, 500)
    }

    startRandom()

    let clearRandom = function () {
      clearInterval(setRandomInterval)
    }
  },
}

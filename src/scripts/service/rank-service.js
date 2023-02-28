import TwitchUidStorage from '@/storage/twitch-uid-storage'
import store from '@/vuex/store'

export default {
  save(ranks) {
    store.commit('RANKDATA', ranks)
    // // //console.log('ranks', ranks)

    const myUid = TwitchUidStorage.get()
    const myRank = ranks.find(rank => rank.userId === myUid)

    if (myRank) {
      store.commit('MYRANKDATA', myRank)
    }
  },
}

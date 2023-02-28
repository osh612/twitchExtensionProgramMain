import { axiosPost } from '@/api/axios/axios.js'
import store from '../../vuex/store'

export default {
  getRealTimeRank(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/rank/my',
        data,
      })
        .then(res => {
          resolve(res.data)
          store.commit('MYREALTIMERANK', res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // getSecur
}

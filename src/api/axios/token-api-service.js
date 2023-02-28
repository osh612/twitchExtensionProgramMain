import { axiosPost } from '@/api/axios/axios.js'
import apiTokenStorage from '../../storage/api-token-storage'

export default {
  sendToken(data) {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/security',
        data,
      })
        .then(res => {
          resolve(res.data)
          const apiToken = res.data.security.token
          apiTokenStorage.set(apiToken)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}

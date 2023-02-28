import axios from 'axios'
import store from '@/vuex/store'

export default {
  async getUser(id) {
    const response = await axios.get(
      `https://api.twitch.tv/helix/users?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${store.getters.getToken}`,
          'Client-Id': process.env.VUE_APP_ID,
        },
      },
    )
    return response.data.data[0]
  },
}

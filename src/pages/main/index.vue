<template>
  <div class="page-main-root">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import tokenApiService from '../../api/axios/token-api-service'
import { clientForAI } from '../../api/socket/webStompForAI'
import { client } from '../../api/socket/webStompSocket'
import twitchTokenStorage from '../../storage/twitch-token-storage'

export default {
  name: 'main-index',

  async created() {
    await this.getAccessToken()
    this.routeTo()
  },
  mounted() {
    window.Twitch.ext.bits.getProducts().then(function (products) {
      window.Twitch.ext.rig.log(products)
    })
    let productSku = 'decakillLiveBoard'
    window.Twitch.ext.bits.useBits(productSku)
  },
  methods: {
    async getAccessToken() {
      const axiosData = await axios.post('https://id.twitch.tv/oauth2/token', {
        client_id: process.env.VUE_APP_ID,
        client_secret: process.env.VUE_APP_SECRET,
        grant_type: 'client_credentials',
      })

      const { access_token: accessToken } = axiosData.data
      const isAccessTokenValid =
        accessToken != null && accessToken != undefined && accessToken != ''

      if (isAccessTokenValid) {
        this.$store.commit('ACCESS_TOKEN', accessToken)
        twitchTokenStorage.set(accessToken)
        const twitchToken = {
          token: twitchTokenStorage.get(),
        }
        await tokenApiService.sendToken(twitchToken)
        client.activate()
        clientForAI.activate()
      }
    },

    routeTo() {
      let mode = this.$route.query.mode
      switch (mode) {
        default:
        case 'viewer':
          this.$router.replace({
            name: 'Viewer',
          })
          break
        case 'config':
          this.$router.replace({
            name: 'Config',
          })
          break
        case 'dashboard':
          this.$router.replace({
            name: 'Dashboard',
          })
          break
      }
    },
  },
}
</script>
<style scoped lang="scss">
.page-main-root {
  width: 100%;
  height: 100%;
  font-family: 'Noto Sans KR', 'sans-serif';
  position: relative;
}
</style>
<style lang="css">
@import url(../../assets/css/common.css);
</style>

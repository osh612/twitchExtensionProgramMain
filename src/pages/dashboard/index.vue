<template>
  <div class="dashboard_wrap">
    <div
      class="identityNumber_wrap"
      v-clipboard:copy="identityNumber"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      <input
        type="button"
        id="myInput"
        class="identityNumber"
        ref="code"
        v-model="identityNumber"
      />
    </div>
    <button
      class="certifyButton"
      :disabled="disabled"
      @click="requestExtensionAuth"
    >
      인증완료
    </button>
  </div>
</template>

<script>
import store from '@/vuex/store'
import TwitchAuthService from '@/scripts/service/twitch-auth-service'
import {
  client,
  stompPublish,
  stompSubscribe,
} from '../../api/socket/webStompSocket'

export default {
  name: 'dashboard-componant',
  data: function () {
    return {
      UID: String,
      identityNumber: this.identityNum(),
      disabled: true,
      receivedIdentityNumber: String,
      certification: false,
    }
  },
  props: {
    msg: String,
  },
  created() {},
  async mounted() {
    await this.requestTwitchAuth()
    this.connect()
  },
  computed: {},
  methods: {
    identityNum() {
      let num = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
      store.commit('IDENTITYNUM', num.toString())
      return store.getters.getIdentityNum
    },

    connect() {
      // 소켓 연결 성공
      client.activate()
      client.onConnect = () => {
        stompSubscribe(
          `/subscribe/${this.identityNumber}/auth/request`,
          res => {
            let data = JSON.parse(res.body)
            if (data.code === store.getters.getIdentityNum) {
              this.receivedIdentityNumber = data.code
              this.certification = true
              this.disabled = false
            }
          },
        )
      }
    },

    requestTwitchAuth() {
      TwitchAuthService.auth(this.handleOnAuthorizedTwitchExtension)
    },

    async handleOnAuthorizedTwitchExtension(_, isLinkedViewer) {
      this.$store.commit('AUTH', isLinkedViewer)
    },

    requestExtensionAuth() {
      let id_obj = {
        code: this.receivedIdentityNumber,
        join: this.certification,
        broadcast: {
          broadcasterId: store.getters.getChannelData.broadcaster_id,
          // broadcasterLanguage:
          //   store.getters.getChannelData.broadcaster_language,
          broadcasterLogin: store.getters.getChannelData.broadcaster_login,
          broadcasterDisplayName: store.getters.getDisplay_name,
          broadcasterProfileImageUrl: store.getters.getProfile_image_url,
        },
      }
      stompPublish('/send/join/auth/result', id_obj)
    },

    onCopy: function () {
      this.$vToastify.success('Extension Code가 복사되었습니다')
    },
    onError: function () {},
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.dashboard_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.identityNumber_wrap {
  width: 200px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 2px;
}
.identityNumber {
  width: 100%;
  height: 100%;
  font-size: 50px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #fff;
  margin-bottom: 5px;
  background-color: #5c5c5c;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  border: none;
}
.certifyButton:disabled {
  background-color: #666;
  pointer-events: none;
}
/* .certifyButton:hover {
  background-color: #5d2d88;
} */
.certifyButton {
  background-color: #8b41cb;
  width: 200px;
  height: 25px;
  border: none;
  border-radius: 2px;
  font-size: 10px;
  font-family: 'Noto Sans', sans-serif;
  color: #fff;
  cursor: pointer;
}
.certifyButton:active {
  background-color: #5d2d88;
}
</style>

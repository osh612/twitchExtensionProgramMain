import store from '@/vuex/store'
import Utils from '@/scripts/utils'
import helix from '@/api/twitch/helix'
import axios from 'axios'
import * as mutationTypes from '@/vuex/mutation_types.js'
import TwitchUidStorage from '@/storage/twitch-uid-storage'
import TwitchChannelStorage from '@/storage/twitch-channel-storage'
import { stompPublish } from '../../api/socket/webStompSocket'
// import { axiosPost } from '../../api/axios/axios'

export default {
  async auth(onAuthorized) {
    const requestIdShare = window?.Twitch?.ext?.actions?.requestIdShare

    if (!requestIdShare) {
      console.error('Twitch Extension Not Loaded: TwitchAuthService.Auth')
      return
    }

    try {
      const auth = await this.getAuthorizedPromise()
      const isLinkedViewer = !!window?.Twitch?.ext?.viewer?.isLinked
      typeof onAuthorized === 'function' && onAuthorized(auth, isLinkedViewer)
      //console.log('auth', auth)
      await this.handleOnAuthorized(auth)
      TwitchChannelStorage.set(auth.channelId)
      // store.commit('CHANNELDATA', auth)
    } catch (e) {
      console.error('Twitch OnAuthorized Error: TwitchAuthService.Auth')
      throw e
    }

    Utils.executeFunctionSafely(requestIdShare)
  },

  getAuthorizedPromise() {
    const twitchExtensionOnAuthorized = window?.Twitch?.ext?.onAuthorized
    if (typeof twitchExtensionOnAuthorized !== 'function') {
      return new Promise((_, reject) => {
        reject(
          'Twitch Extension Not Loaded: TwitchAuthService.GetOnAuthorizedPromise',
        )
      })
    }

    return new Promise(resolve => {
      twitchExtensionOnAuthorized(auth => {
        resolve(auth)
        //console.log('auth', auth)
        TwitchChannelStorage.set(auth.channelId)
        this.getChannelnformation(auth.channelId)
      })
    })
  },

  async handleOnAuthorized(auth) {
    const id = window?.Twitch?.ext?.viewer?.id

    if (!id) {
      return
    }

    if (!store.getters.getToken) {
      return
    }

    const twitchInfo = await helix.getUser(id)
    //console.log('twitchInfo', twitchInfo)
    TwitchUidStorage.set(twitchInfo.id)
    TwitchChannelStorage.set(auth.channelId)

    if (!twitchInfo) {
      return
    }
    store.commit(mutationTypes.SET_TWITCH_USERINFO, twitchInfo)
    let account_obj = {
      id: store.getters.getId,
      login: store.getters.getLogin,
      display_name: store.getters.getDisplay_name,
      platform: store.getters.getPlatform,
      profile_image_url: store.getters.getProfile_image_url,
      description: store.getters.getDescription,
      created_at: store.getters.getCreated_at,
    }
    stompPublish('/send/extension/user/collect', account_obj)
  },

  async getChannelnformation(id) {
    const response = await axios.get(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${store.getters.getToken}`,
          'Client-Id': process.env.VUE_APP_ID,
        },
      },
    )
    let channelData_obj = response.data.data[0]
    //console.log('channelData_obj', channelData_obj)
    store.commit('CHANNELDATA', channelData_obj)
    //console.log('storedChannelData', channelData_obj)
    return response.data.data[0]
  },
}

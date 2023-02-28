import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { LiveWS, TestWS } from '../socket/config'
import apiTokenStorage from '../../storage/api-token-storage'

const serverURL =
  window.location.hostname.includes('twitch.tv') === true ? LiveWS : TestWS

let token
// const serverURL = 'http://decakill.work:44444/ws'

export const client = new Client({
  brokerURL: serverURL,
  connectHeaders: {},
  webSocketFactory() {
    return new SockJS(serverURL)
  },
  // debug(str) {}
  debug() {},
  reconnectDelay: 5000, // 자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})

export const stompPublish = (url, data) => {
  token = apiTokenStorage.get()
  client.publish({
    destination: url,
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` },
    skipContentLengthHeader: false,
  })
}

export const stompSubscribe = (destination, callback, headers) => {
  client.subscribe(destination, callback, headers)
}

export const stompUnsubscribe = (destination, callback, headers) => {
  client.unsubscribe(destination, callback, headers)
}

export default Client

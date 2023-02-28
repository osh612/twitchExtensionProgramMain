import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import apiTokenStorage from '../../storage/api-token-storage'

let token
const serverURL = 'https://schedule.decakill.live/ws'
// const serverURL = 'http://decakill.work:44444/ws'
export const clientForAI = new Client({
  brokerURL: serverURL,
  connectHeaders: {},
  webSocketFactory() {
    return new SockJS(serverURL)
  },
  debug() {},
  reconnectDelay: 5000, // 자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})

export const AIPublish = (url, data) => {
  token = apiTokenStorage.get()
  clientForAI.publish({
    destination: url,
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` },
    skipContentLengthHeader: false,
  })
}

export const AISubscribe = (destination, callback, headers) => {
  clientForAI.subscribe(destination, callback, headers)
}

export const AIUnsubscribe = (destination, callback, headers) => {
  clientForAI.unsubscribe(destination, callback, headers)
}

export default Client

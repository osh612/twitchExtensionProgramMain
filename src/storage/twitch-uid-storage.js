const storageKey = 'uid'
const storageInfo = 'twitchInfo'

export default {
  get() {
    return sessionStorage.getItem(storageKey) || '127426732'
  },

  getTwitchInfo() {
    return sessionStorage.getItem(storageInfo)
  },

  set(uid) {
    sessionStorage.setItem(storageKey, uid)
  },

  setTwitchInfo(data) {
    sessionStorage.setItem(storageInfo, data)
  },
}

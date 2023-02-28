const storageKey = 'channel'

export default {
  get() {
    return sessionStorage.getItem(storageKey)
  },

  set(channel) {
    sessionStorage.setItem(storageKey, channel)
  },
}

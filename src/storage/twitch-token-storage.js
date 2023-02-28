const storageKey = 'token'

export default {
  get() {
    return sessionStorage.getItem(storageKey)
  },

  set(token) {
    sessionStorage.setItem(storageKey, token)
  },
}

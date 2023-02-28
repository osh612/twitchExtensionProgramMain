export default {
  executeFunctionSafely(func) {
    typeof func === 'function' && func()
  },

  makeDebouncer(delay) {
    let timeout = null
    return function (fn) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        fn()
      }, delay)
    }
  },
}

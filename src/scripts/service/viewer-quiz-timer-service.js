import Timer from '../domain/timer.js'
import store from '@/vuex/store'
import * as types from '@/vuex/mutation_types'

const timer = new Timer()
const URGE_QUIZ_THRESHOLD = 15

export default {
  clear() {
    timer.clear()
  },

  start({ onTimeUpdateBeforeEnd, onTimerWillEnd, startTime }) {
    this.clear()
    timer.start({
      onTimeUpdateBeforeEnd: newCount => {
        store.commit(types.STARTDATE, new Date())
        store.commit(types.TIMES, newCount)

        if (newCount === URGE_QUIZ_THRESHOLD) {
          // store.commit(types.WILL_END_QUIZ)
          typeof onTimerWillEnd === 'function' && onTimerWillEnd()
          // setTimeout(() => {
          //   store.commit(types.BUBBLEON, false)
          // }, 15000)
        }

        typeof onTimeUpdateBeforeEnd === 'function' && onTimeUpdateBeforeEnd()
      },
      onTimeEnd: () => {
        store.commit(types.ST, 'wait')
      },
      startTime,
    })
  },
}

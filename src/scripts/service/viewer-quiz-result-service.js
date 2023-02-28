import Timer from '@/scripts/domain/timer'
import store from '@/vuex/store'
import * as types from '@/vuex/mutation_types'
import utils from '@/scripts/utils'

export default {
  showResult(isAttend, onResultEffectTimerEnd) {
    if (!isAttend) {
      store.commit(types.RESULT_BUT_NOT_ATTEND)
      //console.log('result but not attend')
      return
    }
    store.commit(types.RESULT_AND_ATTEND)
    //console.log('result and attend')
    this.start(() => {
      // if (
      //   store.getters.getSt === 'start' ||
      //   store.getters.getSt === 'process' ||
      //   store.getters.getSt === 'chosen' ||
      //   store.getters.getSt === 'result2' ||
      //   store.getters.getSt === 'resultBeforeAlert' ||
      //   store.getters.getSt === 'not'
      // ) {
      //   return
      // } else {
      //   store.commit(types.RESULT_AND_ATTEND_EFFECT_TIMEOVER)
      // }

      utils.executeFunctionSafely(onResultEffectTimerEnd)
    })
  },

  start(onTimeEnd) {
    const timer = new Timer()
    timer.start({
      onTimeUpdateBeforeEnd: () => {},
      onTimeEnd: () => {
        onTimeEnd()
      },
      startTime: 5,
    })
  },
}

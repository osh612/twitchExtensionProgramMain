import Timer from '../domain/timer'

let timer = new Timer()
export default {
  onTimerEnd(onDisabledTimerEnd) {
    timer.clear()
    timer.start({
      onTimeUpdateBeforeEnd: () => {},
      onTimeEnd: onDisabledTimerEnd,
      startTime: 1,
    })
  },
}

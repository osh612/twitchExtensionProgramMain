export default class Timer {
  constructor() {
    this.timerInterval = null
    this.currentTimerCount = 0
  }

  clear() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }

    if (this.currentTimerCount) {
      this.currentTimerCount = 0
    }
  }

  start({ onTimeUpdateBeforeEnd, onTimeEnd, startTime }) {
    this.currentTimerCount = startTime

    this.timerInterval = setInterval(
      this.tick.bind(this, onTimeUpdateBeforeEnd, onTimeEnd),
      1000,
    )
  }

  tick(onTimeUpdateBeforeEnd, onTimeEnd) {
    if (this.currentTimerCount > 1) {
      this.currentTimerCount = this.currentTimerCount - 1
      onTimeUpdateBeforeEnd(this.currentTimerCount)
    } else if (this.currentTimerCount === 1) {
      onTimeEnd()
      this.clear()
    }
  }
}

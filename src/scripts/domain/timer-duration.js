export default class TimerDuration {
  constructor(duration) {
    this.duration = duration
  }

  setValue(duration) {
    this.duration = duration
    this.validate()
  }

  getValue() {
    return Math.round(this.duration)
  }

  minus(duration) {
    this.setValue(this.duration - duration)
  }

  validate() {
    if (this.duration < 0) {
      // // //console.log(this.duration)
      this.duration = 0
      // // //console.log(this.duration)
    }
  }
}

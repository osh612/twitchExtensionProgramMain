import DateTime from '../domain/datetime.js'
import TimerDuration from '../domain/timer-duration'

export default {
  getQuizDuration(startDateTime, quizDuration) {
    const diffFromNowToStart = DateTime.getDiffFromPastToNow(startDateTime)

    const duration = new TimerDuration(quizDuration)
    duration.minus(diffFromNowToStart)

    const durationString = duration.getValue().toFixed(0)
    return Number(durationString)
  },
}

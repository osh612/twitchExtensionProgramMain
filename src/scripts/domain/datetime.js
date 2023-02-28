export default {
  getDiffFromPastToNow(pastTime) {
    let start = new Date(pastTime)
    let now = new Date()
    return (now.getTime() - start.getTime()) / 1000
  },
}

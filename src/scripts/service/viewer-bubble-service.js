export default {
  getPosition(jewelPosition) {
    if (jewelPosition.includes('top')) {
      return 'top'
    }
    return 'bottom'
  },
}

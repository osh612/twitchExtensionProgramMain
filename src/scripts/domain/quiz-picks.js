export default class QuizPicks {
  constructor(picks) {
    this.picks = picks
  }

  calcPickRates(total) {
    return this.picks.map(pick => {
      const pickRate = (pick / total) * 100

      if (Number.isNaN(pickRate)) {
        return 0
      }

      if (Number.isInteger(pickRate)) {
        return pickRate
      }

      const pickRateCeiled = Math.ceil(pickRate * 10) * 0.1
      return Number(pickRateCeiled.toFixed(1))
    })
  }

  calcPickKills(total) {
    return this.picks.map(pick => Math.floor(total / Math.max(pick, 1)))
  }
}

import QuizPicks from '@/scripts/domain/quiz-picks'

export default {
  calcPickRates(picks, total) {
    const quizPicks = new QuizPicks(picks)
    return quizPicks.calcPickRates(total)
  },

  calcPickKills(picks, total) {
    const quizPicks = new QuizPicks(picks)
    return quizPicks.calcPickKills(total)
  },
}

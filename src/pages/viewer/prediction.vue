<template>
  <div class="prediction-wrap">
    <div class="noneData_wrap" v-if="quizList[0].quizIdx === 0">
      <SvgCirclewithExmark />
      <div>
        <p class="text_1">참여한 예측이 없습니다.</p>
        <p class="text">문제 출제를 기다려주세요</p>
      </div>
    </div>
    <div class="prediction_header">
      <SvgMiniDecakill />
      <span>예측 현황</span>
    </div>
    <ul>
      <li v-for="(data, i) in quizList" :key="i">
        <div
          class="quiz-wrap"
          :class="quiz_result_class(data)"
          v-if="
            data.quizName != null &&
            data.quizName != undefined &&
            data.quizName != ''
          "
        >
          <div class="quizData-wrap" :class="quiz_result_class(data)">
            <div class="singleQuiz">
              <span class="quizNum">{{ i + 1 }}.</span>
              <span class="quizData">{{ data.quizName }}</span>
            </div>
            <div class="myQuizState-wrap">
              <div
                class="myQuizState_step1"
                v-if="
                  data.mypick != null &&
                  data.mypick != undefined &&
                  data.mypick != ''
                "
              >
                <div class="myQuizState_mypick">
                  <span class="myQuizState_title"> 예측 </span>
                  <span class="myQuizState_content">
                    {{ data.mypickName }}
                  </span>
                </div>
                <div
                  class="myQuizState_answer"
                  v-if="
                    data.answer != null &&
                    data.answer != undefined &&
                    data.answer != ''
                  "
                >
                  <span class="myQuizState_title"> 정답 </span>
                  <span class="myQuizState_content">
                    {{ data.answer }}
                  </span>
                </div>
              </div>
              <div class="myQuizState-data">
                <span class="myQuizState_title"> 결과 </span>
                <span class="myQuizState_content">
                  {{ quiz_result_text(data) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import axios from 'axios'
import store from '@/vuex/store'
import SvgCirclewithExmark from '../../components/svgs/SvgCirclewithExmark.vue'
import SvgMiniDecakill from '../../components/svgs/SvgMiniDecakill.vue'

export default {
  name: 'viewer-prediction',
  data() {
    return {
      quizListData: [],
    }
  },
  props: {},
  computed: {
    quizList() {
      return store.getters.getQuizList.filter(quiz => quiz)
    },
  },
  mounted() {
    console.log(this.quizList)
    // // //console.log('this.quizList', this.quizList)
  },
  methods: {
    quiz_result_text(data) {
      let quiz_result_text = ''
      let mypick
      let quiz_result
      if (data != undefined && data != null && data != '') {
        if (
          data.mypick != undefined &&
          data.mypick != null &&
          data.mypick != ''
        ) {
          mypick = data.mypick
        }
        if (
          data.quiz_result != undefined &&
          data.quiz_result != null &&
          data.quiz_result != ''
        ) {
          quiz_result = data.quiz_result
        }
      }
      if (mypick == undefined || mypick == null || mypick == '') {
        quiz_result_text = '미참여'
      } else {
        if (
          quiz_result == undefined ||
          quiz_result == null ||
          quiz_result == ''
        ) {
          let preKillText = ''
          console.log('preKill', data.preKill)
          switch (data.preKill) {
            case 1:
              preKillText = '싱글킬'
              break
            case 2:
              preKillText = '더블킬'
              break
            case 3:
              preKillText = '트리플킬'
              break
            case 4:
              preKillText = '쿼드라킬'
              break
            case 5:
              preKillText = '펜타킬'
              break
            case 6:
              preKillText = '헥사킬'
              break
            case 7:
              preKillText = '헵타킬'
              break
            case 8:
              preKillText = '옥타킬'
              break
            case 9:
              preKillText = '노나킬'
              break
            case 10:
              preKillText = '데카킬'
              break
          }
          if (data.preKill == undefined) {
            data.preKill = '0'
          }
          quiz_result_text =
            '대기 중 - 예상킬 : ' + preKillText + '(' + data.preKill + ')'
        } else {
          let killText = ''
          if (mypick == quiz_result) {
            switch (data.kills) {
              case 1:
                killText = '싱글킬'
                break
              case 2:
                killText = '더블킬'
                break
              case 3:
                killText = '트리플킬'
                break
              case 4:
                killText = '쿼드라킬'
                break
              case 5:
                killText = '펜타킬'
                break
              case 6:
                killText = '헥사킬'
                break
              case 7:
                killText = '헵타킬'
                break
              case 8:
                killText = '옥타킬'
                break
              case 9:
                killText = '노나킬'
                break
              case 10:
                killText = '데카킬'
                break
            }
            quiz_result_text = killText + ' (' + data.kills + ')'
          } else if (quiz_result === '전원 정답') {
            switch (data.kills) {
              case 1:
                killText = '싱글킬'
                break
              case 2:
                killText = '더블킬'
                break
              case 3:
                killText = '트리플킬'
                break
              case 4:
                killText = '쿼드라킬'
                break
              case 5:
                killText = '펜타킬'
                break
              case 6:
                killText = '헥사킬'
                break
              case 7:
                killText = '헵타킬'
                break
              case 8:
                killText = '옥타킬'
                break
              case 9:
                killText = '노나킬'
                break
              case 10:
                killText = '데카킬'
                break
            }
            quiz_result_text = killText + ' (' + data.kills + ')'
          } else if (quiz_result === '전원 오답') {
            quiz_result_text = '실패'
          } else {
            quiz_result_text = '실패'
          }
        }
      }
      return quiz_result_text
    },
    quiz_result_class(data) {
      let mypick
      let quiz_result
      if (data != undefined && data != null && data != '') {
        if (
          data.mypick != undefined &&
          data.mypick != null &&
          data.mypick != ''
        ) {
          mypick = data.mypick
        }
        if (
          data.quiz_result != undefined &&
          data.quiz_result != null &&
          data.quiz_result != ''
        ) {
          quiz_result = data.quiz_result
        }
      }
      let quiz_result_class = ''
      if (mypick == undefined || mypick == null || mypick == '') {
        quiz_result_class = ''
      } else {
        if (
          quiz_result == undefined ||
          quiz_result == null ||
          quiz_result == ''
        ) {
          quiz_result_class = 'active'
        } else {
          if (mypick == quiz_result) {
            quiz_result_class = 'active success'
          } else if (quiz_result === '전원 정답') {
            quiz_result_class = 'active success'
          } else if (quiz_result === '전원 오답') {
            quiz_result_class = 'active fail'
          } else {
            quiz_result_class = 'active fail'
          }
        }
      }
      return quiz_result_class
    },
  },
  components: { SvgCirclewithExmark, SvgMiniDecakill },
}
</script>
<style scoped>
.noneData_wrap {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;
  font-size: 12px;
  color: #888888;
}
.text_1 {
  margin-top: 12px;
  margin-bottom: 4px;
}
</style>

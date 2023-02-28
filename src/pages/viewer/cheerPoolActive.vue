<template>
  <div class="cheerPool-wrap">
    <div class="cheerPoolHeaderIcon">
      <SvgCheerPoolHeaderIcon />
    </div>
    <div class="cheerPool_header">
      <span class="nickname">데카킬화이팅</span>
      <span>님의 응원하기 </span>
    </div>
    <marquee
      id="cheerPoolContents"
      ref="cheerPoolContents"
      class="cheerPool_contents"
      scrollamount="80"
    >
      75자 기준으로 맞춰보도록 하겠습니다. 티원 화이팅 농심 화이팅 리브 샌드박스
      화이팅 담원 화이팅 또 무슨팀이 있을까요 아무튼 다 화이</marquee
    >
  </div>
</template>

<script>
import SvgCheerPoolHeaderIcon from '../../components/svgs/SvgCheerPoolHeaderIcon.vue'

const testhandler = () => {
  //console.log('aaaa')
}

export default {
  name: 'cheerPoolActive',
  components: {
    SvgCheerPoolHeaderIcon,
  },
  data() {
    return {}
  },
  props: [],
  created() {},
  mounted() {
    this.$refs.cheerPoolContents.loop = '2'
    this.$refs.cheerPoolContents.setAttribute('onfinish', testhandler)
    //console.log(this.$refs.cheerPoolContents)
    //console.log(this.$refs.cheerPoolContents)

    // this.$refs.cheerPoolContents.onfinish = () => {
    //   //console.log('aaa')
    // }
    // this.$refs.cheerPoolContents.addEventListener(
    //   'onbounce',
    //   event => {
    //     //console.log('event', event)
    //   },
    //   false,
    // )
  },
  computed: {},
  methods: {
    onFinish() {
      //console.log('fuck2')
    },
  },
}
</script>

<style scoped lang="scss">
.cheerPool-wrap {
  width: 100%;
  height: 100%;
  background-color: #000;
  border: 1px solid #af51f9;
  border-radius: 2px;
  box-shadow: 0px 0px 8px 2px #af51f9;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .cheerPoolHeaderIcon {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
  }
  .cheerPool_header {
    position: absolute;
    top: 20%;
    left: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    font-family: Noto Sans KR;
    .nickname {
      color: #1eedac;
    }
  }
  .cheerPool_contents {
    position: absolute;
    width: calc(100% - 22px);
    height: 100%;
    left: 21px;
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
    line-height: 70px;
    text-shadow: 0 0 7px #fff, 0 0 9px #fff;
  }
}
</style>

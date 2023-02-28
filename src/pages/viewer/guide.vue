<template>
  <div class="guide_wrap">
    <div class="guide_header">
      <SvgMiniDecakill />
      <span>데카킬 유저 가이드</span>
    </div>
    <div class="guide_contents">
      <div class="guide_next">
        <img src="../../components/svgs/guide-next.svg" />
      </div>
      <div class="guide_prev">
        <img src="../../components/svgs/guide-prev.svg" />
      </div>
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="guide_image_wrap">
            <img src="../../components/svgs/guide1.svg" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="guide_image_wrap">
            <img src="../../components/svgs/guide2.svg" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="guide_image_wrap">
            <img src="../../components/svgs/guide3.svg" />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="guide_image_wrap">
            <img src="../../components/svgs/guide4.svg" />
          </div>
          <div class="link">
            <span>보상페이지 바로가기</span>
            <a href="https://decakill.com/reward" target="_blank">
              <img src="../../components/svgs/SvgLinkTo.svg" />
            </a>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="guide_image_wrap">
            <img src="../../components/svgs/guide5.svg" />
          </div>
          <div class="link">
            <span>랭킹페이지 바로가기</span>
            <a href="https://decakill.com/rank" target="_blank">
              <img src="../../components/svgs/SvgLinkTo.svg" />
            </a>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="guide_image_wrap">
            <img src="../../components/svgs/guide6.svg" />
          </div>
        </swiper-slide>
      </swiper>
      <div class="guide-pagination"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SvgMiniDecakill from '../../components/svgs/SvgMiniDecakill.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// import 'swiper/css/navigation'

export default {
  name: 'Guide-viewer',
  components: { SvgMiniDecakill, Swiper, SwiperSlide },
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 1,
        loop: false,
        pagination: {
          el: '.guide-pagination',
          type: 'bullets',
          clickable: true,
        },
        mousewheel: true,
        spaceBetween: 0,
        navigation: {
          nextEl: '.guide_next',
          prevEl: '.guide_prev',
        },
        edgeSwipeDetection: 'prevent',
        effect: 'slide',
        nested: true,
        watchOverflow: true,
      },
    }
  },
  props: [],
  created() {},
  mounted() {},
  computed: {
    ...mapState({
      autoQuizPopUp: state => state.autoQuizPopUp,
    }),
  },
  methods: {
    autoQuizPopUpHandler() {
      if (this.autoQuizPopUp === false) {
        this.$store.commit('AUTOQUIZPOPUP', true)
      } else {
        this.$store.commit('AUTOQUIZPOPUP', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.guide_wrap {
  width: 19.875rem;
  height: 20.563rem;
  background-color: #222;
  border: 1px solid #2b2b2b;
  .guide-pagination {
    z-index: 10;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-between;
    width: 44px;
    height: 4px;
    opacity: 1;
  }
  .guide_header {
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    width: 19.75rem;
    height: 2.063rem;
    padding: 8px 0px 8px 15px;
    box-sizing: border-box;
    // font-family: 'Noto Sans KR', sans-serif;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='316' height='33' viewBox='0 0 316 33'%3E%3Cdefs%3E%3CclipPath id='clip-path'%3E%3Crect id='사각형_2620' data-name='사각형 2620' width='316' height='33' transform='translate(562 618)' fill='%233f1c5d'/%3E%3C/clipPath%3E%3ClinearGradient id='linear-gradient' x2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23af51ff'/%3E%3Cstop offset='1' stop-color='%2301fcb5'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-2' x1='0.511' x2='0.511' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-opacity='0'/%3E%3Cstop offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='bg-gradient' transform='translate(-562 -618)' clip-path='url(%23clip-path)'%3E%3Crect id='사각형_2621' data-name='사각형 2621' width='316' height='33' transform='translate(562 618)' fill='%23222'/%3E%3Cg id='배경' transform='translate(561 617)'%3E%3Crect id='사각형_2588' data-name='사각형 2588' width='316' height='70' transform='translate(1 1)' opacity='0.3' fill='url(%23linear-gradient)'/%3E%3Crect id='사각형_2589' data-name='사각형 2589' width='316' height='72' transform='translate(1 1)' fill='url(%23linear-gradient-2)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");

    span {
      margin-left: 4px;
      font-size: 12px;
    }
  }
  .guide_contents {
    position: relative;
    width: 100%;
    color: #fff;

    .guide_prev {
      position: absolute;
      top: 87px;
      left: 6px;
      width: 20px;
      height: 20px;
      z-index: 10;

      &:active {
        opacity: 0.5;
      }
      &.swiper-button-disabled {
        display: none;
      }
    }

    .guide_next {
      position: absolute;
      top: 87px;
      right: 6px;
      width: 20px;
      height: 20px;
      z-index: 10;

      &:active {
        opacity: 0.5;
      }
      &.swiper-button-disabled {
        display: none;
      }
    }

    .swiper-container {
      width: 100%;
      height: 18.438rem;

      .swiper-slide {
        text-align: center;
        width: 100% !important;
        height: 100% !important;
        // font-size: 18px;
        background: transparent;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;

        .guide_image_wrap {
          width: 100%;
          height: 100%;
          background-color: transparent;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        .link {
          position: absolute;
          bottom: 34px;
          display: flex;
          align-items: center;
          span {
            font-size: 12px;
            text-decoration: none;
            color: #bf73ff;
            font-weight: normal;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>

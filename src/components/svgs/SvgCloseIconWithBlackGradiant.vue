<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="18"
    height="18"
    viewBox="0 0 22 22"
  >
    <defs>
      <linearGradient
        :id="linearGradiantId"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#505050" />
        <stop offset="1" stop-color="#1f1f1f" />
      </linearGradient>
    </defs>
    <g id="btn-close" transform="translate(-2024 -532)">
      <g
        id="타원_11"
        data-name="타원 11"
        transform="translate(2024 532)"
        stroke="#444"
        stroke-width="1"
        :fill="linearGradientFill"
      >
        <circle cx="11" cy="11" r="11" stroke="none" />
        <circle cx="11" cy="11" r="10.5" fill="none" />
      </g>
      <g id="그룹_304" data-name="그룹 304" transform="translate(35.303 8.802)">
        <rect
          id="사각형_1388"
          data-name="사각형 1388"
          width="1.508"
          height="9.805"
          transform="translate(2002.63 530.198) rotate(45)"
          fill="#fff"
        />
        <rect
          id="사각형_1389"
          data-name="사각형 1389"
          width="1.508"
          height="9.805"
          transform="translate(2003.697 537.131) rotate(135)"
          fill="#fff"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'CloseIconWithBlackGradiant',

  data() {
    return {
      linearGradiantId: String(Math.random()),
    }
  },

  computed: {
    linearGradientFill() {
      return `url(#${this.linearGradiantId})`
    },
  },
}
</script>

<style scoped></style>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    height="8"
    viewBox="0 0 51 43"
  >
    <defs>
      <clipPath id="deca-path">
        <path
          id="path7"
          data-name="path7"
          d="M144.649.891l13.7,32.141h-6.1l-4.6,10.859h28.728l-19.187-43Z"
          transform="translate(-144.649 -0.891)"
          fill="none"
        />
      </clipPath>
      <linearGradient
        id="decaGradiant"
        x1="1"
        y1="0.011"
        x2="0"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#af51ff" />
        <stop offset="1" stop-color="#01fcb5" />
      </linearGradient>
      <clipPath id="decaPath">
        <path
          d="M124.939,44.187h12.695l7.658-17.981-6-14.133Z"
          transform="translate(-124.939 -12.073)"
          fill="none"
        />
      </clipPath>
    </defs>
    <g transform="translate(-1685.268 -696.19)">
      <rect
        width="51"
        height="43"
        transform="translate(1685.268 696.19)"
        fill="#fff"
        opacity="0.002"
      />
      <g id="logo" transform="translate(1685.31 696.19)">
        <g transform="translate(19.188 0)" clip-path="url(#deca-path)">
          <rect
            width="43"
            height="31.727"
            transform="translate(0 43) rotate(-90)"
            fill="url(#decaGradiant)"
          />
        </g>
        <g transform="translate(0 10.886)">
          <g clip-path="url(#decaPath)">
            <rect
              width="32.114"
              height="50.951"
              transform="translate(-0.036 32.114) rotate(-90)"
              fill="url(#decaGradiant)"
            />
          </g>
        </g>
      </g>
      <g id="light" transform="translate(1685.309 696.19)" opacity="0.5">
        <path
          d="M19.71,0l13.7,32.141h-6.1L22.708,43h1.059l4.185-9.885,6.928,0L21.181.975,32.687.982,32.248,0Z"
          transform="translate(-0.522 0)"
          fill="#fff"
        />
        <path
          d="M0,43.3H1.068l.435-.974h0l12.831-28.7v0l.542-1.214-.52-1.226Z"
          transform="translate(0 -0.296)"
          fill="#fff"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgMiniDecakill',
}
</script>

<style scoped></style>

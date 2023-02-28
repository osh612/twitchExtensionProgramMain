// import TWEEN from '@tweenjs/tween.js'
// import utils from '@/scripts/utils'

// const insideViewportDebounceDelay = 300
// const debounceInsideXviewport = utils.makeDebouncer(insideViewportDebounceDelay)
// const debounceInsideYviewport = utils.makeDebouncer(insideViewportDebounceDelay)
// let leftTween = null
// let topTween = null

export default {
  // 1st parameter: position about menu { left, top, width, height }
  // 2st parameter: viewport { width, height }
  getQuadrant(jewelBoundingRect, viewportDimension) {
    const result = []
    const jewelCenterX = jewelBoundingRect.left + jewelBoundingRect.width * 0.5
    const jewelCenterY = jewelBoundingRect.top + jewelBoundingRect.height * 0.5
    const viewportCenterX = viewportDimension.width * 0.5
    const viewportCenterY = viewportDimension.height * 0.5

    if (jewelCenterX < viewportCenterX) {
      result.push('left')
    } else if (jewelCenterX > viewportCenterX) {
      result.push('right')
    }

    if (jewelCenterY < viewportCenterY) {
      result.push('top')
    } else if (jewelCenterY > viewportCenterY) {
      result.push('bottom')
    }

    return result.join('-')
  },

  // updateOnIconOutOfViewport(
  //   jewelPosition,
  //   bubblePosition,
  //   originPosition,
  //   onUpdateLeft,
  //   onUpdateTop,
  // ) {
  //   const tweenDuration = 350
  //   const easeFn = TWEEN.Easing.Back.Out

  //   const {
  //     isLeftSideOutOfViewport,
  //     isRightSideOutOfViewport,
  //     isTopSideOutOfViewport,
  //     isBottomSideOutOfViewport,
  //   } = this.calcIconOutOfViewport(jewelPosition, bubblePosition)

  //   const updateTween = () => {
  //     if (leftTween) {
  //       leftTween.update()
  //     }

  //     if (topTween) {
  //       topTween.update()
  //     }

  //     requestAnimationFrame(updateTween)
  //   }

  //   const updateLeft = coord => {
  //     onUpdateLeft(coord)
  //   }

  //   const updateTop = coord => {
  //     onUpdateTop(coord)
  //   }

  //   const makeTween = (to, updateFn) => {
  //     return new TWEEN.Tween({
  //       left: originPosition.left,
  //       top: originPosition.top,
  //     })
  //       .to(to, tweenDuration)
  //       .easing(easeFn)
  //       .onUpdate(updateFn)
  //       .start()
  //   }

  //   const tweenOnHorizontal = () => {
  //     if (isLeftSideOutOfViewport) {
  //       debounceInsideXviewport(async () => {
  //         const bestLeft = bubblePosition.left || jewelPosition.left
  //         const LEFT_OFFSET = originPosition.left - bestLeft + 20

  //         leftTween = makeTween(
  //           {
  //             left: LEFT_OFFSET,
  //           },
  //           updateLeft,
  //         )
  //         updateTween()
  //       })
  //     } else if (isRightSideOutOfViewport) {
  //       debounceInsideXviewport(async () => {
  //         const originRight = originPosition.left + originPosition.width
  //         const bestRight = bubblePosition.right || jewelPosition.right
  //         const RIGHT_OFFSET = originRight - bestRight - 20

  //         leftTween = makeTween(
  //           {
  //             left: RIGHT_OFFSET,
  //           },
  //           updateLeft,
  //         )
  //         updateTween()
  //       })
  //     }
  //   }

  //   const tweenOnVertical = () => {
  //     if (isTopSideOutOfViewport) {
  //       debounceInsideYviewport(async () => {
  //         const TOP_OFFSET = originPosition.top - jewelPosition.top + 20

  //         topTween = makeTween({ top: TOP_OFFSET }, updateTop)
  //         updateTween()
  //       })
  //     } else if (isBottomSideOutOfViewport) {
  //       debounceInsideYviewport(async () => {
  //         const originBottom = originPosition.top + originPosition.height
  //         const BOTTOM_OFFSET = originBottom - jewelPosition.bottom - 20

  //         topTween = makeTween({ top: BOTTOM_OFFSET }, updateTop)
  //         updateTween()
  //       })
  //     }
  //   }

  //   tweenOnHorizontal()
  //   tweenOnVertical()
  // },

  // calcIconOutOfViewport(jewelPosition, bubblePosition) {
  //   const jewelWidthHalf = jewelPosition.width * 0.5
  //   const bubbleWidthHalf = bubblePosition.width * 0.5

  //   // 있을 수 없는 일, display: none일 경우 clientRect는 모든 값을 0으로 반환
  //   const isBubbleExist = bubbleWidthHalf > 0

  //   const mostNearLeft = isBubbleExist
  //     ? jewelPosition.left + jewelWidthHalf - bubbleWidthHalf
  //     : jewelPosition.left
  //   const mostNearRight = isBubbleExist
  //     ? jewelPosition.right - jewelWidthHalf + bubbleWidthHalf
  //     : jewelPosition.right

  //   const isLeftSideOutOfViewport = mostNearLeft < 0
  //   const isRightSideOutOfViewport = mostNearRight > window.innerWidth
  //   const isTopSideOutOfViewport = jewelPosition.top < 0
  //   const isBottomSideOutOfViewport = jewelPosition.bottom > window.innerHeight

  //   return {
  //     isLeftSideOutOfViewport,
  //     isRightSideOutOfViewport,
  //     isTopSideOutOfViewport,
  //     isBottomSideOutOfViewport,
  //   }
  // },
}

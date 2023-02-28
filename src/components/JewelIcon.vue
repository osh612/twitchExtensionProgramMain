<template>
  <div
    class="component-decakill-icon"
    :class="{ active: isQuizWindowOpen, openable: isQuizActive }"
  >
    <svg-decakill-main />
  </div>
</template>

<script>
import SvgDecakillMain from '@/components/svgs/SvgDecakillMain.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'JewelIcon',

  props: {
    isActiveQuizState: {
      type: Boolean,
    },
    // isInvisible: {
    //   type: Boolean,
    //   default: true,
    //   required: true,
    // },
  },

  components: {
    SvgDecakillMain,
  },

  computed: {
    ...mapGetters({
      getSt: 'getSt',
      isQuizActive: 'getIsQuizActive',
      isQuizWindowOpen: 'getIsQuizWindowOpen',
    }),

    decakillClassName() {
      return this.getSt === '' || this.isInvisible ? 'invisible' : this.getSt
    },
  },
}
</script>

<style scoped lang="scss">
.component-decakill-icon.invisible {
  display: none;
}
.component-decakill-icon.openable {
  cursor: pointer;
}
</style>

<template>
  <div class="rival-wrap">
    <RivalModal />
    <div class="rival-content">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>
<script>
import RivalModal from './component/rivalModal.vue'
// import store from '../../vuex/store'

export default {
  name: 'viewer-rival',
  components: { RivalModal },
  data() {
    return {}
  },
  props: [],
  async mounted() {
    this.moveRouteTo('RivalRanking')
  },
  computed: {},
  methods: {
    moveRouteTo(routeName) {
      this.$router.push({
        name: routeName,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.rival-wrap {
  display: flex;
  flex-direction: column;
  width: 19.875rem;
  height: 24.375rem;
  padding: 17px;
  box-sizing: border-box;
  .rival-content {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>

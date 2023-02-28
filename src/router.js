import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main/index.vue'
import Config from '@/pages/config/index.vue'
import Dashboard from '@/pages/dashboard/index.vue'
import Viewer from '@/pages/viewer/index.vue'
import Ranking from '@/pages/viewer/ranking.vue'
import Rival from '@/pages/viewer/rival.vue'
import Prediction from '@/pages/viewer/prediction.vue'
import AiPrediction from '@/pages/viewer/aiPrediction.vue'
import CheerPool from '@/pages/viewer/cheerPool.vue'
import RivalRanking from '@/pages/viewer/rivalRanking.vue'
import RivalCheckRequest from '@/pages/viewer/rivalCheckRequest.vue'
import RivalAddUser from '@/pages/viewer/rivalAddUser.vue'
import cheerPoolActive from '@/pages/viewer/cheerPoolActive.vue'
import Setting from '@/pages/viewer/setting.vue'
import Guide from '@/pages/viewer/guide.vue'

Vue.use(Router)

let url = window.location.pathname

const router = new Router({
  routes: [
    {
      path: url,
      name: 'Main',
      component: Main,
    },
    // { path: '*', redirect: '/' },
    {
      path: url,
      name: 'Viewer',
      component: Viewer,
      children: [
        {
          path: url,
          name: 'Ranking',
          component: Ranking,
        },
        {
          path: url,
          name: 'Rival',
          component: Rival,
          children: [
            {
              path: url,
              name: 'RivalRanking',
              component: RivalRanking,
            },
            {
              path: url,
              name: 'RivalCheckRequest',
              component: RivalCheckRequest,
            },
            {
              path: url,
              name: 'RivalAddUser',
              component: RivalAddUser,
            },
          ],
        },
        {
          path: url,
          name: 'Prediction',
          component: Prediction,
        },
        {
          path: url,
          name: 'Setting',
          component: Setting,
        },
        {
          path: url,
          name: 'Guide',
          component: Guide,
        },
        {
          path: url,
          name: 'AiPrediction',
          components: {
            aiPrediction: AiPrediction,
          },
        },
        {
          path: url,
          name: 'CheerPool',
          components: {
            cheerPool: CheerPool,
          },
        },
        {
          path: url,
          name: 'cheerPoolActive',
          components: {
            cheerPoolActive: cheerPoolActive,
          },
        },
        // {
        //   path: url,
        //   name: 'QuizWindow',
        //   components: QuizWindow,
        // },
        // {
        //   path: url,
        //   name: 'KillResultVideo',
        //   components: KillResultVideo,
        // },
        // {
        //   path: url,
        //   name: 'MyRecord',
        //   component: MyRecord,
        // },
        // {
        //   path: url,
        //   name: 'MyRecord',
        //   component: MyRecord,
        // },
      ],
    },
    {
      path: url,
      name: 'Config',
      component: Config,
    },
    {
      path: url,
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '*',
      redirect: () => {
        return { name: 'Main' }
      },
    },
  ],
  mode: 'history',
})
export default router

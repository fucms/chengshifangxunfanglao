import Layout from '@/layout'

const roomLifeRouter = {
  path: '/roomLifeCycle',
  component: Layout,
  redirect: '/oneFloor/index.vue',
  meta: {
    title: '房屋生命周期管理',
    icon: 'nested'
  },
  children: [
    {
      path: '/oneFloor',
      component: () => import('@/views/a_roomLifeCycle/oneFloor/index.vue'),
      name: 'oneFloor',
      meta: { title: '一楼一档' }
    },
    {
      path: '/roomInspection',
      component: () => import('@/views/a_roomLifeCycle/roomInspection/index.vue'),
      name: 'roomInspection',
      meta: { title: '房屋巡检' }
    },
    {
      path: '/dangerInvestRecords',
      component: () => import('@/views/a_roomLifeCycle/dangerInvestRecords/index.vue'),
      name: 'dangerInvestRecords',
      meta: { title: '隐患排查记录' }
    },
    {
      path: '/roomVerifyRecords',
      component: () => import('@/views/a_roomLifeCycle/roomVerifyRecords/index.vue'),
      name: 'roomVerifyRecords',
      meta: { title: '房屋核查记录' }
    },
    {
      path: '/greenFiling',
      component: () => import('@/views/a_roomLifeCycle/greenFiling/index.vue'),
      name: 'greenFiling',
      meta: { title: '绿码建档' }
    },
    {
      path: '/greenAssessment',
      component: () => import('@/views/a_roomLifeCycle/greenAssessment/index.vue'),
      name: 'greenAssessment',
      meta: { title: '绿码评定' }
    }
  ]
}

export default roomLifeRouter

import Layout from '@/layout'

const patrolDefenceRouter = {
  path: '/patrolDefence',
  component: Layout,
  redirect: '/personnelManage/index.vue',
  meta: {
    title: '自动化控制系统',
    icon: 'nested'
  },
  children: [
    {
      path: '/personnelManage',
      component: () => import('@/views/a_patrolDefence/personnelManage/index.vue'),
      name: 'personnelManage',
      meta: { title: '防洪排涝控制' }
    },
    {
      path: '/taskManage',
      component: () => import('@/views/a_patrolDefence/taskManage/index.vue'),
      name: 'taskManage',
      meta: { title: '冲污调度控制' }
    },
    {
      path: '/riskAlerts',
      component: () => import('@/views/a_patrolDefence/riskAlerts/index.vue'),
      name: 'riskAlerts',
      meta: { title: '河道景观控制' }
    },
    {
      path: '/alarmConfiguration',
      component: () => import('@/views/a_patrolDefence/alarmConfiguration/index.vue'),
      name: 'alarmConfiguration',
      meta: { title: '水系数据分析' }
    },
    {
      path: '/inspectionManage',
      component: () => import('@/views/a_patrolDefence/inspectionManage/index.vue'),
      name: 'inspectionManage',
      meta: { title: '设备性能诊断' }
    },
    {
      path: '/workOrderManage',
      component: () => import('@/views/a_patrolDefence/workOrderManage/index.vue'),
      name: 'workOrderManage',
      meta: { title: '水情信息共享' }
    }
  ]
}

export default patrolDefenceRouter

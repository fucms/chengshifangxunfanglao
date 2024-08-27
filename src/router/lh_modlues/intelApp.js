import Layout from '@/layout'

const intelAppRouter = {
  path: '/intelApp',
  component: Layout,
  redirect: '/domainDivision/index.vue',
  meta: {
    title: '观测监测系统',
    icon: 'nested'
  },
  children: [
    {
      path: '/domainDivision',
      component: () => import('@/views/a_intelApp/domainDivision/index.vue'),
      name: 'domainDivision',
      meta: { title: '多部门数据整合共享' }
    },
    {
      path: '/buildingManage',
      component: () => import('@/views/a_intelApp/buildingManage/index.vue'),
      name: 'buildingManage',
      meta: { title: '监测感知网建设' }
    },
    {
      path: '/smartTerminal',
      component: () => import('@/views/a_intelApp/smartTerminal/index.vue'),
      name: 'smartTerminal',
      meta: { title: '动态监测' }
    },
    {
      path: '/patrolLinkage',
      component: () => import('@/views/a_intelApp/patrolLinkage/index.vue'),
      name: 'patrolLinkage',
      meta: { title: '实时监测' }
    }

  ]
}

export default intelAppRouter

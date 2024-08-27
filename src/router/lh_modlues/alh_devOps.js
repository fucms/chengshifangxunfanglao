import Layout from '@/layout'

const alh_devOpsRouter = {
  path: '/alh_devOps',
  component: Layout,
  redirect: '/alh_devOps/alh_system/userList/index.vue',
  name: 'alh_devOps',
  meta: {
    title: '运维支撑',
    icon: 'nested'
  },
  children: [
    {
      path: 'alh_system',
      component: () => import('@/views/alh_devOps/alh_system/index.vue'), // Parent router-view
      name: 'alh_system',
      meta: { title: '系统管理' },
      redirect: '/alh_devOps/alh_system/userList/index.vue',
      children: [
        {
          path: 'userList',
          component: () =>
            import('@/views/alh_devOps/alh_system/userList/index.vue'),
          name: 'userList',
          meta: { title: '用户管理' }
        },
        {
          path: 'role',
          component: () =>
            import('@/views/alh_devOps/alh_system/role/index.vue'),
          name: 'role',
          meta: { title: '权限管理' }
        },
        {
          path: 'loglist',
          component: () =>
            import('@/views/alh_devOps/alh_system/loglist/index.vue'),
          name: 'loglist',
          meta: { title: '日志管理' }
        },
        {
          path: 'table',
          component: () =>
            import('@/views/alh_devOps/alh_system/table/index.vue'),
          name: 'table',
          meta: { title: '数据访问统计' }
        },
        {
          path: 'serve',
          component: () =>
            import('@/views/alh_devOps/alh_system/serve/index.vue'),
          name: 'serve',
          meta: { title: '服务使用登记' }
        }
      ]
    },
    {
      path: 'watch',
      component: () => import('@/views/alh_devOps/watch/index.vue'),
      name: 'watch',
      meta: { title: '系统监控' },
      redirect: '/alh_devOps/watch/watch_able/index.vue',
      children: [
        {
          path: 'watch_able',
          component: () =>
            import('@/views/alh_devOps/watch/watch_able/index.vue'),
          name: 'watch_able',
          meta: { title: '系统监控' }
        }
      ]
    }
  ]
}

export default alh_devOpsRouter

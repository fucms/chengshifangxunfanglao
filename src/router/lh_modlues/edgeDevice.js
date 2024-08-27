import Layout from '@/layout'

const edgeDeviceRouter = {
  path: '/edgeDevice',
  component: Layout,
  redirect: '/emergePhoneBook/index.vue',
  meta: {
    title: '边缘设备接入',
    icon: 'nested'
  },
  children: [
    {
      path: '/intelTerminal',
      component: () => import('@/views/a_edgeDevice/intelTerminal/index.vue'),
      name: 'intelTerminal',
      meta: { title: '智能终端管理' }
    },
    {
      path: '/edgeGather',
      component: () => import('@/views/a_edgeDevice/edgeGather/index.vue'),
      name: 'edgeGather',
      meta: { title: '边缘采集系统' }
    },
    {
      path: '/edgeDataAnalyse',
      component: () => import('@/views/a_edgeDevice/edgeDataAnalyse/index.vue'),
      name: 'edgeDataAnalyse',
      meta: { title: '边缘数据分析系统' }
    },
    {
      path: '/publicSource',
      component: () => import('@/views/a_edgeDevice/publicSource/index.vue'),
      name: 'publicSource',
      meta: { title: '公共资源接入' }
    }

  ]
}

export default edgeDeviceRouter

import Layout from '@/layout'

const produceRouter = {
  path: '/produce',
  component: Layout,
  redirect: '/basicInfo/index.vue',
  meta: {
    title: '预警警示系统',
    icon: 'nested'
  },
  children: [
    {
      path: '/basicInfo',
      component: () => import('@/views/produceManage/basicInfo/index.vue'),
      name: 'basicInfo',
      meta: { title: '防汛防涝预警' }
    },
    {
      path: '/tailorManage',
      component: () => import('@/views/produceManage/tailorManage/index.vue'),
      name: 'tailorManage',
      meta: { title: '横向成员单位视频会商' }
    },
    {
      path: '/qualityManage',
      component: () => import('@/views/produceManage/qualityManage/index.vue'),
      name: 'qualityManage',
      meta: { title: '预警会商展播' }
    }

  ]
}

export default produceRouter

import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  redirect: '/storageManage/index.vue',
  meta: {
    title: '信息发布系统',
    icon: 'nested'
  },
  children: [
    {
      path: '/itemCount',
      component: () => import('@/views/storageManage/itemCount/index.vue'),
      name: 'itemCount',
      meta: { title: '公告发布' }
    },
    {
      path: '/inventoryManage',
      component: () => import('@/views/storageManage/inventoryManage/index.vue'),
      name: 'inventoryManage',
      meta: { title: '市民上报' }
    }
  ]
}

export default storageRouter

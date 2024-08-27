import Layout from '@/layout'

const componentsRouter = {
  path: '/documentation',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: 'Documentation',
      meta: { title: '基础信息', icon: 'el-icon-user' }
    }
  ]
}

export default componentsRouter

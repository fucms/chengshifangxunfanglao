import Layout from '@/layout'

const businessRouter = {
  path: '/business',
  component: Layout,
  redirect: '/customerManage/index.vue',
  meta: {
    title: '系统管理',
    icon: 'nested'
  },
  children: [
    {
      path: '/customerManage',
      component: () => import('@/views/businessManage/customerManage/index.vue'),
      name: 'customerManage',
      meta: { title: '菜单管理' }
    },
    {
      path: '/supplierManage',
      component: () => import('@/views/businessManage/supplierManage/index.vue'),
      name: 'supplierManage',
      meta: { title: '用户管理' }
    },
    {
      path: '/productManage',
      component: () => import('@/views/businessManage/productManage/index.vue'),
      name: 'productManage',
      meta: { title: '定时任务' }
    },
    {
      path: '/materialsManage',
      component: () => import('@/views/businessManage/materialsManage/index.vue'),
      name: 'materialsManage',
      meta: { title: '区域管理' }
    },
    {
      path: '/orderManage',
      component: () => import('@/views/businessManage/orderManage/index.vue'),
      name: 'orderManage',
      meta: { title: '日志管理' }
    }
  ]
}

export default businessRouter

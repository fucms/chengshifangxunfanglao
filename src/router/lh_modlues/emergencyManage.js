import Layout from '@/layout'

const emergencyRouter = {
  path: '/emergency',
  component: Layout,
  redirect: '/emergePhoneBook/index.vue',
  meta: {
    title: '联排联调系统',
    icon: 'nested'
  },
  children: [
    {
      path: '/emergePhoneBook',
      component: () => import('@/views/a_emergencyManage/emergePhoneBook/index.vue'),
      name: 'emergePhoneBook',
      meta: { title: '联排联调专项规划' }
    },
    {
      path: '/warnInfoPublish',
      component: () => import('@/views/a_emergencyManage/warnInfoPublish/index.vue'),
      name: 'warnInfoPublish',
      meta: { title: '排水设施信息化管理' }
    },
    {
      path: '/emergeHandInfo',
      component: () => import('@/views/a_emergencyManage/emergeHandInfo/index.vue'),
      name: 'emergeHandInfo',
      meta: { title: '城区防洪排涝调度' }
    },
    {
      path: '/emergeDirectPolicy',
      component: () => import('@/views/a_emergencyManage/emergeDirectPolicy/index.vue'),
      name: 'emergeDirectPolicy',
      meta: { title: '多部门联合值守管理' }
    }
  ]
}

export default emergencyRouter

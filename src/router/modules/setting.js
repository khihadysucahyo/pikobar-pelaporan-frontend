import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/user/list',
  meta: {
    title: 'setting',
    icon: 'mdi-settings',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/user/list',
      component: () => import('@/views/user/list'),
      meta: {
        title: 'user_management',
        icon: 'mdi-account-multiple',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    }
  ]
}

export default settingRouter

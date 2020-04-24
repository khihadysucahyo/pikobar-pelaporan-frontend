import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/user/list',
  meta: {
    title: 'setting',
    icon: 'mdi-settings',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota']
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
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/user/create',
      component: () => import('@/views/user/formUser'),
      hidden: true,
      meta: {
        title: 'user_create',
        icon: 'mdi-book-plus',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/user/detail/:id',
      component: () => import('@/views/user/detail'),
      hidden: true,
      meta: {
        title: 'user_detail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/user/edit/:id',
      component: () => import('@/views/user/editUser'),
      hidden: true,
      meta: {
        title: 'user_edit',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/change-password',
      component: () => import('@/views/changePassword/index'),
      hidden: true,
      meta: {
        title: 'change_password',
        roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
      }
    },
    {
      path: '/change-password/:id',
      component: () => import('@/views/changePassword/index'),
      hidden: true,
      meta: {
        title: 'change_password',
        roles: ['superadmin']
      }
    }
  ]
}

export default settingRouter

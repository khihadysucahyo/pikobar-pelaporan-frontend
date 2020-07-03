import Layout from '@/layout'
import {
  rolesPerm
} from '@/utils/constantVariable'

const dashboardRouter = {
  path: '/',
  component: Layout,
  redirect: 'dashboard',
  meta: {
    icon: 'dashboard',
    roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
  },
  active: false,
  children: [
    {
      path: '/',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true,
        affix: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    }
  ]
}

export default dashboardRouter

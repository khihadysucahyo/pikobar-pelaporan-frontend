import Layout from '@/layout'

const rdtRouter = {
  path: '/rdt',
  component: Layout,
  redirect: '/rdt/list',
  meta: {
    title: 'rdt',
    icon: 'mdi-book-plus',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/rdt/create',
      component: () => import('@/views/rdt/newInput'),
      meta: {
        title: 'create_rdt',
        icon: 'mdi-book-plus',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    },
    {
      path: '/rdt/list',
      component: () => import('@/views/rdt/list'),
      meta: {
        title: 'list_rdt',
        icon: 'mdi-book-plus',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
      }
    },
    {
      path: '/rdt/update/:id',
      component: () => import('@/views/rdt/formRapid'),
      hidden: true,
      meta: {
        title: 'create_rdt',
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    }
  ]
}

export default rdtRouter

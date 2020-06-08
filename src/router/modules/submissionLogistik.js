import Layout from '@/layout'

const submissionLogistikRouter = {
  path: '/submission-logistik',
  component: Layout,
  redirect: '/submission-logistik/create',
  meta: {
    title: 'submission_Logistics',
    icon: 'mdi-clipboard-plus',
    roles: ['superadmin', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/submission-logistik/create',
      component: () => import('@/views/logistik/submissionLogistik'),
      meta: {
        title: 'submission_Logistics',
        icon: 'mdi-clipboard-plus',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
      }
    }
    // {
    //   path: '/submission-logistik/list',
    //   component: () => import('@/views/logistik/submissionLogistikList'),
    //   meta: {
    //     title: 'application_list',
    //     icon: 'library_books',
    //     child: true,
    //     noCache: true,
    //     roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
    //   }
    // }
  ]
}

export default submissionLogistikRouter

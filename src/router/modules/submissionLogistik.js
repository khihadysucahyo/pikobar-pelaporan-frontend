import Layout from '@/layout'

const submissionLogistikRouter = {
  path: '/submission-logistik',
  component: Layout,
  redirect: '/submission-logistik/list',
  meta: {
    title: 'submission_Logistics',
    icon: 'library_books',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/submission-logistik/create',
      component: () => import('@/views/logistik/submissionLogistik'),
      meta: {
        title: 'submit_application',
        icon: 'library_books',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    },
    {
      path: '/submission-logistik/list',
      component: () => import('@/views/logistik/submissionLogistikList'),
      meta: {
        title: 'application_list',
        icon: 'library_books',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
      }
    }
  ]
}

export default submissionLogistikRouter

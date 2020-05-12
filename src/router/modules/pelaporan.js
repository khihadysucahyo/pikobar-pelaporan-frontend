import Layout from '@/layout'

const surveyRouter = {
  path: '/laporan',
  component: Layout,
  redirect: '/laporan/list',
  meta: {
    title: 'laporan_title',
    icon: 'library_books',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/laporan/create',
      component: () => import('@/views/laporan/formStepper'),
      meta: {
        title: 'laporan_create',
        icon: 'library_books',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    },
    {
      path: '/laporan/verification',
      component: () => import('@/views/laporan/verification'),
      meta: {
        title: 'verify_case',
        icon: 'library_books',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    },
    {
      path: '/laporan/list',
      component: () => import('@/views/laporan/list'),
      meta: {
        title: 'list_case',
        icon: 'library_books',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
      }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/laporan/detail'),
      hidden: true,
      meta: {
        title: 'laporan_detail',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
      }
    },
    {
      path: 'edit-case/:id',
      component: () => import('@/views/laporan/editCase'),
      hidden: true,
      meta: {
        title: 'laporan_edit',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    },
    {
      path: 'edit-history-case/:id',
      component: () => import('@/views/laporan/editHistoryCase'),
      hidden: true,
      meta: {
        title: 'laporan_edit',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    }
  ]
}

export default surveyRouter

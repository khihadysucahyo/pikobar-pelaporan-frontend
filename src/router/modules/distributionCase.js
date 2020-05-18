import Layout from '@/layout/distributionCase'

const distributionCaseRouter = {
  path: '/distribution-case',
  component: Layout,
  redirect: '/distribution-case/map',
  meta: {
    title: 'distribution_case',
    icon: 'mdi-map-marker-radius',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota']
  },
  active: false,
  children: [
    {
      path: '/distribution-case/map',
      component: () => import('@/views/distributionCase/map'),
      meta: {
        title: 'distribution_case_map',
        icon: 'mdi-map-marker-radius',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    }
    // {
    //   path: '/distribution-case/network',
    //   component: () => import('@/views/distributionCase/network'),
    //   meta: {
    //     title: 'distribution_case_network',
    //     icon: 'location_on',
    //     child: true,
    //     noCache: true,
    //     roles: ['superadmin', 'dinkesprov', 'dinkeskota']
    //   }
    // }
  ]
}

export default distributionCaseRouter

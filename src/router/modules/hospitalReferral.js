import Layout from '@/layout'

const hospitalReferralRouter = {
  path: '/hospital-referral',
  component: Layout,
  redirect: '/hospital-referral/list',
  meta: {
    title: 'refer_patient',
    icon: 'mdi-account-switch',
    roles: ['superadmin', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/hospital-referral/create',
      component: () => import('@/views/hospitalReferral/form'),
      meta: {
        title: 'make_referral',
        icon: 'mdi-account-switch',
        child: true,
        noCache: true,
        roles: ['superadmin', 'faskes']
      }
    },
    {
      path: '/hospital-referral/list',
      component: () => import('@/views/hospitalReferral/list'),
      meta: {
        title: 'referral_patient_list',
        icon: 'mdi-account-switch',
        child: true,
        noCache: true,
        roles: ['superadmin', 'faskes']
      }
    }
  ]
}

export default hospitalReferralRouter

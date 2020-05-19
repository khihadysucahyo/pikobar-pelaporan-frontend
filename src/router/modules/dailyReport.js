import Layout from '@/layout'

const dailyReportRouter = {
  path: '/daily-report',
  component: Layout,
  redirect: '/daily-report',
  meta: {
    title: 'daily_report',
    icon: 'mdi-calendar-blank',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/daily-report',
      component: () => import('@/views/laporan/dailyReport'),
      meta: {
        title: 'daily_report',
        icon: 'mdi-calendar-blank',
        child: true,
        noCache: true,
        roles: ['superadmin', 'dinkeskota', 'faskes']
      }
    }
  ]
}

export default dailyReportRouter

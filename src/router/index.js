import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import dashboardRouter from './modules/dashboard'
import Pelaporan from './modules/pelaporan'
import rdtRouter from './modules/rdt'
import settingRouter from './modules/setting'
import distributionCaseRouter from './modules/distributionCase'
import submissionLogistikRouter from './modules/submissionLogistik'
import dailyReportRouter from './modules/dailyReport'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/change-password',
    component: Layout,
    hidden: true,
    meta: {
      title: 'change_password'
    },
    children: [
      {
        path: '/change-password',
        component: () => import('@/views/changePassword/index'),
        hidden: true,
        meta: {
          title: 'change_password'
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  dashboardRouter,
  distributionCaseRouter,
  dailyReportRouter,
  Pelaporan,
  rdtRouter,
  submissionLogistikRouter,
  settingRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

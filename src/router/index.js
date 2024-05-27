import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/course',
    component: Layout,
    redirect: '/course',
    name: 'course',
    meta: {
      title: '课程管理',
      icon: 'course'
    },
    children: [
      {
        path: 'courseAdd',
        component: () => import('@/views/course/courseAdd'),
        name: 'courseAdd',
        meta: { title: '添加课程', icon: 'system' }
      },
      {
        path: 'courseDetail',
        component: () => import('@/views/course/courseDetail'),
        name: 'courseDetail',
        meta: { title: '课程详情', icon: 'system' }
      },
      {
        path: 'courseSchedule',
        component: () => import('@/views/course/courseSchedule'),
        name: 'courseSchedule',
        meta: { title: '课程管理', icon: 'system' }
      }
    ]
  },
  {
    path: '/System',
    component: Layout,
    redirect: '/System',
    name: 'System',
    meta: {
      roles: ['admin'],
      title: '系统管理',
      icon: 'system'
    },
    children: [
      {
        path: 'SystemOption',
        component: () => import('@/views/System/systemOption'),
        name: 'SystemOption',
        meta: { title: '系统配置', icon: 'system' }
      },
      {
        path: 'SystemLog',
        component: () => import('@/views/System/systemLog'),
        name: 'SystemLog',
        meta: { title: '日志管理', icon: 'system' }
      },
      {
        path: 'SystemOther',
        component: () => import('@/views/System/systemOther'),
        name: 'SystemOther',
        meta: { title: '其他', icon: 'system' }
      }
    ]
  },
  {
    path: '/studentCenter',
    component: Layout,
    redirect: '/studentCenter',
    name: 'studentCenter',
    meta: {
      roles: ['admin'],
      title: '个人中心',
      icon: 'nested'
    },
    children: [
      {
        path: 'studentInfo',
        component: () => import('@/views/studentCenter/studentInfo'),
        name: 'studentInfo',
        meta: { title: '个人信息', icon: 'nested' }
      },
      {
        path: 'studentCourse',
        component: () => import('@/views/studentCenter/studentCourse'),
        name: 'studentCourse',
        meta: { title: '我的课程', icon: 'nested' }
      },
    ]
  },
  {
    path: '/analysis',
    component: Layout,
    redirect: '/analysis',
    name: 'analysis',
    meta: {
      title: '数据分析',
      icon: 'nested'
    },
    children: [
      {
        path: 'courseEngagement',
        component: () => import('@/views/analysis/courseEngagement'),
        name: 'courseEngagement',
        meta: { title: '课程参与度', icon: 'nested' }
      },
      {
        path: 'stuPerformance',
        component: () => import('@/views/analysis/stuPerformance'),
        name: 'stuPerformance',
        meta: { title: '学生情况分析', icon: 'nested' }
      },
    ]
  },
  {
    path: '/homework',
    component: Layout,
    redirect: '/homework',
    name: 'homework',
    meta: {
      title: '作业与考试',
      icon: 'nested'
    },
    children: [
      {
        path: 'assignments',
        component: () => import('@/views/homework/assignments'),
        name: 'assignments',
        meta: { title: '作业', icon: 'nested' }
      },
      {
        path: 'exams',
        component: () => import('@/views/homework/exams'),
        name: 'exams',
        meta: { title: '考试', icon: 'nested' }
      },
      {
        path: 'publishResults',
        component: () => import('@/views/homework/publishResults'),
        name: 'publishResults',
        meta: { title: '成绩发布', icon: 'nested' }
      },
    ]
  },
  {
    path: '/stuHomework',
    component: Layout,
    redirect: '/stuHomework',
    name: 'stuHomework',
    meta: {
      title: '作业与考试',
      icon: 'nested'
    },
    children: [
      {
        path: 'stuAssignments',
        component: () => import('@/views/stuHomework/stuAssignments'),
        name: 'stuAssignments',
        meta: { title: '作业', icon: 'nested' }
      },
      {
        path: 'stuExams',
        component: () => import('@/views/stuHomework/stuExams'),
        name: 'stuExams',
        meta: { title: '考试', icon: 'nested' }
      },
      {
        path: 'viewGrades',
        component: () => import('@/views/stuHomework/viewGrades'),
        name: 'viewGrades',
        meta: { title: '查看成绩', icon: 'nested' }
      },
    ]
  },
  {
    path: '/stuManage',
    component: Layout,
    redirect: '/stuManage',
    name: 'stuManage',
    meta: {
      title: '学生管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'stuInteraction',
        component: () => import('@/views/stuManage/stuInteraction'),
        name: 'stuInteraction',
        meta: { title: '学生互动', icon: 'nested' }
      },
      {
        path: 'stuList',
        component: () => import('@/views/stuManage/stuList'),
        name: 'stuList',
        meta: { title: '学生列表', icon: 'nested' }
      },
      {
        path: 'stuProgress',
        component: () => import('@/views/stuManage/stuProgress'),
        name: 'stuProgress',
        meta: { title: '学生进度', icon: 'nested' }
      },
    ]
  },
  {
    path: '/stuCourse',
    component: Layout,
    redirect: '/stuCourse',
    name: 'stuCourse',
    meta: {
      title: '课程学习',
      icon: 'nested'
    },
    children: [
      {
        path: 'myCourse',
        component: () => import('@/views/stuCourse/myCourse'),
        name: 'myCourse',
        meta: { title: '我的课程', icon: 'nested' }
      },
      {
        path: 'courseDetails',
        component: () => import('@/views/stuCourse/courseDetails'),
        name: 'courseDetails',
        meta: { title: '课程内容', icon: 'nested' }
      },
    ]
  },
  {
    path: '/stuNotice',
    component: Layout,
    redirect: '/stuNotice',
    children: [{
      path: 'stuNotice',
      name: 'stuNotice',
      component: () => import('@/views/stuNotice/index'),
      meta: { title: '学生通知', icon: 'dashboard' }
    }]
  },
  {
    path: '/teaNotice',
    component: Layout,
    redirect: '/teaNotice',
    children: [{
      path: 'teaNotice',
      name: 'teaNotice',
      component: () => import('@/views/teaNotice/index'),
      meta: { title: '发布通知', icon: 'dashboard' }
    }]
  },
  {
    path: '/stuDiscuss',
    component: Layout,
    redirect: '/stuDiscuss',
    children: [{
      path: 'stuDiscuss',
      name: 'stuDiscuss',
      component: () => import('@/views/stuDiscuss/index'),
      meta: { title: '互动交流', icon: 'dashboard' }
    }]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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

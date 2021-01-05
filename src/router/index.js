import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/404.vue'
import Welcome from '../views/welcome.vue'
import Login from '../views/login.vue'

import Users from '../views/user/users.vue'
import Rights from '../views/role/rights.vue'
import Roles from '../views/role/roles.vue'

import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// Progress 进度条样式

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'Welcome', component: Welcome },
      { path: '/users', name: 'Users', component: Users }, // 用户列表
      { path: '/rights', name: 'Rights', component: Rights }, // 权限列表
      { path: '/roles', name: 'Roles', component: Roles } // 角色列表
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()// 开始Progress
  if (to.path === '/login') {
    next()
  } else {
    if (Cookies.get('DianShan')) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done() // 结束Progress
})
export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      children: [
        {
          path: '/qwe',
          name: 'welcome-login',
          component: () => import('@/components/welcome/LoginPage.vue')
        }, {
          path: 'register',
          name: 'welcome-register',
          component: () => import('@/components/welcome/RegisterPage.vue')
        },{
          path: 'forget',
          name: 'welcome-forget',
          component: () => import('@/components/welcome/ForgetPage.vue')
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/qwe',
      name: 'TestUpload',
      component: () => import('@/views/TestUpload.vue')
    },
    {
      path: '/test',
      name: 'TestUpload',
      component: () => import('@/views/Test.vue')
    }
  ]
})

export default router

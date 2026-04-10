import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/verify' },
    { path: '/verify', name: 'Verify', component: () => import('../views/Verify.vue') },
    {
      path: '/form',
      name: 'Form',
      component: () => import('../views/FormLayout.vue'),
      beforeEnter: () => {
        if (!sessionStorage.getItem('tempToken')) {
          return '/verify'
        }
      }
    },
    { path: '/success', name: 'Success', component: () => import('../views/Submit.vue') },
    { path: '/result', name: 'Result', component: () => import('../views/Result.vue') },
    { path: '/onboarding', name: 'Onboarding', component: () => import('../views/Onboarding.vue') }
  ]
})

export default router


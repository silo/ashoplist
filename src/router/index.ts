import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/Home.vue'),
    },
    {
      name: 'shoppingList',
      path: '/list/:id',
      component: () => import('@/pages/ShoppingList.vue')
    }
  ]
})

// router.beforeEach(async (to, _from, next) => {
//   if (to.name === 'noAccess') {
//     next()
//   } else {
//     next({ name: 'noAccess' })
//   }
// })

export default router

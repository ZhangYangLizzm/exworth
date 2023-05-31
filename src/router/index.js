import BlankLayout from '@/layouts/BlankLayout.vue'
import routes from './routes'
import { i18n } from '@/plugins/i18n'

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  next()
})


export default router
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)
const pinia = createPinia()

const appName = import.meta.env.VITE_APP_NAME || 'My App'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || appName // Set the title from the route meta or use a default title

  // Check that the route exists, otherwise redirect to the 404 page
  if (!to.matched.length) {
    next({ name: 'NotFound' })
    return // Prevent further execution to avoid calling next() twice
  }
  next()
})

router.onError((error) => {
  console.error('Routing error:', error)
})

app.use(pinia).use(router).mount('#app')

const authStore = useAuthStore()
authStore.initialize()

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth' // P6de9

const app = createApp(App)

const authStore = useAuthStore() // P4908

const appName = import.meta.env.VITE_APP_NAME || 'My App'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || appName // Set the title from the route meta or use a default title

  // Check that the route exists, otherwise redirect to the 404 page
  if (!to.matched.length) {
    next({ name: 'NotFound' })
  }
  next()
})

router.onError((error, to, from) => {
  const errorMessage = `There was an error loading the page ${to.name} from ${from.name}: ${error.message}`
  console.error(errorMessage, error)
})

authStore.initialize() // P2fec

// Use Pinia, Vue Router, and Highlight.js Vue Plugin
app.use(createPinia()).use(router).mount('#app')

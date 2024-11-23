<template>
  <div class="main-layout">
    <layoutHeader :sticky="true">
      <!-- Logo slot -->
      <template #logo>
        <img src="/logo.png" alt="MyNextStep Logo" class="layout-header__logo" />
      </template>

      <!-- Navigation slot -->
      <template #navigation>
        <a v-if="env == 'development'" href="/devcenter/" class="layout-header nav-item"
          >DevCenter</a
        >
        <a href="#" class="layout-header nav-item">Home</a>
        <!-- <a href="#" class="layout-header nav-item">Products</a>
        <a href="#" class="layout-header nav-item">Services</a>
        <a href="#" class="layout-header nav-item">About</a> -->
      </template>

      <!-- Actions slot -->
      <template #actions>
        <!-- If the user isn't logged in show the Sign in and get started buttons -->
        <div v-if="!isAuthenticated">
          <button class="action-button secondary" @click="navigateToLogin">Sign In</button>
          <button class="action-button primary" @click="navigateToRegister">Get Started</button>
        </div>
      </template>
    </layoutHeader>

    <main class="main-layout__body">
      <slot></slot>
    </main>

    <footer v-if="$slots.footer">
      <layoutFooter></layoutFooter>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import layoutHeader from '@/components/app/layoutElements/LayoutHeader.vue'
import layoutFooter from '@/components/app/layoutElements/LayoutFooter.vue'

export default {
  name: 'LayoutMain',
  components: {
    layoutHeader,
    layoutFooter,
  },
  setup() {
    const router = useRouter()
    const showHeader = ref(false)
    const env = import.meta.env.MODE
    const authStore = useAuthStore()

    const handleScroll = () => {
      showHeader.value = window.scrollY > 100
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    function navigateToLogin() {
      router.push('/login')
    }

    function navigateToRegister() {
      router.push('/register')
    }

    return {
      env,
      showHeader,
      navigateToLogin,
      navigateToRegister,
      isAuthenticated: authStore.isAuthenticated,
    }
  },
}
</script>

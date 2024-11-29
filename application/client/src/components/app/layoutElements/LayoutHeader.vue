<template>
  <header class="layout-header--sticky">
    <div class="layout-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <slot name="header-logo">
          <!-- Default logo placeholder -->
          <img src="/logo.png" alt="Logo" class="header-logo" />
          <div v-if="devMode" class="dev-mode-indicator">Dev Mode ✅</div>
        </slot>
      </div>

      <!-- Navigation Section -->
      <nav class="header-nav">
        <slot name="navigation">
          <!-- Navigation items will be inserted here -->
        </slot>
      </nav>

      <!-- Actions Section -->
      <div class="header-actions">
        <slot name="actions">
          <div>
            <button @click="navigateToLogin">Sign In</button>
            <button @click="navigateToRegister">Get Started</button>
          </div>
        </slot>
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'LayoutHeader',
  props: {
    height: {
      type: String,
      default: '64px',
    },
    sticky: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter()

    function navigateToLogin() {
      router.push('/login')
    }

    function navigateToRegister() {
      router.push('/register')
    }

    return {
      navigateToLogin,
      navigateToRegister,
    }
  },
  computed: {
    devMode() {
      return import.meta.env.MODE === 'development'
    },
  },
}
</script>

<template>
  <router-link :to="destination" v-if="isAuthenticated">
    <button class="action-button primary">{{ buttonText }}</button>
  </router-link>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'GoToButton',
  props: {
    destination: {
      type: String,
      default: '/',
    },
    buttonText: {
      type: String,
      default: 'Go Back',
    },
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    },
  },
}
</script>

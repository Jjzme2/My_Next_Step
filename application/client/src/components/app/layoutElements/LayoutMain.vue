<template>
  <div class="main-layout">
    <layoutHeader :sticky="true">
      <!-- Logo slot -->
      <template #logo>
        <img src="/logo.png" alt="MyNextStep Logo" class="header-logo">
      </template>

      <!-- Navigation slot -->
      <template #navigation>
        <a href="#" class="nav-item">Home</a>
        <!-- <a href="#" class="nav-item">Products</a>
        <a href="#" class="nav-item">Services</a>
        <a href="#" class="nav-item">About</a> -->
      </template>

      <!-- Actions slot -->
      <template #actions>
        <button class="action-button">Sign In</button>
        <button class="action-button primary">Get Started</button>
      </template>
    </layoutHeader>





    <main class="body">
      <slot></slot>
    </main>

    <footer v-if="$slots.footer">
      <layoutFooter></layoutFooter>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import layoutHeader from '@/components/app/layoutElements/LayoutHeader.vue'
import layoutFooter from '@/components/app/layoutElements/LayoutFooter.vue'

export default {
  name: 'LayoutMain',
  components: {
    layoutHeader,
    layoutFooter
  },
  setup() {
    const showHeader = ref(false)

    const handleScroll = () => {
      showHeader.value = window.scrollY > 100
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showHeader
    }
  }
}
</script>

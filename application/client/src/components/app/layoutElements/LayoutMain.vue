<template>
  <div class="main-layout">
    <layoutHeader :sticky="true">
      <!-- Logo slot -->
      <template #logo>
        <img src="/logo.png" alt="MyNextStep Logo" class="layout-header__logo">
      </template>

      <!-- Navigation slot -->
      <template #navigation>
        <a href="#" class="layout-header__nav-item">Home</a>
        <!-- <a href="#" class="layout-header__nav-item">Products</a>
        <a href="#" class="layout-header__nav-item">Services</a>
        <a href="#" class="layout-header__nav-item">About</a> -->
      </template>

      <!-- Actions slot -->
      <template #actions>
        <button class="layout-header__action-button">Sign In</button>
        <button class="layout-header__action-button layout-header__action-button--primary">Get Started</button>
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

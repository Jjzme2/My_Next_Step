<template>
  <header class="layout-header">
    <div class="layout-header__container">
      <!-- Logo Section -->
      <div class="layout-header__logo-section">
        <slot name="logo">
          <!-- Default logo placeholder -->
          <img
            src="/logo.png"
            alt="Logo"
            class="layout-header__logo"
          >
        </slot>
      </div>

      <!-- Navigation Section -->
      <nav class="layout-header__nav">
        <slot name="navigation">
          <!-- Navigation items will be inserted here -->
        </slot>
      </nav>

      <!-- Actions Section -->
      <div class="layout-header__actions">
        <slot name="actions">
          <!-- Action items (buttons, user menu, etc.) will be inserted here -->
        </slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  props: {
    height: {
      type: String,
      default: '64px'
    },
    sticky: {
      type: Boolean,
      default: false
    }
  }
}
</script>

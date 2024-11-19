
<template>
  <header class="layout-header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <slot name="logo">
          <!-- Default logo placeholder -->
          <img
            src="/logo.png"
            alt="Logo"
            class="header-logo"
          >
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

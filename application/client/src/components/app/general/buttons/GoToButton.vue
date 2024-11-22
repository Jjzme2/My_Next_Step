<template>
  <router-link :to="destination" v-if="isAuthenticated">
    <button class="action-button primary">{{ buttonText }}</button>
  </router-link>
</template>

<script>
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
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // from() {
    // 	return this.$route.path;
    // },
  },
}
</script>

<template>
  <BaseView>
    <template #default>
      Welcome to My Next Step.
    </template>
  </BaseView>
</template>

<script>
import BaseView from './BaseView.vue'

export default {
    name: "HomeView",
  components: {
    BaseView
  },
  data() {
    return {}
  }
}
</script>

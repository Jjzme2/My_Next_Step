<template>
  <mainLayout>
    <template #header v-if="includeHeader"></template>

    <template #default>
      <div>
        <goBackButton v-if="includeGoHomeButton" :destination="targetDestination" />
        <slot></slot>
      </div>
    </template>

    <template #footer v-if="includeFooter"></template>
  </mainLayout>

  <!-- <alertBox
    v-if="alertVisible"
    :message="alertMessage"
    :type="alertType"
    v-model:visible="alertVisible"
    :duration="alertDuration"
  ></alertBox> -->
</template>

<script>
import mainLayout from '@/components/app/layoutElements/LayoutMain.vue'
import goBackButton from '@/components/app/general/buttons/GoToButton.vue'

// import alertBox from '@/components/app/mainElements/alerts/alertBox.vue'

export default {
  name: 'BaseView',
  components: {
    mainLayout,
    goBackButton
    // alertBox
  },
  props: {
    includeHeader: {
      type: Boolean,
      default: true
    },
    includeFooter: {
      type: Boolean,
      default: true
    },
    includeGoHomeButton: {
      type: Boolean,
      default: true
    },
    targetDestination: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>

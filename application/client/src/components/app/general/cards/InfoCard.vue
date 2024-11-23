<template>
  <div class="info-card">
    <img
      v-if="image"
      v-bind:src="image"
      alt="Card Image"
      class="info-card__image centered"
      :key="image"
    />
    <div class="info-card__content">
      <h3 class="info-card__title">{{ title }}</h3>
      <p class="info-card__description">{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
}
</script>

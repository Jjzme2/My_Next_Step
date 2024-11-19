<template>
  <div class="info-card">
    <img v-if="image" :src="image" alt="Card Image" class="info-card-image" />
    <div class="info-card-content">
      <h3 class="info-card-title">{{ title }}</h3>
      <p class="info-card-description">{{ description }}</p>
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
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.info-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.info-card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.info-card-content {
  padding: 1rem;
}

.info-card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.info-card-description {
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>

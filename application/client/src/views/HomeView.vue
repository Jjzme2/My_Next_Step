<template>
  <BaseView>
    <template #default>
      <section class="hero-section">
        <div class="hero-section__content">
          <h1 class="hero-section__title">Welcome to My Next Step, {{ username }}</h1>
          <p class="hero-section__description">
            Your journey to achieving your dreams starts here.
          </p>
          <button class="hero-section__button hero-section__button--primary">Get Started</button>
        </div>
      </section>

      <section>
        <h2 class="section-title text-centered">Core Features</h2>
        <div class="grid grid-4 grid-gap-4 p-xl">
          <InfoCard
            class="feature-item"
            v-for="feature in features"
            :key="feature.title"
            :title="feature.title"
            :description="feature.description"
            :image="feature.image"
          />
        </div>
      </section>

      <section class="cta-section">
        <h2 class="cta-title">Ready to take the next step?</h2>
        <button class="cta-button">Join Now</button>
      </section>
    </template>
  </BaseView>
</template>

<script>
import BaseView from './BaseView.vue'
import InfoCard from '@/components/app/general/cards/InfoCard.vue'
// import stringUtils from '@/utils/stringUtils';

export default {
  name: 'HomeView',
  components: {
    BaseView,
    InfoCard,
  },
  data() {
    return {
      username: '',
      features: [
        {
          title: 'SMART Goals Framework',
          description:
            'Guided templates for creating Specific, Measurable, Achievable, Relevant, and Time-bound goals.',
          image: 'src/assets/images/svg/smart-goals.svg',
        },
        {
          title: 'Custom Habit & Task Creation',
          description:
            'Define actionable habits and tasks tied to goals without system-generated assumptions.',
          image: 'src/assets/images/svg/custom-habit.svg',
        },
        {
          title: 'Reflection Support',
          description:
            'Integrated journaling and note-taking to encourage reflection on progress, successes, and setbacks.',
          image: 'src/assets/images/svg/reflection-support.svg',
        },
        {
          title: 'Adaptive Reminders',
          description:
            'Starts with subtle nudges and progresses to more direct motivational messages if tasks or habits are skipped.',
          image: 'src/assets/images/svg/adaptive-reminders.svg',
        },
        {
          title: 'Accountability Options',
          description:
            'Optional features to involve friends, accountability partners, or the broader community.',
          image: 'src/assets/images/svg/accountability-options.svg',
        },
        {
          title: 'Failure-Friendly Support',
          description:
            'Encourages users to adjust rather than abandon goals, emphasizing progress over perfection.',
          image: 'src/assets/images/svg/failure-friendly.svg',
        },
        {
          title: 'Data & Insights',
          description:
            'Visualize trends, progress, and habit streaks. Reflect on high and low performance periods with actionable insights.',
          image: 'src/assets/images/svg/data-insights.svg',
        },
        {
          title: 'Resource Storage',
          description: 'Save notes, links, or custom guides relevant to specific goals and habits.',
          image: 'src/assets/images/svg/resource-storage.svg',
        },
      ],
    }
  },
  async mounted() {
    try {
      const response = await fetch('/auth/user-info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      const data = await response.json()
      this.username = data.username
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<template>
  <BaseView>
    <template #default>
      <section class="hero-section">
        <div class="hero-content">
          <h1>Welcome to My Next Step</h1>
          <p>Your journey to achieving your dreams starts here.</p>
          <button class="hero-button primary">Get Started</button>
        </div>
      </section>

      <section class="features-section">
        <h2>Core Features</h2>
        <div class="features-grid">
          <InfoCard v-for="feature in features" :key="feature.title" :title="feature.title" :description="feature.description" :image="feature.image" />
        </div>
      </section>

      <section class="cta-section">
        <h2>Ready to take the next step?</h2>
        <button class="cta-button primary">Join Now</button>
      </section>
    </template>
  </BaseView>
</template>

<script>
import BaseView from './BaseView.vue'
import InfoCard from '@/components/app/general/cards/InfoCard.vue';
import feature1 from '@/assets/feature1.svg';
import feature2 from '@/assets/feature2.svg';
import feature3 from '@/assets/feature3.svg';
import feature4 from '@/assets/feature4.svg';
import feature5 from '@/assets/feature5.svg';
import feature6 from '@/assets/feature6.svg';
import feature7 from '@/assets/feature7.svg';
import feature8 from '@/assets/feature8.svg';

export default {
    name: "HomeView",
  components: {
    BaseView,
    InfoCard
  },
  data() {
    return {
      features: [
        {
          title: 'SMART Goals Framework',
          description: 'Guided templates for creating Specific, Measurable, Achievable, Relevant, and Time-bound goals.',
          image: feature1
        },
        {
          title: 'Custom Habit & Task Creation',
          description: 'Define actionable habits and tasks tied to goals without system-generated assumptions.',
          image: feature2
        },
        {
          title: 'Reflection Support',
          description: 'Integrated journaling and note-taking to encourage reflection on progress, successes, and setbacks.',
          image: feature3
        },
        {
          title: 'Adaptive Reminders',
          description: 'Starts with subtle nudges and progresses to more direct motivational messages if tasks or habits are skipped.',
          image: feature4
        },
        {
          title: 'Accountability Options',
          description: 'Optional features to involve friends, accountability partners, or the broader community.',
          image: feature5
        },
        {
          title: 'Failure-Friendly Support',
          description: 'Encourages users to adjust rather than abandon goals, emphasizing progress over perfection.',
          image: feature6
        },
        {
          title: 'Data & Insights',
          description: 'Visualize trends, progress, and habit streaks. Reflect on high and low performance periods with actionable insights.',
          image: feature7
        },
        {
          title: 'Resource Storage',
          description: 'Save notes, links, or custom guides relevant to specific goals and habits.',
          image: feature8
        }
      ]
    }
  }
}
</script>

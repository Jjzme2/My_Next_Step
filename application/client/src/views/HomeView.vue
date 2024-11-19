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
          <div class="feature-item">
            <h3>SMART Goals Framework</h3>
            <p>Guided templates for creating Specific, Measurable, Achievable, Relevant, and Time-bound goals.</p>
          </div>
          <div class="feature-item">
            <h3>Custom Habit & Task Creation</h3>
            <p>Define actionable habits and tasks tied to goals without system-generated assumptions.</p>
          </div>
          <div class="feature-item">
            <h3>Reflection Support</h3>
            <p>Integrated journaling and note-taking to encourage reflection on progress, successes, and setbacks.</p>
          </div>
          <div class="feature-item">
            <h3>Adaptive Reminders</h3>
            <p>Starts with subtle nudges and progresses to more direct motivational messages if tasks or habits are skipped.</p>
          </div>
          <div class="feature-item">
            <h3>Accountability Options</h3>
            <p>Optional features to involve friends, accountability partners, or the broader community.</p>
          </div>
          <div class="feature-item">
            <h3>Failure-Friendly Support</h3>
            <p>Encourages users to adjust rather than abandon goals, emphasizing progress over perfection.</p>
          </div>
          <div class="feature-item">
            <h3>Data & Insights</h3>
            <p>Visualize trends, progress, and habit streaks. Reflect on high and low performance periods with actionable insights.</p>
          </div>
          <div class="feature-item">
            <h3>Resource Storage</h3>
            <p>Save notes, links, or custom guides relevant to specific goals and habits.</p>
          </div>
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

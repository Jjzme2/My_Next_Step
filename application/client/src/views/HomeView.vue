<template>
  <BaseView>
    <template #default>
      <section class="summary-section">
        <h1>Welcome to My Next Step</h1>
        <p>
          "My Next Step" is a habit-building and goal-setting web application designed to guide users
          toward achieving their dreams and aspirations. It empowers users of all experience levels, from
          beginners to experts, with tools to define and achieve meaningful goals through supportive and
          personalized features. The app encourages persistence, reflection, and community engagement while
          maintaining a failure-friendly, motivational environment.
        </p>
        <h2>Core Features</h2>
        <ul>
          <li><strong>SMART Goals Framework:</strong> Guided templates for creating Specific, Measurable, Achievable, Relevant, and Time-bound goals. Flexibility to customize goals or use templates based on user preference.</li>
          <li><strong>Custom Habit & Task Creation:</strong> Define actionable habits and tasks tied to goals without system-generated assumptions. Offers optional reminders and milestone checkpoints.</li>
          <li><strong>Reflection Support:</strong> Integrated journaling and note-taking to encourage reflection on progress, successes, and setbacks. Prompts for users to revisit their "why" during challenging periods.</li>
          <li><strong>Adaptive Reminders:</strong> Starts with subtle nudges and progresses to more direct motivational messages if tasks or habits are skipped. Encourages users with quotes, customizable reminders, and positive reframing.</li>
          <li><strong>Accountability Options:</strong> Optional features to involve friends, accountability partners, or the broader community. Support for private or public growth based on user comfort.</li>
          <li><strong>Failure-Friendly Support:</strong> Encourages users to adjust rather than abandon goals, emphasizing progress over perfection. Reinforces the value of persistence through motivational messaging and support tools.</li>
          <li><strong>Data & Insights:</strong> Visualize trends, progress, and habit streaks. Reflect on high and low performance periods with actionable insights.</li>
          <li><strong>Resource Storage:</strong> Save notes, links, or custom guides relevant to specific goals and habits.</li>
        </ul>
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

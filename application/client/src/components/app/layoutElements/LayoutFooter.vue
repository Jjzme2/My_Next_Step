<template>
  <footer class="footer">
    <div class="footer__section">
      <div class="footer__grid-container">
        <div
          class="footer__grid-item"
          style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px; padding-right: 0px"
        >
        <!-- ! Add back in later -->
          <!-- <router-link to="/contact" aria-label="Contact Us for Feedback">Feedback</router-link> -->
          <br />
          <!-- <a href="?cky_preview=true">Privacy</a> -->
        </div>
        <div>
        </div>
      </div>
    </div>

    <div class="footer__section">
      <strong>&copy; {{ yearTag }} MyNextStep.com. All rights reserved.</strong>
    </div>

    <div class="footer__section footer__brand">
      <p aria-label="Company name">ILYTAT</p>
    </div>
  </footer>
</template>

<script>

export default {
  data() {
    return {
      yearTag: new Date().getFullYear() === 2024 ? '2024' : '2024-' + new Date().getFullYear()
    }
  },
}
</script>

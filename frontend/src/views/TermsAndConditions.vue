<template>
  <!-- Global AppNavbar is now used via App.vue -->
  <div class="faq-section">
    <div class="faq-container">
      <div class="brand-section">
        <h4 class="brand-tagline">Privacy, Terms & Conditions</h4>
      </div>
      <div class="faq-item" v-for="(item, index) in termsFaqs" :key="index">
        <div class="faq-question" @click="toggleFAQ(index)">
          <span>{{ item.question }}</span>
          <span class="faq-icon">{{ activeIndex === index ? '−' : '+' }}</span>
        </div>
        <div class="faq-answer" :class="{ 'active': activeIndex === index }">
          <p v-html="item.answer"></p>
        </div>
      </div>
    </div>
  </div>
  <!-- Global AppFooter is now used via App.vue -->
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const termsFaqs = ref([
  {
    question: "What personal information do you collect?",
    answer: "We collect your name, contact details, vehicle information, and service preferences when you book or inquire about our services."
  },
  {
    question: "How is my information used?",
    answer: "Your information is used solely to provide and improve our services, process bookings, and communicate with you. We do not sell or share your data with third parties except as required by law."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes. All payments are processed through secure, PCI-compliant providers. We do not store your card details on our servers."
  },
  {
    question: "What are your terms of service?",
    answer: "By booking with Auto Stallion, you agree to our service terms: timely payment, accurate information, and compliance with our cancellation and refund policies."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you may cancel or reschedule up to 24 hours before your appointment. Late cancellations may incur a fee."
  },
  {
    question: "What is your refund policy?",
    answer: "Refunds are available for cancellations made within our policy window. Please see our <router-link to='/refund-policy'>Refund Policy</router-link> for details."
  },
  {
    question: "How do you protect my privacy?",
    answer: "We use industry-standard security measures to protect your data and restrict access to authorized personnel only."
  },
  {
    question: "How can I contact you about privacy or terms?",
    answer: "Contact us at <a href='mailto:info@autostallion.com'>info@autostallion.com</a> for any questions regarding your privacy or our terms and conditions."
  }
]);

function toggleFAQ(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<style scoped>
/* Match FAQ page styles */
.faq-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  font-family: "Playfair Display", serif;
  color: #ffffff;
}

.faq-container {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  background: rgba(15, 15, 15, 0.7);
  border-radius: 15px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.brand-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.brand-tagline {
  color: #C1902D;
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  text-transform: uppercase;
}

.faq-item {
  border-bottom: 1px solid #eee;
  padding: 18px 0;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
}
.faq-icon {
  font-size: 1.5rem;
  color: #C1902D;
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  color: #fff;
  font-size: 1rem;
}
.faq-answer.active {
  max-height: 200px;
  margin-top: 10px;
}
</style>

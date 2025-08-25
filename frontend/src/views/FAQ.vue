<template>
  <!-- Global AppNavbar is now used via App.vue -->
  <div class="faq-section">
    <div class="faq-container">
      <div class="brand-section">
      <h4 class="brand-tagline">Frequently Asked Questions</h4>
          </div>
      <div class="faq-item" v-for="(item, index) in faqs" :key="index">
        <div class="faq-question" @click="toggleFAQ(index)">
          <span>{{ item.question }}</span>
          <span class="faq-icon">{{ activeIndex === index ? '−' : '+' }}</span>
        </div>
        <div class="faq-answer" :class="{ 'active': activeIndex === index }">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Global AppFooter is now used via App.vue -->
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const faqs = ref([
  {
    question: "Why do dealerships choose us?",
    answer: "Dealerships trust Auto Stallion for our premium detailing services that enhance vehicle presentation and value. Our ceramic coatings provide long-term protection that dealerships can confidently offer to their customers."
  },
  {
    question: "What is ceramic coating, and how does it differ from traditional waxing or sealant methods?",
    answer: "Ceramic coating is a liquid polymer that chemically bonds with your vehicle's paint, creating a permanent protective layer. Unlike traditional wax (lasting 4-8 weeks) or sealants (3-6 months), our ceramic coatings provide 2-5 years of protection with superior gloss and hydrophobic properties."
  },
  {
    question: "Can you detail my car at the dealership before I collect it?",
    answer: "Absolutely! We specialize in dealership pre-delivery detailing. Our mobile team can prepare your vehicle at the dealership location, ensuring it's in showroom condition when you take delivery."
  },
  {
    question: "How long will protection last and can I follow up with top-up treatments?",
    answer: "Our Signature Ceramic Coating lasts 5 years with proper maintenance. We offer annual inspection and top-up services to maintain optimal protection and gloss. Maintenance packages are available at discounted rates."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and cash. Dealership accounts can be set up with net-30 terms upon credit approval."
  },
  {
    question: "Do you travel to client's location to detail the car?",
    answer: "Yes, our premium mobile detailing service comes to you. We operate throughout the metropolitan area with fully equipped mobile units that have all the power and water needed for showroom-quality results anywhere."
  },
  {
    question: "How long will it take to detail my car?",
    answer: "Service times vary: Express Detail (2-3 hours), Full Correction Detail (6-8 hours), Ceramic Coating Application (1-2 days for proper curing). We'll provide an exact timeline during your consultation."
  },
  {
    question: "Do I need to schedule regular maintenance for my ceramic coating?",
    answer: "While our coatings are extremely durable, we recommend annual inspections and maintenance washes to ensure maximum longevity."
  }
]);

const toggleFAQ = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
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


.faq-title {
  color: #C1902D;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.faq-item {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
  color: #fff;
  transition: all 0.3s ease;
}

.faq-question:hover {
  color: #C1902D;
}

.faq-icon {
  color: #C1902D;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
  min-width: 20px;
  text-align: center;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 1rem;
}

.faq-answer.active {
  max-height: 500px;
  padding-bottom: 1.5rem;
}

.faq-answer p {
  color: #ccc;
  line-height: 1.6;
  margin: 0;
  padding: 0.5rem 0;
}

@media (max-width: 768px) {
  .faq-section {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .faq-question {
    font-size: 1rem;
  }
  
  .faq-title {
    font-size: 1.5rem;
  }
}
</style>
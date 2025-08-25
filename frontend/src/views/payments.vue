<template>
  <div class="payments-page">

  <h2>Pay for Interior Standard (R899)</h2>
  <button @click="startCheckout" class="payment-form">Pay with Card (Stripe Checkout)</button>

    <h3>Your Payments</h3>
    <ul>
      <li v-for="p in payments" :key="p.id">
        Booking ID: {{ p.bookingId }} | Amount: R{{ p.amount }} |
        Method: {{ p.method }} | Status: {{ p.status }} |
        Date: {{ formatDate(p.createdAt) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// Stripe Checkout integration
const priceId = 'price_1Rw1W3Pies0EImM7UrI7e5gA'; // Interior standard, R899

async function startCheckout() {
  try {
    const res = await axios.post('http://localhost:5000/api/checkout/create-checkout-session', {
      priceId,
      quantity: 1,
      successUrl: window.location.origin + '/?success',
      cancelUrl: window.location.origin + '/?canceled'
    }, { withCredentials: true });
    window.location.href = res.data.url;
  } catch (err) {
    alert('Failed to start Stripe Checkout.');
    console.error(err);
  }
}
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from 'vue-stripe'
import CardPaymentForm from '@/components/CardPaymentForm.vue'

const stripePromise = loadStripe('pk_test_51RvyeGPies0EImM7OhO2W4vYKxOkDx9qdsCAkNifsESHB3zIfQYoBlL8aNEoaLMcMfH5zorMMIt7ANV3AYKXo5Sn00A8JRVwZP')
const bookingId = ref('')
const amount = ref('')
const payments = ref([])

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function fetchPayments() {
  try {
    const res = await axios.get('http://localhost:5000/api/payments/my', {
      withCredentials: true
    })
    payments.value = res.data
  } catch (err) {
    alert('Failed to fetch payments.')
    console.error(err)
  }
}

function onPaymentSuccess() {
  bookingId.value = ''
  amount.value = ''
  fetchPayments()
}

onMounted(fetchPayments)
</script>


<style scoped>
.payments-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.payment-form label {
  font-weight: bold;
}
.payment-form input,
.payment-form select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.card-element {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f8f8f8;
  margin-bottom: 1rem;
}
.payment-form button {
  padding: 0.75rem;
  background: #baa94a;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.payment-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.payment-message {
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>

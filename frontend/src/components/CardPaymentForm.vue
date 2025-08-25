<template>
  <form @submit.prevent="handleStripePayment" class="payment-form">
    <div>
      <label>Booking ID</label>
      <input v-model="localBookingId" type="number" placeholder="Enter Booking ID" required />
    </div>
    <div>
      <label>Amount (R)</label>
      <input v-model="localAmount" type="number" step="0.01" min="1" placeholder="Enter Amount" required />
    </div>
    <div>
      <label>Card Details</label>
  <CardElement class="card-element" ref="card" />
    </div>
    <button type="submit" :disabled="loading">{{ loading ? 'Processing...' : 'Pay Now' }}</button>
    <div v-if="paymentMessage" class="payment-message">{{ paymentMessage }}</div>
  </form>
</template>

<script setup>
import axios from 'axios';
import { CardElement } from 'vue-stripe';
import { ref, watch } from 'vue';
import { useStripe } from 'vue-stripe';

const props = defineProps({
  bookingId: String,
  amount: String
});
const emit = defineEmits(['success']);

const localBookingId = ref(props.bookingId || '');
const localAmount = ref(props.amount || '');
const loading = ref(false);
const paymentMessage = ref('');
const card = ref(null);

watch(() => props.bookingId, val => localBookingId.value = val);
watch(() => props.amount, val => localAmount.value = val);

const stripe = useStripe();

async function handleStripePayment() {
  loading.value = true;
  paymentMessage.value = '';
  try {
    // 1. Create PaymentIntent on backend
    const res = await axios.post('http://localhost:5000/api/stripe/create-payment-intent', {
      amount: Math.round(Number(localAmount.value) * 100), // Stripe expects cents
      currency: 'zar'
    }, { withCredentials: true });
    const clientSecret = res.data.clientSecret;

    // 2. Confirm card payment on frontend
    if (!stripe.stripe) {
      paymentMessage.value = 'Stripe.js failed to load. Please refresh the page.';
      loading.value = false;
      return;
    }
    const { error, paymentIntent } = await stripe.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card.value.stripeElement
      }
    });
    if (error) {
      paymentMessage.value = error.message;
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // 3. Record payment in your DB
      await axios.post('http://localhost:5000/api/payments', {
        bookingId: Number(localBookingId.value),
        amount: Number(localAmount.value),
        method: 'Card'
      }, { withCredentials: true });
      paymentMessage.value = 'Payment successful!';
      localBookingId.value = '';
      localAmount.value = '';
      emit('success');
    }
  } catch (err) {
    paymentMessage.value = 'Payment failed.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.card-element {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f8f8f8;
  margin-bottom: 1rem;
}
.payment-message {
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>

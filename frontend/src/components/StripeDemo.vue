<template>
  <div class="stripe-demo">
    <form @submit.prevent="pay" class="payment-form">
      <div>
        <label>Card Details</label>
        <Elements :stripe="stripePromise" v-if="stripePromise">
          <CardElement ref="card" class="card-element" />
        </Elements>
      </div>
      <button type="submit" :disabled="loading">{{ loading ? 'Processing...' : 'Pay Now' }}</button>
      <div v-if="message" class="payment-message">{{ message }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe } from 'vue-stripe';

const stripePromise = loadStripe('pk_test_51RvyeGPies0EImM7OhO2W4vYKxOkDx9qdsCAkNifsESHB3zIfQYoBlL8aNEoaLMcMfH5zorMMIt7ANV3AYKXo5Sn00A8JRVwZP'); 
const card = ref(null);
const loading = ref(false);
const message = ref('');
const stripe = useStripe();

async function pay() {
  loading.value = true;
  message.value = '';
  try {
    const res = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ amount: 1000, currency: 'zar' })
    });
    const { clientSecret } = await res.json();
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card.value.stripeElement
      }
    });
    if (error) {
      message.value = error.message;
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      message.value = 'Payment successful!';
    }
  } catch (err) {
    message.value = 'Payment failed.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.stripe-demo {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

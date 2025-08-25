<template>
  <div>
        <!-- HEADER AND NAVBAR -->
    <header>
      <a href="#" class="logo">
        <img src="Images/logotr.png" width="190px" alt="">
      </a>

      <input type="checkbox" id="check">
      <label for="check" class="icons">
        <i class="fa-solid fa-bars" id="menu-icon"></i>
        <i class="fa-solid fa-xmark" id="close-icon"></i>
      </label>
      
      <nav class="navigation">
        <a href="#home" class="active nav-links" style="--i:0;">Home</a>
        <router-link to="/packages" class="nav-links" style="--i:1;">Services</router-link>
        <!-- <router-link to="/booking" class="nav-links" style="--i:2;">Booking</router-link> -->
        <router-link to="/about" class="nav-links" style="--i:3;">About Us</router-link>
        <router-link to="/contact" class="nav-links" style="--i:4;">Contact Us</router-link>
        <router-link to="/login" class="nav-links" style="--i:5;">Login</router-link>
      </nav>
    </header>
  </div>
  <div class="forgot-password-page">
    <div class="login-container">
      <div class="brand-section">
        <img src="@/assets/auto-stallion.png" alt="Auto Stallion Logo" class="brand-logo">
        <h1 class="brand-tagline">Premium Automotive Detailing</h1>
      </div>
      <div class="forgot-password-card">
        <h1 class="title">Set New Password</h1>
        <p class="subtitle">Enter your new password below</p>
        <form @submit.prevent="handleSubmit" class="form">
          <div class="form-group">
            <label for="password" class="form-label">New Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="form-input"
              placeholder="Enter new password"
            >
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              class="form-input"
              placeholder="Confirm new password"
            >
          </div>
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Resetting...' : 'Reset Password' }}
          </button>
        </form>
        <div v-if="message" class="message" :class="{ 'error-message': isError }">
          {{ message }}
        </div>
        <router-link to="/login" class="back-to-login">
          ← Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const message = ref('');
const isError = ref(false);

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    isError.value = true;
    message.value = 'Passwords do not match.';
    return;
  }
  try {
    loading.value = true;
    message.value = '';
    isError.value = false;
    const token = route.query.token;
    await axios.post('http://localhost:5000/api/auth/reset-password', {
      token,
      password: password.value
    }, { withCredentials: true });
    message.value = 'Password reset successful! Redirecting to login...';
    setTimeout(() => router.push('/login'), 2000);
  } catch (error) {
    isError.value = true;
    message.value = error.response?.data?.error || 'Failed to reset password. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.forgot-password-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), 
              url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}
.login-container {
  display: flex;
  max-width: 1000px;
  width: 100%;
  background: rgba(15, 15, 15, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
}
.brand-section {
  flex: 1;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-right: 1px solid rgba(255, 215, 0, 0.3);
}
.brand-logo {
  max-width: 300px;
  width: 100%;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}
.brand-tagline {
  color: #baa94a;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0.5rem;
}
.forgot-password-card {
  flex: 1;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #222;
  border-radius: 0 15px 15px 0;
}
.title {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.subtitle {
  color: #baa94a;
  margin-bottom: 2rem;
}
.form {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-label {
  color: #fff;
  font-weight: 500;
}
.form-input {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #baa94a;
  background: #333;
  color: #fff;
  font-size: 1rem;
}
.submit-btn {
  background: #baa94a;
  color: #222;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:disabled {
  background: #ccc;
  color: #888;
  cursor: not-allowed;
}
.message {
  margin-top: 1rem;
  color: #baa94a;
  font-weight: 600;
}
.error-message {
  color: #ff4d4f;
}
.back-to-login {
  margin-top: 2rem;
  color: #baa94a;
  text-decoration: underline;
  cursor: pointer;
}
</style>

<template>
  <AppNavbar />
  <div class="forgot-password-page">
    <div class="login-container">
      <div class="brand-section">
        <img src="@/assets/auto-stallion.png" alt="Auto Stallion Logo" class="brand-logo">
        <h1 class="brand-tagline">Premium Automotive Detailing</h1>
      </div>
      
      <div class="forgot-password-card">
        <h1 class="title">Reset Your Password</h1>
        <p class="subtitle">Enter your email to receive a password reset link</p>
        
        <form @submit.prevent="handleSubmit" class="form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="form-input"
              placeholder="name@gmail.com"
            >
          </div>
          
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
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
import AppNavbar from '@/components/AppNavbar.vue';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const loading = ref(false);
const message = ref('');
const isError = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    message.value = '';
    isError.value = false;
    
    await axios.post('http://localhost:5000/api/auth/forgot-password', {
      email: email.value
    }, { withCredentials: true });
    message.value = 'Password reset link sent to your email!';
  } catch (error) {
    isError.value = true;
    message.value = error.response?.data?.message || 'Failed to send reset link. Please try again.';
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
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 1rem;
  text-transform: uppercase;
}

.forgot-password-card {
  flex: 1;
  padding: 3rem 2.5rem;
  background: linear-gradient rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  color: #C1902D;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: #b3b3b3;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #ccc;
  letter-spacing: 0.5px;
}

.form-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #444;
  border-radius: 5px;
  padding: 12px 15px;
  width: 100%;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #C1902D;
  background: rgba(255, 215, 0, 0.1);
  box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
}

.submit-btn {
  background: linear-gradient(to right, #C1902D, #fff);
  color: #000;
  border: none;
  padding: 14px;
  width: 100%;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(to right, #fff, #C1902D);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 200, 0, 0.3);
}

.submit-btn:disabled {
  background: #555;
  cursor: not-allowed;
  opacity: 0.7;
}

.message {
  color: #C1902D;
  text-align: center;
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 5px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.error-message {
  color: #ff6b6b;
  background: rgba(139, 0, 0, 0.3);
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.back-to-login {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: #C1902D;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-to-login:hover {
  color: #fff;
  text-decoration: underline;
}

.footer {
  color: #999;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  
  .brand-section {
    padding: 2rem 1.5rem;
    border-right: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  }
  
  .forgot-password-card {
    padding: 2rem 1.5rem;
  }
  
  .brand-logo {
    max-width: 200px;
  }
  
  .brand-tagline {
    font-size: 1.2rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
}
</style>
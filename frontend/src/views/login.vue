<template>
  <div class="login-page">
    <div class="login-container">
      <div class="brand-section">
        <img src="@\assets\auto-stallion.png" alt="Auto Stallion Logo" class="brand-logo">
        <h1 class="brand-tagline">Premium Automotive Detailing</h1>
      </div>
      
      <div class="login-card">
        <h4 class="login-title">{{ loginType === 'customer' ? 'Customer Login' : 'Admin Login' }}</h4>
        
         <!-- <div class="login-type-selector">
          <label class="radio-option">
            <input 
              type="radio" 
              v-model="loginType" 
              value="customer"
              class="radio-input"
            >
            <span class="radio-label">Customer</span>
          </label>
          <label class="radio-option">
            <input 
              type="radio" 
              v-model="loginType" 
              value="admin"
              class="radio-input"
            >
            <span class="radio-label">Admin</span>
          </label>
        </div> -->

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              class="form-input" 
              id="email" 
              v-model="form.email" 
              required
              placeholder="Enter your email"
            >
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              class="form-input" 
              id="password" 
              v-model="form.password" 
              required
              placeholder="Enter your password"
            >
          </div>
          
          <button 
            type="submit" 
            class="login-button"
            :disabled="loading"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="login-links">
          <router-link to="/forgot-password" class="link">
            Forgot your password?
          </router-link>
          
          <div class="signup-section">
            <span>Don't have an account?</span>
            <router-link to="/register" class="link">
              Register here!
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

const router = useRouter();

const loginType = ref('customer');
const form = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = '';
    const endpoint = 'http://localhost:5000/api/auth/login';
    const response = await axios.post(endpoint, {
      email: form.value.email,
      password: form.value.password
    }, { withCredentials: true });
  localStorage.setItem('user', JSON.stringify(response.data.user));
  localStorage.setItem('role', loginType.value);
  window.dispatchEvent(new Event('user-logged-in'));
  router.push('/');
  } catch (err) {
    error.value = err.response?.data?.message || err.response?.data?.error || 'Login failed. Please try again.';
    console.error('Login error:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), 
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
  max-width: 280px;
  width: 100%;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}

.brand-tagline {
  color: #C1902D;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 1rem;
  text-transform: uppercase;
}

.login-card {
  flex: 1;
  padding: 3rem 2.5rem;
  background: linear-gradient rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  color: #C1902D;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}

.login-type-selector {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-input {
  margin-right: 0.5rem;
  accent-color: #C1902D;
}

.radio-label {
  color: #ccc;
  transition: color 0.3s;
}

.radio-option:hover .radio-label {
  color: #fff;
}

.login-form {
  margin-bottom: 1.5rem;
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

.login-button {
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

.login-button:hover:not(:disabled) {
  background: linear-gradient(to right, #C1902D, #fff);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 200, 0, 0.3);
}

.login-button:disabled {
  background: #555;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #ff6b6b;
  text-align: center;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.login-links {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.link {
  color: #C1902D;
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}

.link:hover {
  color: #fff;
  text-decoration: underline;
}

.signup-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

.signup-section span {
  color: #999;
  margin-right: 0.5rem;
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
  
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .brand-logo {
    max-width: 200px;
  }
  
  .brand-tagline {
    font-size: 1.2rem;
  }
}
</style>
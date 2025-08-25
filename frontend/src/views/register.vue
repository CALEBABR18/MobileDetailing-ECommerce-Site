<!-- register form using bootstrap, with v-model with an option to choose a role using a dropdown. the form needs to take the name, email, password and role -->
<template>
  <AppNavbar />
    <div class="register-page">
        <div class="login-container">
            <div class="brand-section">
                <img src="@\assets\auto-stallion.png" alt="Auto Stallion Logo" class="brand-logo">
                <h1 class="brand-tagline">Premium Automotive Detailing</h1>
            </div>
            <div class="register-card">
                <h4 class="register-title">Customer Register</h4>

                <form @submit.prevent="handleRegister" class="form">
          <div class="form-group">
            <label for="firstName" class="form-label">First Name</label>
            <input type="text" class="form-input" id="firstName" v-model="form.firstName" required placeholder="Enter your first name">
          </div>
          <div class="form-group">
            <label for="lastName" class="form-label">Last Name</label>
            <input type="text" class="form-input" id="lastName" v-model="form.lastName" required placeholder="Enter your last name">
          </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-input" id="email" v-model="form.email" required placeholder="Enter your email">
                    </div>
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number</label>
            <input type="text" class="form-input" id="phone" v-model="form.phone" required placeholder="Enter your phone number">
          </div>
          <div class="form-group">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-input" id="address" v-model="form.address" placeholder="Enter your address (optional)">
          </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-input" id="password" v-model="form.password" required placeholder="Enter your password">
                    </div>
                    <button type="submit" class="register-button" :disabled="loading">{{ loading ?
                        'Registering...':'Register'}}</button>
                </form>

                <div v-if="error" class="error-message">
                    {{ error }}
                </div>

                <router-link to="/login" class="back-to-login">
                    ← Back to Login
                </router-link>

            </div>
        </div>
    </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import axios from 'axios';

  export default {
    name: 'Register',
    setup() {
      const router = useRouter();
      const form = reactive({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: ''
      });
      const loading = ref(false);
      const error = ref('');

      const handleRegister = async () => {
        loading.value = true;
        error.value = '';
        try {
          await axios.post('http://localhost:5000/api/auth/register', form, { withCredentials: true });
          router.push('/login');
        } catch (err) {
          error.value = err.response?.data?.message || 'Registration failed';
        } finally {
          loading.value = false;
        }
      };

      return { form, handleRegister, loading, error };
    }
  }
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
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

.register-card {
  flex: 1;
  padding: 3rem 2.5rem;
  background: linear-gradient rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.register-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  color: #C1902D;
  margin-bottom: 2rem;
  letter-spacing: 1px;
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
  width: 95%;
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

.register-button {
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
<template>
   <div class="contact-page">
    <div class="contact-container">
      <div class="brand-section">
        <h1 class="brand-tagline">Contact Us</h1>
      </div>

      <div class="contact-content">
        <p class="intro">
          Have a question, need a quote, or want to book a detailing session? We're here to help.
          Reach out to us through the contact details below or fill in the quick form — we’ll get back to you as soon as possible.
        </p>

        <div class="contact-info">
          <h3>Contact Details</h3>
          <p><strong>Email:</strong> <a href="mailto:auto-stallion@gmail.co.za">auto-stallion@gmail.co.za</a></p>
          <p><strong>Call/WhatsApp:</strong> <a href="tel:+27842357906">084 235 7906</a></p>
        </div>

        <div class="contact-hours">
          <h3>Opening Hours</h3>
          <p>Monday to Friday: 08:30 AM – 5:00 PM</p>
          <p>Saturday: 09:00 AM – 2:00 PM</p>
          <p>Sunday: <span class="closed">Closed</span></p>
        </div>

        <div class="contact-area">
          <h3>Operating Area</h3>
          <p>We currently serve Cape Town and surrounding metro areas. Mobile detailing options available upon request.</p>
        </div>

        <!-- Optional Contact Form -->
        <div class="contact-form">
          <h3>Send Us a Message</h3>
          <form @submit.prevent="submitContactForm">
            <input type="text" v-model="form.name" placeholder="Your Name" required />
            <input type="email" v-model="form.email" placeholder="Your Email" required />
            <input type="text" v-model="form.subject" placeholder="Subject" />
            <textarea rows="4" v-model="form.message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>

          <div v-if="responseMsg" :class="{'success': responseSuccess, 'error': !responseSuccess}" style="margin-top:1rem;">
            {{ responseMsg }}
          </div>

        </div> <!-- close .contact-form -->
      </div> <!-- close .contact-content -->
    </div> <!-- close .contact-container -->
  </div> <!-- close .contact-page -->
  <!-- Global AppFooter is now used via App.vue -->
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      responseMsg: '',
      responseSuccess: false
    };
  },
  methods: {
    async submitContactForm() {
      this.responseMsg = '';
      try {
        const res = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });
        const data = await res.json();
        this.responseMsg = data.message;
        this.responseSuccess = data.success;
        if (data.success) {
          this.form = { name: '', email: '', subject: '', message: '' };
        }
      } catch (err) {
        this.responseMsg = 'Failed to send message. Please try again later.';
        this.responseSuccess = false;
      }
    }
  }
}

</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  font-family: "Playfair Display", serif;
  color: #ffffff;
}

.contact-container {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  background: rgba(15, 15, 15, 0.7);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.brand-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.brand-tagline {
  color: #C1902D;
  font-size: 1.8rem;
  font-weight: 300;
  text-transform: uppercase;
  margin: 0;
}

.contact-content {
  padding: 2rem;
  line-height: 1.6;
}

.contact-info,
.contact-hours,
.contact-area,
.contact-form {
  margin-bottom: 2rem;
}

h3 {
  color: #C1902D;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

a {
  color: #C1902D;
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: #fff;
  text-decoration: underline;
}

.closed {
  color: #ff4d4d;
  font-weight: bold;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  background: #222;
  border: 1px solid #444;
  border-radius: 5px;
  padding: 0.75rem 1rem;
  color: #fff;
  margin-bottom: 1rem;
  font-family: inherit;
  font-size: 1rem;
}

.contact-form button {
  background: #C1902D;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.3s ease;
}

.contact-form button:hover {
  background: #fff;
  color: #000;
}

.intro {
  margin-bottom: 2rem;
  color: #ccc;
}

@media (max-width: 768px) {
  .contact-content {
    padding: 1.5rem;
  }

  .brand-tagline {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  .contact-form input,
  .contact-form textarea {
    font-size: 0.95rem;
  }
}
</style>

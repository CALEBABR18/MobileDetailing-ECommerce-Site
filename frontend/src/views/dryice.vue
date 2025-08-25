<template>
  
  <div class="dry-ice-page bg-black text-light">
  
    <!-- Hero Section -->
    <section class="hero-section position-relative">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2 class="display-4 text-gold mb-4">Auto Stallion Dry Ice Cleaning</h2>
            <p class="lead mb-4">
              We’re excited to introduce Dry Ice Blasting – a revolutionary cleaning technique now available at Auto Stallion. As one of the pioneering detailers, we were among the first to 
              incorporate dry ice cleaning into our range of services.
            </p>
          </div>
          <div class="col-lg-6">
            <img src="@/assets/dryice.jpg" alt="Dry Ice Cleaning" class="img-fluid rounded shadow">
          </div>
        </div>
      </div>
    </section>

<section class="about-section py-5 bg-dark text-white">
  <div class="container">
    <div class="row align-items-center g-100"> <!-- Added g-5 for gap -->

      <!-- Left: Text -->
      <div class="col-lg-6">
        <h2 class="text-gold mb-4">What is Dry Ice Blasting?</h2>
        <p>
          Dry ice blasting is a form of carbon dioxide cleaning, where dry ice, the solid form of carbon dioxide, 
          is accelerated in a pressurized air stream and directed at a surface in order to clean it.
        </p>
        <p>
          The concentrated force of the dry ice jets easily removes bacteria, pollen, germs, fungi, dust, dirt, 
          deposits and more.
        </p>
      </div>

      <!-- Right: Video -->
      <div class="col-lg-6">
        <div>
          <video controls>
            <source src="@/assets/dryiceViddd.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

    </div>
  </div>
</section>



    <!-- Applications Section -->
<section class="applications-section py-5">
     <div class="text-center mb-4">
      <h2 class="text-gold mb-3">Discover Auto Stallion Dry Ice Cleaning Applications</h2>
      <p class="subheading">
        We have opted for the Polarjet, the Swiss high-end cleaning system that stands as the unrivalled original among dry ice cleaners.
      </p>
    </div>

  <div class="container">
    <div class="row g-4">
      <div
        class="col-sm-6 col-lg-3"
        v-for="(application, index) in applications"
        :key="index"
      >
        <div class="card bg-dark border-gold h-100 application-card text-center p-3">
          <div class="card-body">
            <i :class="['bi', application.icon]" style="font-size: 2rem; color: #C1902D;"></i>
            <h5 class="card-title text-gold mt-3">{{ application.title }}</h5>
            <p class="card-text">{{ application.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



    <!-- Dry Ice Pricing Section (Executive-style) -->
    <section class="interior-pricing">
      <h3>Choose Your Vehicle Size</h3>
      <div class="price-tiers">
        <div v-for="tier in dryIcePricing" :key="tier.size" class="tier">
          <!-- <span class="size">{{ tier.size }}</span> -->
           <span class="size">{{ tier.label }}</span>
          <span class="price">R{{ tier.amount }}</span>
          <button @click="openBookingModal(tier.size, tier.amount)">Book Now</button>
        </div>
      </div>
    </section>

    <!-- Booking Modal (Executive-style) -->
    <div v-if="showBookingModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">&times;</button>
        <h2>Book Dry Ice Cleaning</h2>
        <form @submit.prevent="submitBooking">
          <div class="two-column-form">
            <div>
              <div class="form-group">
                <label>Date</label>
                <input type="date" v-model="booking.date" required />
              </div>
              <div class="form-group">
                <label>Time</label>
                <input type="time" v-model="booking.time" required />
              </div>
              <div class="form-group">
                <label>Vehicle Type</label>
                <input type="text" v-model="booking.vehicleType" placeholder="e.g., Sedan, SUV" required />
              </div>
              <div class="form-group">
                <label>Vehicle Model</label>
                <input type="text" v-model="booking.vehicleModel" placeholder="e.g., BMW 5 Series" required />
              </div>
            </div>
            <div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" v-model="booking.address" placeholder="Where should we service your vehicle?" required />
              </div>
              <div class="form-group">
                <label>Notes (optional)</label>
                <textarea v-model="booking.customerNotes" rows="4"></textarea>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="check-availability" type="button" @click="checkAvailability">Check Availability</button>
            <button class="confirm-booking" type="submit" :disabled="!formValid">Confirm Booking</button>
          </div>
        </form>

        <!-- Stripe Payment Button for Dry Ice Packages -->
        <div v-if="selectedCarSize && stripePriceIds[selectedCarSize]" class="stripe-payment-section" style="margin-top: 1.5rem; text-align: right;">
          <button @click="goToStripePayment" class="stripe-pay-btn">
            <!-- Pay R{{ selectedPrice }} for {{ selectedCarSize }} Dry Ice -->
             <!-- Pay R{{ selectedPrice }} for {{ dryIcePricing.value.find(t => t.size === selectedCarSize)?.label || selectedCarSize }} Dry Ice -->
              Pay R{{ selectedPrice }} for {{ (dryIcePricing && dryIcePricing.value && dryIcePricing.value.find(t => t.size === selectedCarSize)?.label) || selectedCarSize }} Dry Ice
          </button>
        </div>

        <div v-if="apiResponse" class="api-response" :class="{ success: apiResponse.success, error: !apiResponse.success }">
          {{ apiResponse.message }}
        </div>
      </div>
    </div>
  </div>
  <!-- Global AppFooter is now used via App.vue -->
</template>

<script setup>
import { ref, onMounted, computed,nextTick } from 'vue';
import axios from 'axios';

// Stripe Checkout priceIds for Dry Ice package (new class names)
// const stripePriceIds = {
//   'Compact Class': 'price_1Rw6aZPies0EImM7qMVhlUKb', // R1299
//   'Executive Class': 'price_1Rw6c5Pies0EImM7udqfpdVQ', // R1699
//   'Prestige Class': 'price_1Rw6cuPies0EImM7nphbM3va' // R2199
// };

const stripePriceIds = {
  Standard: 'price_1Rw6aZPies0EImM7qMVhlUKb',
  Large: 'price_1Rw6c5Pies0EImM7udqfpdVQ',
  Premium: 'price_1Rw6cuPies0EImM7nphbM3va'
};

function goToStripePayment() {
  // Always use .value for refs
  let carSize = (selectedCarSize.value || '').toString().trim();
  console.log('Selected car size for Stripe:', carSize);
  const priceId = stripePriceIds[carSize];
  if (!priceId) {
    alert('No Stripe product for this selection: ' + carSize);
    return;
  }
  axios.post('http://localhost:5000/api/checkout/create-checkout-session', {
    priceId,
    quantity: 1,
    successUrl: window.location.origin + '/payments?success=1',
    cancelUrl: window.location.origin + '/payments?canceled=1'
  }, { withCredentials: true })
    .then(res => {
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch(() => {
      alert('Failed to start payment. Please try again.');
    });
}

const applications = ref([
  { title: 'Interior cleaning', description: 'Deep cleaning of vehicle interiors', icon: 'bi-car-front-fill' },
  { title: 'Engine compartment', description: 'Safe cleaning of engine bays', icon: 'bi-gear-fill' },
  { title: 'Undercarriage maintenance', description: 'Remove grime from hard-to-reach areas', icon: 'bi-truck' },
  { title: 'Electrical components', description: 'Safe cleaning of sensitive electronics', icon: 'bi-lightning-charge-fill' }
]);

// const dryIcePricing = ref([
//   { size: 'Compact Class', label: 'Compact Class', amount: 1299 },
//   { size: 'Executive Class', label: 'Executive Class', amount: 1699 },
//   { size: 'Prestige Class', label: 'Prestige Class', amount: 2199 }
// ]);

const dryIcePricing = ref([
  { size: 'Standard', label: 'Compact Class', amount: 1299 },
  { size: 'Large', label: 'Executive Class', amount: 1699 },
  { size: 'Premium', label: 'Prestige Class', amount: 2199 }
]);

const showBookingModal = ref(false);
const selectedPackage = ref('Dry Ice Cleaning');
const selectedCarSize = ref('');
const selectedPrice = ref(0);
const apiResponse = ref(null);
const booking = ref({
  date: '',
  time: '10:00',
  vehicleType: '',
  vehicleModel: '',
  address: '',
  customerNotes: ''
});

const formValid = computed(() => {
  return (
    booking.value.date &&
    booking.value.vehicleType &&
    booking.value.vehicleModel &&
    booking.value.address &&
    selectedCarSize.value &&
    selectedPrice.value
  );
});

function openBookingModal(carSize, price) {
  selectedCarSize.value = carSize;
  selectedPrice.value = price;
  showBookingModal.value = true;
  apiResponse.value = null;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  booking.value.date = tomorrow.toISOString().split('T')[0];
  booking.value.time = '10:00';
  booking.value.vehicleType = '';
  booking.value.vehicleModel = '';
  booking.value.address = '';
  booking.value.customerNotes = '';
}

function closeModal() {
  showBookingModal.value = false;
}

function checkAvailability() {
  apiResponse.value = {
    success: true,
    message: `${selectedCarSize.value} slot available on ${booking.value.date} at ${booking.value.time}`
  };
}

function getPackageId() {
  return 2;
}

async function submitBooking() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      apiResponse.value = { success: false, message: 'You must be logged in to book.' };
      return;
    }
    const payload = {
      userId: user.id,
      packageId: getPackageId(),
      carSize: selectedCarSize.value,
      bookingDate: booking.value.date,
      bookingTime: booking.value.time,
      vehicleType: booking.value.vehicleType,
      vehicleModel: booking.value.vehicleModel,
      customerNotes: booking.value.customerNotes || '',
      customerAddress: booking.value.address,
      totalPrice: selectedPrice.value
    };
    const res = await axios.post('http://localhost:5000/api/bookings', payload, { withCredentials: true });
    apiResponse.value = { success: true, message: res.data.message };
    setTimeout(() => {
      closeModal();
      booking.value = {
        date: '',
        time: '10:00',
        vehicleType: '',
        vehicleModel: '',
        address: '',
        customerNotes: ''
      };
    }, 3000);
  } catch (err) {
    apiResponse.value = { success: false, message: err.response?.data?.message || 'Booking failed' };
  }
}

// Animate Dry Ice Application Cards
onMounted(() => {
  nextTick(() => {
    const cards = document.querySelectorAll('.application-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, index * 850); // Delay each card by 1s * index
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
  });
});

</script>

<style scoped>
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}
.applications-section h2 {
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 2px;
}

.applications-section p {
  font-size: 0.95rem;
  max-width: 800px;
  margin: 0 auto 40px;
  color: #ccc;
  line-height: 1.6;
}

.about-section {
  background-color: #1a1a1a; /* a bit lighter than pure black */
  padding-top: 60px;
  padding-bottom: 60px;
}

.application-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease, transform 1s ease;
}

.application-card.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.application-card .card-body {
  transition: transform 0.3s ease;
}
.application-card:hover .card-body {
  transform: scale(1.02);
}
.application-card.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.application-card:hover {
  box-shadow: 0 0 20px #C1902D;
  transform: translateY(-5px);
  transition: all 0.4s ease;
}

.card-title {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.1rem;
}

.card-text {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
}

.stripe-pay-btn{
  background: transparent;
  border: 1px solid #C1902D;
  color: #C1902D;
  padding: 10px 15px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

h2 {
  color: #C1902D;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 2rem;
  margin-bottom: 15px;
  margin-right: 80px;
}

p {
  color: #ffffff;
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  margin-right: 90px;
}

.dry-ice-page {
  min-height: 100vh;
  font-family: "Playfair Display", serif;
}

.text-gold {
  color: #C1902D;
}

.bg-dark {
  background-color: #121212 !important;
}

.btn-gold {
  background-color: #C1902D;
  color: #000;
  font-weight: 600;
  border: none;
}

.btn-gold:hover {
  background-color: #d6a53e;
  color: #000;
}

.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}

/* Pricing Section Styles */
.dry-ice-pricing {
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  padding: 40px;
  margin-top: 60px;
  border-radius: 8px;
}

h3{
  color: #C1902D;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 1.3rem;
  text-transform: uppercase;
}

.price-tiers {
   display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.tier {
 background: #0b0b0b;
  padding: 25px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgba(255,215,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid #C1902D;
  box-shadow: 0 0 10px rgba(193, 144, 45, 0.2);
}

.tier:hover {
  border-color: rgba(255,215,0,0.3);
  transform: translateY(-5px);
}

.tier .size {
  display: block;
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.tier .price {
display: block;
  font-size: 1.8rem;
  color: #C1902D;
  margin-bottom: 20px;
  font-weight: 300;
}

.tier button {
  background: transparent;
  border: 1px solid #C1902D;
  color: #C1902D;
  padding: 10px 15px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.tier button:hover , .stripe-pay-btn button:hover{
  background: rgba(255,215,0,0.1);
  letter-spacing: 1.5px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #121212;
  border: 1px solid #C1902D;
  width: 90%;
  max-width: 800px;
  padding: 40px;
  position: relative;
  color: white;
  border-radius: 8px;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #C1902D;
  font-size: 1.5rem;
  cursor: pointer;
}

.two-column-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 30px 0;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #C1902D;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  background: #222;
  border: 1px solid #333;
  color: white;
  border-radius: 4px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #C1902D;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 20px;
}

.check-availability {
  background: transparent;
  border: 1px solid #C1902D;
  color: #C1902D;
  padding: 14px 25px;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
}

.check-availability:hover , .stripe-pay-btn:hover{
  background: rgba(193, 144, 45, 0.1);
}

.confirm-booking {
  background: #C1902D;
  color: #000;
  border: none;
  padding: 14px 25px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
}

.confirm-booking:hover:not(:disabled) {
  background: #d6a53e;
}

.confirm-booking:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.api-response {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
}

.api-response.success {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.api-response.error {
  background: rgba(255, 0, 0, 0.05);
  border: 1px solid rgba(255, 0, 0, 0.3);
}

.interior-pricing {
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  padding: 40px;
  margin-top: 60px;
  border-radius: 8px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .two-column-form {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .price-tiers {
    grid-template-columns: 1fr;
  }
  
  .tier {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 30px 20px;
  }
  
  .dry-ice-pricing {
    padding: 30px 15px;
  }
}
</style>
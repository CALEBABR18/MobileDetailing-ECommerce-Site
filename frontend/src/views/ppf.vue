
<!-- .stripe-payment-section {
  margin-top: 1.5rem;
  text-align: right;
}

.stripe-pay-btn {
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

.stripe-pay-btn:hover {
  background: rgba(255,215,0,0.1);
  letter-spacing: 1.5px;
} -->
<template>
<div class="dry-ice-page bg-black text-light">

    <!-- Hero Section -->
    <section class="hero-section position-relative">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2 class="display-4 text-gold mb-4">Auto Stallion Paint Protection Film (PPF)</h2>
            <p class="lead mb-4">
              You chose your car for a reason. Every curve, every detail, every surface was designed to perform—and to be seen. But the road doesn’t care. Stones chip. Insects stain. Sun fades. That’s why we offer something better: invisible, long-term protection that works just as hard as your car does.</p>
<hr>
            <p>Our Paint Protection Film (PPF) service creates a clear, durable layer over your paint to defend against everyday wear—without altering how your vehicle looks. </p>
          </div>
          <div class="col-lg-6">
            <img src="@/assets/nppf.png" alt="ppf" class="img-fluid rounded shadow ppf-hero-img">
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section py-5 bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h2 class="text-gold mb-4">Benefits of PPF?</h2>
            <p style="font-size: 1.1rem;">We have tested and used some of the best films in the industry. Our film of choice is used in many vehicle applications and has the following features:</p>
               <p> <br><br><ul>
 <li>Optical clarity</li>
  <li>Hydrophobic top coat</li>
  <li>Stain resistant</li>
  <li>Anti-Yellowing</li>
</ul></p>

          </div>
          <div class="col-lg-6">
            <div class="">
              <video controls width = "400" >
                <source src="@/assets/ppf.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dry Ice Pricing Section -->
    <section class="dry-ice-pricing ">
        <h3>PPF PACKAGES</h3>
        <div class="price-tiers">
          <div class="tier" v-for="tier in ppfPricing" :key="tier.size">
            <!-- <span class="size">{{ tier.size }}:</span> -->
             <span class="size">{{ tier.label }}</span>
            <span class="price">R{{ tier.amount }}</span>
            <button 
              class="btn btn-gold"
              @click="openBookingModal(tier.size, tier.amount)"
            >
              BOOK
            </button>
          </div>
        </div>
    </section>

     <!-- Booking Modal (Executive-style) -->
    <div v-if="showBookingModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">

        <button class="close-modal" @click="closeModal">&times;</button>
        <h2>Book Paint Protection Film (PPF)</h2>
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
                <input type="text" v-model="booking.vehicleType" required />
              </div>
              <div class="form-group">
                <label>Vehicle Model</label>
                <input type="text" v-model="booking.vehicleModel" required />
              </div>
            </div>
            <div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" v-model="booking.address" required />
              </div>
              <div class="form-group">
                <label>Notes (optional)</label>
                <textarea v-model="booking.customerNotes" rows="4"></textarea>
              </div>
            </div>
          </div>
        </form>
        
        <div class="form-actions">
          <button class="check-availability" @click="checkAvailability">Check Availability</button>
          <button class="confirm-booking" @click="submitBooking" :disabled="!formValid">Confirm PPF Booking</button>
        </div>

          <!-- Stripe Payment Button for PPF Packages -->
        <div v-if="selectedCarSize && stripePriceIds[selectedCarSize]" class="stripe-payment-section" style="margin-top: 1.5rem; text-align: right;">
          <button @click="goToStripePayment" class="stripe-pay-btn">
            <!-- Pay R{{ selectedPrice }} for {{ selectedCarSize }} PPF (Stripe) -->
             <!-- Pay R{{ selectedPrice }} for {{ ppfPricing.value.find(t => t.size === selectedCarSize)?.label || selectedCarSize }} PPF  -->
              Pay R{{ selectedPrice }} for {{ (ppfPricing && ppfPricing.value && ppfPricing.value.find(t => t.size === selectedCarSize)?.label) || selectedCarSize }} PPF
          </button>
        </div>
        
        <div v-if="apiResponse" class="api-response" :class="{ success: apiResponse.success, error: !apiResponse.success }">
          {{ apiResponse.message }}
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
// Stripe Checkout priceIds for PPF Packages
// const stripePriceIds = {
//   Compact: 'price_1RwJ44Pies0EImM71OykpNHi',
//   Executive: 'price_1RwJ5pPies0EImM7WuNTkXSS',
//   Prestige: 'price_1RwJ9ZPies0EImM78JvqgfsS'
// };

const stripePriceIds = {
  Standard: 'price_1RwJ44Pies0EImM71OykpNHi',
  Large: 'price_1RwJ5pPies0EImM7WuNTkXSS',
  Premium: 'price_1RwJ9ZPies0EImM78JvqgfsS'
};

function goToStripePayment() {
  // Normalize car size to match keys in stripePriceIds
  const normalizedCarSize = Object.keys(stripePriceIds).find(
    key => key.toLowerCase() === selectedCarSize.value.toLowerCase()
  );
  const priceId = stripePriceIds[normalizedCarSize];
  if (!priceId) {
    alert('No Stripe product for this selection.');
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
import { ref, computed } from 'vue';
import axios from 'axios';


const ppfPricing = ref([
  { size: 'Standard', label: 'Compact Class', amount: 1799 },
  { size: 'Large', label: 'Executive Class', amount: 2499 },
  { size: 'Premium', label: 'Prestige Class', amount: 3699 }
]);

const showBookingModal = ref(false);
const selectedPackage = ref('PPF');
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
  selectedCarSize.value = String(carSize);
  selectedPrice.value = Number(price);
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
  return 6; 
}

async function submitBooking() {
  if (!formValid.value) {
    apiResponse.value = { success: false, message: 'Please fill in all required fields.' };
    return;
  }
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
</script>

<style scoped>


.ppf-hero-img {
  max-height: 300px;
  object-fit: contain;
  display: block;
  margin: 20px auto 0;
}

li{
  text-align: left;
  color: #ffffff;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 2.2;
  font-family: sans-serif;
}

h2 {
  color: #C1902D;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

p {
  color: #ffffff;
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
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

/* Modal Styles (from Signature Detailing) */
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
  max-height: 90vh;
  overflow-y: auto;
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

.check-availability:hover {
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
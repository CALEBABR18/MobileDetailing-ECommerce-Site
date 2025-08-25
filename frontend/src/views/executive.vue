<template>
       <!-- 1. Hero Section (Attention) -->
    <div class="bannerT bg-image">
      <div class="video-text">
        <div class="text-wrap animationLeft">
          <h1 class="banTexts">EXECUTIVE PACKAGE</h1>
          <br>
          <h5 class="fansT">For the discerning owner who demands excellence without the full presidential treatment.</h5>
        </div>
      </div>
    </div>
    <!-- BANNER END -->

    <hr>
   <div class="luxury-packages">
  <section class="two-col">
  <h1 class="title">The Auto Stallion Executive Difference</h1>
  <p style="margin-right: 10px;">
    A comprehensive exterior-interior package using professional-grade products to restore showroom shine with lasting protection.
  </p>
</section>
<hr>

      <!-- Applications Section -->
<section class="applications-section py-5">
  <div class="container">
    <div class="application-grid">
      <div v-for="(application, index) in applications" :key="index" class="application-card card bg-dark border-gold">
        <div class="card-body text-center">
          <i class="bi" :class="application.icon" style="font-size: 2rem; color: #C1902D;"></i>
          <h6 class="card-title text-gold mt-3">{{ application.title }}</h6>
          <p class="card-text">{{ application.description }}</p>
        </div>
      </div>
    </div>
  </div>
</section>


    <!-- Pricing Tiers -->
    <div class="interior-pricing">
      <h3>Choose Your Vehicle Size</h3>
      <div class="price-tiers">
        <div v-for="(tier, idx) in executivePricing" :key="tier.size + '-' + idx" class="tier">
          <span class="size">{{ tier.label }}</span>
          <span class="price">R{{ tier.amount }}</span>
          <button @click="openBookingModal(tier.size, tier.amount)">Book Now</button>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
          <div v-if="showBookingModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
              <button class="close-modal" @click="closeModal">&times;</button>
    
              <h2>Book Executive Package</h2>
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
              <br>

              <!-- Stripe Payment Button -->
              <div v-if="selectedCarSize" class="stripe-payment-section">
                <button @click="goToStripePayment" class="stripe-pay-btn">
                  Pay R{{ selectedPrice }} for {{ executivePricing.find(t => t.size === selectedCarSize)?.label || selectedCarSize }} Executive Detailing
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
import { ref, computed,onMounted, nextTick } from 'vue';
import axios from 'axios';

const applications = ref([
        { title: 'Interior cleaning', description: 'Deep cleaning of vehicle interiors', icon: 'bi-car-front-fill' },
        { title: 'Carpet Shampoo Extraction', description: 'Indulge your car\'s leather with meticulous cleaning and protection', icon: 'bi-gear-fill' },
        { title: 'Hand Wash & Wax', description: 'Comprehensive steam cleaning for dash, door panels and vents', icon: 'bi-gear-fill' },
        { title: 'Undercarriage maintenance', description: 'Remove grime from hard-to-reach areas', icon: 'bi-truck' },
        { title: 'Electrical components', description: 'Safe cleaning of sensitive electronics', icon: 'bi-lightning-charge-fill' },
        { title: 'Odor Removal', description: 'Eliminate unpleasant smells for a fresh, clean interior', icon: 'bi-wind' }
]);

// const executivePricing = ref([
//   { size: 'Compact Class', label: 'Compact Class', amount: 1299 },
//   { size: 'Executive Class', label: 'Executive Class', amount: 1699 },
//   { size: 'Prestige Class', label: 'Prestige Class', amount: 2199 }
// ]);

const executivePricing = ref([
  { size: 'Standard', label: 'Compact Class', amount: 1299 },
  { size: 'Large', label: 'Executive Class', amount: 1699 },
  { size: 'Premium', label: 'Prestige Class', amount: 2199 }
]);

const showBookingModal = ref(false);
const selectedPackage = ref('Executive');
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
    booking.value.time &&
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

function resetBookingForm() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  booking.value = {
    date: tomorrow.toISOString().split('T')[0],
    time: '10:00',
    vehicleType: '',
    vehicleModel: '',
    address: '',
    customerNotes: ''
  };
}

function getPackageId() {
  return 3;
}

// Submit booking function
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
      resetBookingForm();
    }, 9000);
  } catch (err) {
    apiResponse.value = { success: false, message: err.response?.data?.message || 'Booking failed' };
  }
}

// Stripe Checkout priceIds for Executive package
// const stripePriceIds = {
//   'Compact Class': 'price_1Rw6GIPies0EImM7x1iFBfEN', 
//   'Executive Class': 'price_1Rw6HYPies0EImM7wAjxTHSD',   
//   'Prestige Class': 'price_1Rw6IbPies0EImM7eL7NOFhk'  
// };

const stripePriceIds = {
  Standard: 'price_1Rw6GIPies0EImM7x1iFBfEN',
  Large: 'price_1Rw6HYPies0EImM7wAjxTHSD',
  Premium: 'price_1Rw6IbPies0EImM7eL7NOFhk'
};


// Stripe payment function
function goToStripePayment() {
  if (!selectedCarSize.value || !selectedPrice.value) {
    alert('Please select a vehicle size and price before proceeding to payment.');
    return;
  }
  const carSize = selectedCarSize.value.toString().trim();
  const priceId = stripePriceIds[carSize];
  if (!priceId) {
    alert('No Stripe price ID found for the selected car size. Please select a valid option.');
    console.error('Stripe priceId missing for carSize:', carSize, stripePriceIds);
    return;
  }
  axios.post('http://localhost:5000/api/checkout/create-checkout-session', {
    priceId,
    cancelUrl: window.location.origin + '/payments?canceled=1',
    successUrl: window.location.origin + '/payments?success=1'
  }, { withCredentials: true })
    .then(res => {
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => {
      alert('Failed to start payment. Please try again.');
      console.error('Stripe payment error:', err?.response?.data || err);
    });
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
.bannerT {
    color: white;
    min-height: 300px;
    text-align: left;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: left;
    box-sizing: border-box;
}

.text-wrap {
    padding: 20px;
    border-radius: 5px;
    text-align: left;
    margin-top: 200px;
    font-size: 1.2rem;
    line-height: 1.6;
    word-wrap: break-word;
}

.banText {
    /* font-size: 50px;
    margin: 0; */
  font-weight: 650;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}

.fansT {
    /* font-size: 35px;
    margin: 0px 0; */
  font-weight: 400;
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale; 
}

.animationLeft{
    animation: sideLeft 1.6s ease forwards;
    opacity: 0;
    animation-delay: 1s;
}

.two-col {
  display: flex;
  align-items: center;       
  justify-content: space-between;
  gap: 60px;               
  margin: 50px 10px;
}

.two-col .title {
  flex: 1;                   /* take 1 part */
  font-size: 2rem;
  font-family: "Playfair Display", serif;
}

.two-col p {
  flex: 2;           
  font-family: "Playfair Display", serif;        /* take 2 parts */
  font-size: 1.3rem;
  line-height: 1.6;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .two-col {
    flex-direction: column;   /* stack */
    text-align: center;       /* center text */
  }

  .two-col .title,
  .two-col p {
    flex: unset;
    width: 100%;
  }
}

 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Playfair Display", serif;
    }
    
    body {
      background-color: #100f0f ;
      color: #fff;
      font-family: 'Playfair Display', serif;
      line-height: 1.6;
    }

    h1{
    font-family: "Playfair Display", serif;
}

  .bg-image {
  background-image: url('https://wallpapercave.com/wp/wp14723343.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 100;
  }

.application-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-content: center;
}

.application-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease, transform 1s ease;
}

.card{
  width: 380px;
  height: 250px;
}

.application-card.fade-in {
  opacity: 1;
  transform: translateY(0);
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

   .luxury-packages {
    padding: 10px 0px;
  margin: 0 auto;
  color: #fff;
    }
    
    .package-header {
      text-align: center;
      margin-top: 50px;
      margin-bottom: 40px;
      opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

  .package-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.package-header h2,h6 {
  color: #C1902D;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.package-header p,p {
  color: #ffffff;
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
}

.title {
     color: #C1902D;
     letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 15px;
      font-size: 40px;
       font-weight: 300;
      line-height: 50px;
  }
  
hr {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent);
  margin: 40px 0;
  opacity: 0.6;
}

.interior-pricing {
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  padding: 40px;
  margin-top: 60px;
  border-radius: 8px;
}
.interior-pricing h3 {
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

.modal-content {
  max-height: 90vh;
  overflow-y: auto;
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
}
.confirm-booking {
  background: #C1902D;
  color: #000;
  border: none;
  padding: 14px 25px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
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

@media (max-width: 768px) {
  .two-column-form {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .form-actions {
    flex-direction: column;
  }
    .application-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .step-card {
    min-width: 240px;
    height: 340px;
  }
  .price-tiers {
    grid-template-columns: 1fr;
  }
  .interior-pricing {
    padding: 30px 20px;
  }
  .package-header h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .luxury-packages {
    padding: 30px 15px;
  }
    .application-grid {
    grid-template-columns: 1fr;
  }
  .step-card {
    min-width: 220px;
    height: 300px;
  }
  .step-content {
    padding: 20px;
  }
  .step-content h3 {
    font-size: 1.3rem;
  }
}
</style>
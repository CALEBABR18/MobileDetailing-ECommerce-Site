<script setup>
import axios from 'axios';
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Reactive data
const scrollProgress = ref(0);
const showBookingModal = ref(false);
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

// Steps data
const steps = ref([
  {
    number: '01',
    title: 'Steam Clean',
    description: 'Professional vacuuming and steam cleaning for your car\'s interior',
    image: 'https://dennisautodetails.com/wp-content/uploads/2025/04/aps-auto-detailing-top-uses.jpg'
  },
  {
    number: '02',
    title: 'Leather Treatment',
    description: 'Indulge your car\'s leather with meticulous cleaning and protection',
    image: 'https://www.internationalleatherclub.com/wp-content/uploads/2024/08/Claeaning-a-Leather-Car-Seat-With-a-Soft-Brush-How-To-Clean-Leather-Car-Seats-International-Leather-Club.png'
  },
  {
    number: '03',
    title: 'Additional Steam Clean',
    description: 'Comprehensive steam cleaning for dash, door panels and vents',
    image: 'https://s25180.pcdn.co/wp-content/uploads/2021/04/AdobeStock_223148396.jpeg'
  },
  {
    number: '04',
    title: 'Ceramic Wax Application',
    description: 'Carpets cleaned and plastic panels treated with Gyeon Preserve',
    image: 'https://th.bing.com/th/id/R.17beafec84e32feddb6aedbd5bc65fc6?rik=SLHzSU6AqzKC7Q&pid=ImgRaw&r=0'
  }
]);

// Pricing data
const interiorPricing = ref([
  { size: 'Standard', label: 'Compact Class', amount: 899 },
  { size: 'Large', label: 'Executive Class', amount: 1299 },
  { size: 'Premium', label: 'Prestige Class', amount: 1899 }
]);

// Stripe data
const stripePriceIds = {
  Standard: 'price_1Rw1W3Pies0EImM7UrI7e5gA',
  Large: 'price_1Rw68iPies0EImM7zO5IV1O2',
  Premium: 'price_1Rw6ApPies0EImM7Iv7TMIaD'
};

// Computed properties
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

// Methods
function updateScrollProgress() {
  const timelineEl = document.querySelector('.timeline');
  if (!timelineEl) return;

  const rect = timelineEl.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const offsetTop = timelineEl.offsetTop;
  const sectionHeight = timelineEl.offsetHeight;

  const distanceScrolled = scrollTop + windowHeight - offsetTop;
  const totalScrollable = sectionHeight + windowHeight;

  const rawProgress = (distanceScrolled / totalScrollable) * 100;
  const clamped = Math.min(Math.max(rawProgress, 0), 100);

  scrollProgress.value = clamped;
  checkVisibleItems();
}

function checkVisibleItems() {
  const items = document.querySelectorAll('.timeline-item');
  const windowHeight = window.innerHeight;

  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < windowHeight * 0.8) {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 200);
    }
  });
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

function openBookingModal(carSize, price) {
  selectedCarSize.value = carSize;
  selectedPrice.value = price;
  showBookingModal.value = true;
  apiResponse.value = null;
  resetBookingForm();
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
  return 1;
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
      resetBookingForm();
    }, 9000);
  } catch (err) {
    apiResponse.value = { success: false, message: err.response?.data?.message || 'Booking failed' };
  }
}

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

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
  // Initial check
  setTimeout(updateScrollProgress, 500);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});

const headerRef = ref(null);
const isHeaderVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isHeaderVisible.value = true;
        observer.disconnect(); // remove after trigger
      }
    },
    {
      threshold: 0.2,
    }
  );

  if (headerRef.value) {
    observer.observe(headerRef.value);
  }
});
</script>

<template>
    
    <!-- 1. Hero Section (Attention) -->
    <div class="bannerT bg-image">
      <div class="video-text">
        <div class="text-wrap animationLeft">
          <h1 class="banText">INTERIOR DETAILING </h1>
          <br>
          <h5 class="fansT">With the meticulous attention to detail and rejuvenating techniques employed, our interior detailing breathes new life into your beloved vehicle</h5>
        </div>
      </div>
    </div>
    <!-- BANNER END -->

   <div class="luxury-packages">
           <hr>
  <section class="two-col">
  <h1 class="title">Renewed look, Scent, and Feel</h1>
  <p>
    Car Interior Detailing is the process of using rejuvenation techniques and
    methods to make a vehicle look, smell, and feel brand new.
  </p>
</section>
          <hr>

          <!-- Style Timeline -->
          <div class="timeline-container">
            
            <div class="timeline">
              <div class="timeline-progress" :style="{ height: scrollProgress + '%' }"></div>
              
              <div v-for="(step, index) in steps" :key="index" class="timeline-item">
                <div class="step-number">STEP {{ step.number }}/04</div>
                <div class="timeline-circle"></div>
                <div class="timeline-item-content">
                  <h3>{{ step.title }}</h3>
                  <p>{{ step.description }}</p>
                  <div class="timeline-image" :style="{ backgroundImage: 'url(' + step.image + ')' }"></div>
                </div>
              </div>
            </div>
          </div>
    
          <!-- Interior Pricing & Booking -->
          <div class="interior-pricing">
            <h3>Choose Your Vehicle Size</h3>
            <div class="price-tiers">
              <div v-for="tier in interiorPricing" :key="tier.size" class="tier">
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
    
              <h2>Book Interior Package</h2>
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
    
              <!-- Stripe Payment Button -->
              <div v-if="selectedCarSize" class="stripe-payment-section">
                <button @click="goToStripePayment" class="stripe-pay-btn">
                  Pay R{{ selectedPrice }} for {{ interiorPricing.find(t => t.size === selectedCarSize)?.label || selectedCarSize }} Interior Detailing
                </button>
              </div>
    
              <div v-if="apiResponse" class="api-response" :class="{ success: apiResponse.success, error: !apiResponse.success }">
                {{ apiResponse.message }}
              </div>
            </div>
          </div>

          
        </div>
</template>

<style scoped>

.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}

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
  flex: 1;                 
  font-size: 1.9rem;
  font-family: "Playfair Display", serif;
}

.two-col p {
  flex: 1;          
  font-family: "Playfair Display", serif;       
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

.timeline-item {
  position: relative;
}

/* Style and position the step number */
.step-number {
  position: absolute;
  left: -270px; /* adjust this for spacing */
  top: 50%;
  transform: translateY(-50%);
  color: #C1902D;
  font-size: 2rem;
  white-space: nowrap;
  color: #C1902D;
  margin-bottom: 10px;
  letter-spacing: 1px;
  font-weight: 500;
}

p{
    font-family: "Lato", sans-serif !important;
    font-weight: 400 !important;
    font-style: normal !important;
    color: #fff !important; 
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

  .bg-image {
  background-image: url('https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg?cs=srgb&dl=pexels-pixabay-326259.jpg&fm=jpg');
  background-size: cover;
  background-position: center;
   background-attachment: fixed; 
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 100;
}   
    .title  {
      color: #C1902D;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 15px;
      width: 420px;
     font-size: 55px;
     font-weight: 300;
     line-height: 88px;
    }
    
    .sub-title {
      color: #ffffff;
      font-size: 0.9rem;
      max-width: 700px;
      line-height: 1.6;
      width: 420px;
     /* font-size: 22px; */
     margin-top: 15px;
    margin: 0px 0;
    -webkit-text-stroke: 100px black; /* outline */
    font-weight: bold;
      text-shadow: 1px 1px 0 black, -1px -1px 0 black;
    }
    
    hr {
      border: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent);
      margin: 40px 0;
      opacity: 0.6;
    }
    
    /*  Style Timeline */
    .timeline-container {
      position: relative;
      max-width: 1000px;
      margin: 60px auto;
      padding: 0 20px;
    }
    
    .timeline {
      position: relative;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background: rgba(193, 144, 45, 0.3);
    }
    
    .timeline-progress {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      background: #C1902D;
      z-index: 1;
      transition: height 0.7s ease;
    }
    
    .timeline-item {
      display: flex;
      justify-content: flex-end;
      padding-right: 30px;
      position: relative;
      margin: 50px 0;
      width: 50%;
      opacity: 0;
      transform: translateX(-20px);
      transition: all 0.8s ease;
    }
    
    .timeline-item {
      align-self: flex-end;
      justify-content: flex-start;
      padding-left: 30px;
      padding-right: 0;
      left: 50%;
    }
    
    .timeline-item-content {
      background: rgba(15, 15, 15, 0.8);
      /*border: 1px solid rgba(193, 144, 45, 0.3);*/
      border-radius: 8px;
      padding: 20px;
      width: 550px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
      position: relative;
    }
    
    .timeline-item .timeline-item-content {
      text-align: left;
    }
    
    .timeline-item-content::after {
      content: '';
      position: absolute;
      right: -10px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 10px;
      height: 10px;
      background: #0f0f0f;
      border-right: 1px solid rgba(193, 144, 45, 0.3);
      border-bottom: 1px solid rgba(193, 144, 45, 0.3);
    }
    
    .timeline-item .timeline-item-content::after {
      right: auto;
      left: -10px;
      border-right: none;
      border-left: 1px solid rgba(193, 144, 45, 0.3);
      border-bottom: 1px solid rgba(193, 144, 45, 0.3);
      border-top: none;
    }

    .timeline-circle {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -20px;
      width: 20px;
      height: 20px;
      background: #100f0f;
      border: 3px solid #C1902D;
      border-radius: 50%;
      z-index: 2;
    }
    
    .timeline-item .timeline-circle {
      right: auto;
      left: -9px;
    }
  
    
    .timeline-item-content h3 {
      font-size: 1.7rem;
      margin-bottom: 10px;
      color: #fff;
      font-weight: 400;
    }
    
    .timeline-item-content p {
      font-size: 1rem;
      color: #ccc;
      line-height: 1.8;
      margin-bottom: 15px;
    }
    
    .timeline-image {
      width: 100%;
      height: 360px;
      width: 510px;
      border-radius: 5px;
      background-size: cover;
      background-position: center;
      margin-top: 15px;
    }
    
    .timeline-item.visible {
      opacity: 1;
      transform: translateX(0);
    }
    
    /* Price Tiers */
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
    
    .stripe-payment-section {
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
    }
</style>
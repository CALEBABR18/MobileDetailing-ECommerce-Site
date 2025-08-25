<template>
  <!-- 1. Hero Section (Attention) -->
    <div class="bannerT bg-image">
      <div class="video-text">
        <div class="text-wrap animationLeft">
          <h1 class="banTexts">PRESIDENTIAL DETAILING </h1>
          <h5 class="fansT">Our most comprehensive luxury treatment for your prized possession.</h5>
        </div>
      </div>
    </div>
    <!-- BANNER END -->

   <hr>
  <section class="two-col">
  <h1 class="title">Why Choose Presidential Detailing?</h1>
<p>
We go beyond standard car care. Our elite detailing package restores, protects, and elevates your vehicle to showroom perfection. From deep interior cleaning to advanced paint correction and ceramic coating, every inch is treated with precision and care.
</p>
</section>
          <hr>

  <div class="luxury-packages">

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

    <!-- Pricing Tiers -->
    <div class="interior-pricing">
      <h3>Choose Your Vehicle Size</h3>
      <div class="price-tiers">
        <div v-for="tier in presidentialPricing" :key="tier.size" class="tier">
          <!-- <span class="size">{{ tier.size }}</span> -->
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
        <h2>Book Presidential Package</h2>
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
                <input type="text" v-model="booking.vehicleType" placeholder="e.g., Sedan, SUV"  required />
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

        <!-- Stripe Payment Button for Presidential Packages (matches other packages) -->
        <div v-if="selectedCarSize && stripePriceIds[selectedCarSize]" class="stripe-payment-section" style="margin-top: 1.5rem; text-align: right;">
          <button @click="goToStripePayment" class="stripe-pay-btn">
            <!-- Pay R{{ selectedPrice }} for {{ selectedCarSize }} Presidential -->
             <!-- Pay R{{ selectedPrice }} for {{ presidentialPricing.value.find(t => t.size === selectedCarSize)?.label || selectedCarSize }} Presidential -->
            Pay R{{ selectedPrice }} for {{ (presidentialPricing && presidentialPricing.value && presidentialPricing.value.find(t => t.size === selectedCarSize)?.label) || selectedCarSize }} Presidential
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
// Stripe Checkout priceIds for Presidential package
// const stripePriceIds = {
//   Compact: 'price_1Rw6UMPies0EImM7XfC9GgtC',   // Compact
//   Executive: 'price_1Rw6VLPies0EImM7D1rC9034', // Executive
//   Prestige: 'price_1Rw6WMPies0EImM737s6RO1t'   // Prestige
// };

const stripePriceIds = {
  Standard: 'price_1Rw6UMPies0EImM7XfC9GgtC',
  Large: 'price_1Rw6VLPies0EImM7D1rC9034',
  Premium: 'price_1Rw6WMPies0EImM737s6RO1t'
};


function goToStripePayment() {
  const priceId = stripePriceIds[selectedCarSize.value];
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const steps = ref([
  {
    number: '01',
    title: 'All Executive Services',
    description: 'Includes professional vacuuming, steam cleaning, leather treatment, dashboard and console detailing, and full interior care for your car.',
    image: 'https://cardetailingtemeculaca.com/wp-content/uploads/2024/04/How-Does-Steam-Cleaning-Work-in-Temecula-CA.webp'
  },
  {
    number: '02',
    title: '2-Step Paint Correction',
    description: 'We perform a multi-stage paint correction polish on the car to remove deep scratches, swirl marks, oxidation, and other paint imperfections',
    image: 'https://www.rpmspecialistcars.co.uk/app/uploads/2022/05/Porsche-paint-correction-machine-polish-1500x750.jpg'
  },
  {
    number: '03',
    title: '12-Month Ceramic Coating',
    description: 'Provides long term protection from harmful UV rays, water, dirt, and most other contamination.',
    image: 'https://wpstaq-ap-southeast-2-media.s3.amazonaws.com/protectwraps/wp-content/uploads/media/2025/05/Untitled-design-11.jpg'
  },
  {
    number: '04',
    title: 'Headlight Restoration',
    description: 'Removes fine scratches, cloudiness, haziness, yellowing and oxidation from headlights making old look new.',
    image: 'https://s25180.pcdn.co/wp-content/uploads/2020/12/AdobeStock_249301747.jpeg'
  }
]);

// const interiorPricing = ref([
//   { size: 'Compact', amount: 2999 },
//   { size: 'Executive', amount: 3499 },
//   { size: 'Prestige', amount: 3999 }
// ]);

const presidentialPricing = ref([
  { size: 'Standard', label: 'Compact Class', amount: 2999 },
  { size: 'Large', label: 'Executive Class', amount: 3499 },
  { size: 'Premium', label: 'Prestige Class', amount: 3999 }
]);

const scrollProgress = ref(0);
const showBookingModal = ref(false);
const selectedPackage = ref('Presidential Detailing');
const selectedCarSize = ref(null);
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
  return 4; 
}

async function submitBooking() {
  try {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
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
      booking.value = {
        date: '',
        time: '10:00',
        vehicleType: '',
        vehicleModel: '',
        address: '',
        customerNotes: ''
      };
      closeModal();
    }, 8000);
  } catch (err) {
    apiResponse.value = { success: false, message: err.response?.data?.message || 'Booking failed' };
  }
}

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
          
          // Check which timeline items are visible
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
    font-size: 50px;
    margin: 0;
}

.fansT {
    font-size: 35px;
    margin: 0px 0;
}

.animationLeft{
    animation: sideLeft 1.5s ease forwards;
    opacity: 0;
    animation-delay: 0.5s;
}

li{
  text-align: left;
  color: #ffffff;
  font-size: 0.9rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}
.two-col {
  display: flex;
  align-items: center;       
  justify-content: space-between;
  gap: 60px;               
  margin: 50px 10px;
}
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}

.two-col .title {
  flex: 1;               
  font-size: 2rem;
  font-family: "Playfair Display", serif;
}

.two-col p {
  flex: 2;           
  font-family: "Playfair Display", serif;       
  font-size: 1.3rem;
  line-height: 1.6;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .two-col {
    flex-direction: column;  
    text-align: center;      
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
  background-image: url('https://i.shgcdn.com/aceda2c7-d994-4107-ba72-8bad9dc5dea9/-/format/auto/-/preview/3000x3000/-/quality/lighter/');
  background-size: cover;
  background-position: center;
   background-attachment: fixed; 
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 100;
}  

/* https://cdn.wallpapersafari.com/92/93/zGKZl0.jpg */
/* https://images.pexels.com/photos/4141954/pexels-photo-4141954.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200 */
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
     font-size: 22px;
     margin-top: 15px;
    margin: 0px 0;
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

 /* Responsive Adjustments */
@media (max-width: 768px) {
  .banText {
    font-size: 35px;
    color: #C1902D !important;
    margin: 0;
}

.fansT {
    font-size: 18px;
    margin: 0px 0;
}

.title  {
      color: #C1902D;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 10px;
     font-size: 25px;
     line-height: 30px;
    background: linear-gradient(90deg, #C1902D, #fff1c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    }

p{
  font-size: 1.2rem !important;
  font-family:serif !important;
}
  /*  Style Timeline */
    .timeline-container {
      position: relative;
      max-width: 300px;
      margin: 40px auto;
      padding: 0 20px;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 30%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background: rgba(193, 144, 45, 0.3);
    }
    
    .timeline-progress {
      position: absolute;
      left:30%;
      transform: translateX(-50%);
      width: 4px;
      background: #C1902D;
      z-index: 1;
      transition: height 0.7s ease;
    }
    
    .timeline-item {
      display: flex;
      padding-right: 20px;
      position: relative;
      margin: 10px 0;
      width: 50%;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.8s ease;
      align-self: flex-end;
      padding-right: 0;
      left: 30%;
    }
    
    .timeline-item-content {
      background: rgba(15, 15, 15, 0.8);
      border-radius: 8px;
      padding: 20px;
      width: 380px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
      position: relative;
    }
    
    .timeline-item .timeline-item-content {
      text-align: left;
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
      z-index: 1;
    }
    
    .timeline-item .timeline-circle {
      right: auto;
      left: -9px;
    }
    
    .timeline-item-content h3 {
      font-size: 1.5rem;
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
      height: 230px;
      width: 230px;
      border-radius: 5px;
      background-size: cover;
      background-position: center;
      margin-top: 15px;
    }
    
    .timeline-item.visible {
      opacity: 1;
      transform: translateX(0);
    }
    
  .two-column-form {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .step-number{
    font-size: 1rem;
    margin-left: 140px;
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
  
  .step-content {
    padding: 20px;
  }
  
  .step-content h3 {
    font-size: 1.3rem;
  }
}

</style>
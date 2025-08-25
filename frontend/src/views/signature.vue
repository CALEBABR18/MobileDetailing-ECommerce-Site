<template>
  <div class="luxury-packages">
    <div class="package-header">
      <h2>Auto Stallion Signature Detailing</h2>
      <p>Our most comprehensive luxury treatment for your prized possession.</p>
    </div>

    <hr>

     <div class="package-header">
  <h2>Why Choose Our Signature Detail?</h2>
   <p><ul>
   <li>Perfect for exotic, luxury, or collector vehicles</li>
  <li>Designed for both daily drivers and show cars</li>
  <li>Paint depth and reflection enhancement</li>
  <li>Long-term ceramic protection reduces maintenance</li>
  <li>Mobile service available at your location</li>
</ul></p>
</div>
<hr>

<!-- Parallax Scroll Steps -->
<div class="parallax-steps">
  <section 
    class="parallax-step" 
    v-for="(step, index) in steps" 
    :key="index" 
    :style="{ backgroundImage: 'url(' + step.image + ')' }"
  >
    <div class="parallax-content">
      <div class="step-numbers">STEP {{ step.number }}/06</div>
      <h2>{{ step.title }}</h2>
      <p>{{ step.description }}</p>
    </div>
  </section>
</div>
    

    <!-- Pricing Tiers -->
    <div class="interior-pricing">
      <h3>Choose Your Vehicle Size</h3>
      <div class="price-tiers">
        <div v-for="tier in signaturePricing" :key="tier.size" class="tier">
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

        <!-- Stripe Payment Button for Signature Packages -->
        <div v-if="selectedCarSize && stripePriceIds[selectedCarSize]" class="stripe-payment-section" style="margin-top: 1.5rem; text-align: right;">
          <button @click="goToStripePayment" class="stripe-pay-btn">
            <!-- Pay R{{ selectedPrice }} for {{ selectedCarSize }} Signature (Stripe) -->
             <!-- Pay R{{ selectedPrice }} for {{ signaturePricing.value.find(t => t.size === selectedCarSize)?.label || selectedCarSize }} Signature -->
            Pay R{{ selectedPrice }} for {{ (signaturePricing && signaturePricing.value && signaturePricing.value.find(t => t.size === selectedCarSize)?.label) || selectedCarSize }} Signature Package
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
// Stripe Checkout priceIds for Signature package
const stripePriceIds = {
  Standard: 'price_1Rw6kmPies0EImM7PVXYP85z', // Compact Class
  Large: 'price_1Rw6lXPies0EImM70eyrHfVA',    // Executive Class
  Premium: 'price_1Rw6mRPies0EImM7bVjIG8eB'   // Prestige Class
};

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
import { ref, computed } from 'vue';
import axios from 'axios';
// import { addDays, format } from 'date-fns';

// function useCurrentUser() {
//   const user = ref(null);
//   function fetchUser() {
//     try {
//       user.value = JSON.parse(localStorage.getItem('user'));
//     } catch {
//       user.value = null;
//     }
//   }
//   fetchUser();
//   return { user, fetchUser };
// }


const signaturePricing = ref([
  { size: 'Standard', label: 'Compact Class', amount: 3999 },
  { size: 'Large', label: 'Executive Class', amount: 4499 },
  { size: 'Premium', label: 'Prestige Class', amount: 4999 }
]);

const showBookingModal = ref(false);
const selectedCarSize = ref('');
const selectedPrice = ref(0);

const apiResponse = ref(null);

// Computed property to validate the booking form
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

const booking = ref({
  date: '',
  time: '10:00',
  vehicleType: '',
  vehicleModel: '',
  address: '',
  customerNotes: ''
});

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
  return 5; 
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

// Steps section
const steps = ref([
  { number: '01', title: 'Premium Foam Wash', description: 'Professional vacuuming and steam cleaning for your car\'s interior', image: 'https://wallpapercave.com/wp/wp8876915.png' },
  {
    number: '02',
    title: 'Wheel & Brake Caliper Master Detailing ',
    description: 'Ceramic-infused dressing for unmatched durability and shine.',
    image: 'https://wallpapercave.com/wp/wp11201742.jpg'
  },
  {
    number: '03',
    title: '3-Step Paint Correction (Mirror Finish)',
    description: 'Swirls, haze, and imperfections are removed through a 3-step paint correction process — restoring unparalleled clarity, depth, and gloss.',
    image: 'https://www.ultradetailing.co.nz/wp-content/uploads/2022/08/800-474-Paint-detailing-cut-polish.jpg'
  },
  {
    number: '04',
    title: 'Interior Couture Treatment',
    description: 'Full shampoo and steam purification of carpets, leather, and upholstery.',
    image: 'https://www.jcwhitney.com/wp-content/uploads/2024/04/Top-Trends-in-Car-Interior-Upgrades-for-Comfort-and-Style.webp'
  },
  {
    number: '05',
    title: '9H Ceramic Coating Protection',
    description: 'Your vehicle is sealed with a high-grade ceramic coating, providing up to 3 years of hydrophobic protection, unmatched shine, and resistance against UV, dirt, and chemicals.',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80'
  },
  {
    number: '06',
    title: 'Hydrophobic Glass Coating & Final Concierge Inspection',
    description: 'Water-repellent brilliance and a meticulous finishing touch.',
    image: 'https://static.wixstatic.com/media/4aa445_5d3217a66b7648d0b7d9bfd3a38c87d3~mv2.jpeg/v1/fill/w_640,h_446,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4aa445_5d3217a66b7648d0b7d9bfd3a38c87d3~mv2.jpeg'
  }
]);
</script>


<style scoped>
li{
  text-align: left;
  color: #ffffff;
  font-size: 0.9rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

h2{
  color: #C1902D;
}

.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}

p{
  color: white;
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
  margin-top: 100px;
  background-color: #000;
  padding: 50px 20px;
}

/* Parallax Steps */
.parallax-steps {
  width: 100%;
  overflow: hidden;
}

.parallax-step {
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  /* background-attachment: fixed; Removed for better mobile compatibility */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Fallback for mobile devices: use scroll instead of fixed */
@media (max-width: 1024px) {
  .parallax-step {
    background-attachment: scroll;
  }
}

.parallax-content {
  background: rgba(25, 25, 25, 0.55);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.7);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 40px;
  border-radius: 8px;
  max-width: 700px;
  text-align: center;
  color: rgb(255, 255, 255);
  animation: fadeInUp 1s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

.parallax-content:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0,0,0,0.8);
}

.parallax-step:nth-child(even) .parallax-content {
  background: rgba(25, 25, 25, 0.75);
}

.parallax-step::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
  z-index: 1;
}

.parallax-content h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffffff;
}

.parallax-content p {
  font-size: 1rem;
  line-height: 1.6;
}

.step-numbers {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  border-bottom: 1px solid #C1902D;
  display: inline-block;
  padding-bottom: 5px;
  margin-bottom: 15px;
  color: #C1902D;
  font-size: 1.1rem;
  margin-bottom: 10px;
  letter-spacing: 1px;
  font-weight: 500;
}

.package-header h2 {
  font-family: 'Playfair Display', serif; /* luxury serif font */
  font-size: 2.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #C1902D;
  margin-bottom: 10px;
}

.package-header p {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.85);
  max-width: 650px;
  margin: 0 auto;
}


/* Fade-in Animation */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .parallax-content {
    padding: 20px;
  }

  .parallax-content h2 {
    font-size: 1.5rem;
  }

  .parallax-content p {
    font-size: 0.9rem;
  }
}

hr {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent);
  margin: 40px 0;
  opacity: 0.6;
}

.step-content h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 400;
  line-height: 1.3;
}

.step-content p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
  opacity: 0.9;
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
.api-response {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  color: #fff; /* Ensures good contrast on colored backgrounds */
}
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
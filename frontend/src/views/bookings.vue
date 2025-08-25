<template>
  <div class="customers-page">
    <div class="luxury-header">
      <h2>BOOKINGS MANAGEMENT</h2>
      <p>Oversee your premium appointments with precision</p>
    </div>

    <div class="customer-actions">
      <div class="search-container">
        <input 
          type="text" v-model="searchQuery"  placeholder="Search bookings..." class="search-input" >
        <svg class="search-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
      
      <div class="status-filters">
        <button 
          v-for="status in statusOptions" 
          :key="status.value"
          :class="['status-filter-btn', { 'active': activeStatus === status.value }]"
          @click="setStatusFilter(status.value)"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <div class="client-table-container">
      <table class="client-table">
        <thead>
          <tr>
            <th class="text-left">BOOKING ID</th>
            <th class="text-left">USER ID</th>
            <th class="text-left">PACKAGE</th>
            <th class="text-left">DATE & TIME</th>
            <th class="text-left">VEHICLE</th>
            <th class="text-left">ADDRESS</th>
            <th class="text-left">PRICE</th>
            <th class="text-left">STATUS</th>
            <th class="text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in filteredBookings" :key="booking.id">
            <td>#{{ booking.id }}</td>
            <td>{{ booking.userId }}</td>
            <td>{{ getPackageName(booking.packageId) }}</td>
            <td>{{ formatDateTime(booking.bookingDate, booking.bookingTime) }}</td>
            <td>{{ booking.vehicleType }} {{ booking.vehicleModel }}</td>
            <td class="address-cell">{{ truncateAddress(booking.customerAddress) }}</td>
            <td>R{{ Number(booking.totalPrice || 0).toFixed(2) }}</td>
            <td>
              <select 
                v-model="booking.status" 
                @change="updateStatus(booking)"
                class="status-select"
                :class="booking.status"
              >
                <option 
                  v-for="status in statusOptions" 
                  :key="status.value" 
                  :value="status.value"
                >
                  {{ status.label }}
                </option>
              </select>
            </td>
            <td class="actions-cell">
              <button class="action-btn view-btn" @click="viewBooking(booking)">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
              <button class="action-btn edit-btn" @click="editBooking(booking)">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="!filteredBookings.length">
            <td colspan="9" class="no-results">
              No bookings found
            </td>
          </tr>
        </tbody>
      </table>
    </div>


     <!-- View Booking Modal -->
    <div class="modal-overlay" v-if="showViewModal" @click.self="closeViewModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeViewModal">✕</button>
        <h3>BOOKING DETAILS #{{ currentBooking.id }}</h3>
        
        <div class="booking-details">
          <div class="detail-row">
            <span class="detail-label">User ID:</span>
            <span class="detail-value">{{ currentBooking.userId }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Package:</span>
            <span class="detail-value">{{ getPackageName(currentBooking.packageId) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date & Time:</span>
            <span class="detail-value">{{ formatDateTime(currentBooking.bookingDate, currentBooking.bookingTime) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Vehicle:</span>
            <span class="detail-value">{{ currentBooking.vehicleType }} {{ currentBooking.vehicleModel }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Address:</span>
            <span class="detail-value">{{ currentBooking.customerAddress }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Price:</span>
            <span class="detail-value">R{{ Number(currentBooking.totalPrice || 0).toFixed(2) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value status-badge" :class="currentBooking.status">
              {{ currentBooking.status }}
            </span>
          </div>
          <div class="detail-row" v-if="currentBooking.customerNotes">
            <span class="detail-label">Customer Notes:</span>
            <span class="detail-value">{{ currentBooking.customerNotes }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Admin Notes:</span>
            <textarea 
              v-model="currentBooking.adminNotes" 
              class="notes-textarea"
              placeholder="Add admin notes here..."
            ></textarea>
          </div>
        </div>
        
        <div class="form-actions">
          <button class="cancel-btn" @click="closeViewModal">CLOSE</button>
          <button class="confirm-btn" @click="saveAdminNotes">SAVE NOTES</button>
        </div>
      </div>
    </div>

    <!-- Edit Booking Modal -->
    <div class="modal-overlay" v-if="showEditModal" @click.self="closeEditModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeEditModal">✕</button>
        <h3>EDIT BOOKING #{{ currentBooking.id }}</h3>
        
        <div class="form-group">
          <label>Package</label>
          <select v-model="currentBooking.packageId" class="service-select">
            <option v-for="pkg in packages" :key="pkg.id" :value="pkg.id">
              {{ pkg.name }} (R{{ Number(pkg.price || 0).toFixed(2) }})
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Booking Date</label>
          <input type="date" v-model="currentBooking.bookingDate">
        </div>
        
        <div class="form-group">
          <label>Booking Time</label>
          <input type="time" v-model="currentBooking.bookingTime">
        </div>
        
        <div class="form-group">
          <label>Vehicle Type</label>
          <input type="text" v-model="currentBooking.vehicleType" placeholder="e.g., SUV, Sedan, Coupe">
        </div>
        
        <div class="form-group">
          <label>Vehicle Model</label>
          <input type="text" v-model="currentBooking.vehicleModel" placeholder="e.g., BMW M5, Mercedes S-Class">
        </div>
        
        <div class="form-group">
          <label>Customer Address</label>
          <textarea v-model="currentBooking.customerAddress" rows="3"></textarea>
        </div>
        
        <div class="form-group">
          <label>Total Price (R)</label>
          <input type="number" v-model="currentBooking.totalPrice" step="0.01" min="0">
        </div>
        
        <div class="form-group">
          <label>Status</label>
          <select v-model="currentBooking.status" class="status-select">
            <option v-for="status in statusOptions" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Customer Notes</label>
          <textarea v-model="currentBooking.customerNotes" rows="3"></textarea>
        </div>
        
        <div class="form-group">
          <label>Admin Notes</label>
          <textarea v-model="currentBooking.adminNotes" rows="3"></textarea>
        </div>
        
        <div class="form-actions">
          <button class="cancel-btn" @click="closeEditModal">CANCEL</button>
          <button class="confirm-btn" @click="saveBooking">SAVE CHANGES</button>
        </div>
      </div>
    </div>
  </div>
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const bookings = ref([]);
const packages = ref([
  { id: 1, name: 'Interior Detailing', price: 999.00 },
  { id: 2, name: 'Dry Ice Detail', price: 2500.00 },
  { id: 3, name: 'Executive Package', price: 5000.00 },
  { id: 4, name: 'Presidential Package', price: 1800.00 },
  { id: 5, name: 'Signature Package', price: 3500.00 }
]);

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

const searchQuery = ref('');
const activeStatus = ref('all');
const showViewModal = ref(false);
const showEditModal = ref(false);
const currentBooking = ref(createEmptyBooking());
const bookingToDelete = ref(null);

async function fetchBookings() {
  try {
    const res = await axios.get('http://localhost:5000/api/bookings', { withCredentials: true });
    bookings.value = res.data;
  } catch (err) {
    console.error('Failed to fetch bookings:', err);
  }
}

onMounted(() => {
  fetchBookings();
});

function createEmptyBooking() {
  return { 
    id: null,
    userId: null,
    packageId: null,
    bookingDate: '',
    bookingTime: '',
    vehicleType: '',
    vehicleModel: '',
    customerNotes: '',
    customerAddress: '',
    totalPrice: 0,
    status: 'pending',
    adminNotes: '',
    createdAt: '',
    updatedAt: ''
  };
}

function getPackageName(packageId) {
  const pkg = packages.value.find(p => p.id === packageId);
  return pkg ? pkg.name : 'Unknown Package';
}

const filteredBookings = computed(() => {
  let result = bookings.value;
  
  // Apply status filter
  if (activeStatus.value !== 'all') {
    result = result.filter(booking => booking.status === activeStatus.value);
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(booking => 
      booking.id.toString().includes(query) ||
      booking.userId.toString().includes(query) ||
      getPackageName(booking.packageId).toLowerCase().includes(query) ||
      booking.vehicleType.toLowerCase().includes(query) ||
      booking.vehicleModel.toLowerCase().includes(query) ||
      booking.customerAddress.toLowerCase().includes(query)
    );
  }
  
  return result;
});

function formatDateTime(date, time) {
  const dateObj = new Date(`${date}T${time}`);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  };
  return dateObj.toLocaleString('en-ZA', options);
}

function truncateAddress(address) {
  return address.length > 25 ? address.substring(0, 25) + '...' : address;
}

function setStatusFilter(status) {
  activeStatus.value = status;
}

function viewBooking(booking) {
  currentBooking.value = { ...booking };
  showViewModal.value = true;
}

function editBooking(booking) {
  currentBooking.value = { ...booking };
  showEditModal.value = true;
}

function updateStatus(booking) {
  // In a real app, make API call to update status in MySQL
  console.log(`Updating status for booking #${booking.id} to ${booking.status}`);
  const index = bookings.value.findIndex(b => b.id === booking.id);
  if (index !== -1) {
    bookings.value[index].status = booking.status;
    bookings.value[index].updatedAt = new Date().toISOString();
  }
}

function saveAdminNotes() {
  // In a real app, make API call to save admin notes
  console.log(`Saving admin notes for booking #${currentBooking.value.id}`);
  const index = bookings.value.findIndex(b => b.id === currentBooking.value.id);
  if (index !== -1) {
    bookings.value[index].adminNotes = currentBooking.value.adminNotes;
    bookings.value[index].updatedAt = new Date().toISOString();
  }
  closeViewModal();
}

function saveBooking() {
  if (currentBooking.value.id) {
    // Update existing booking
    const index = bookings.value.findIndex(b => b.id === currentBooking.value.id);
    if (index !== -1) {
      bookings.value[index] = { 
        ...currentBooking.value,
        updatedAt: new Date().toISOString()
      };
    }
  }
  closeEditModal();
}

function closeViewModal() {
  showViewModal.value = false;
}

function closeEditModal() {
  showEditModal.value = false;
}
</script>

<style scoped>
.customers-page {
  background-color: black;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #C1902D;
  font-family: "Playfair Display", serif;
}

.luxury-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #C1902D;
}

.luxury-header h2 {
  font-size: 2.2rem;
  font-weight: 400;
  letter-spacing: 3.5px;
  margin-bottom: 0.5rem;
}

.luxury-header p {
  color: #dddcdc;
  letter-spacing: 1px;
  font-size: 1rem;
}

.customer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-container {
  position: relative;
  width: 280px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: black;
  border: 1px solid #C1902D;
  color: #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  fill: #777;
}

.search-input:focus + .search-icon {
  fill: black;
}

.add-client-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #dfac46;
  color: black;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.add-client-btn:hover {
  background: #d6b064;
  transform: translateY(-1px);
}

.add-icon {
  width: 18px;
  height: 18px;
}

.client-table-container {
  border: 1px solid rgba(243, 193, 30, 0.2);
  border-radius: 12px;
  overflow: hidden;
}

.client-table {
  width: 100%;
  border-collapse: collapse;
  background: black;
}

.client-table thead {
  background: rgba(212, 212, 60, 0.1);
}

.client-table th {
  padding: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: #ccc;
  text-align: center;
}

.client-table th:last-child {
  text-align: right;
}

.client-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.05);
  font-size: 0.9rem;
  color: #ccc;
}

.client-table tr:last-child td {
  border-bottom: none;
}

.client-table tr:hover {
  background: rgba(212, 212,212, 0.1);
}

.actions-cell {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.action-icon {
  width: 18px;
  height: 18px;
}

.edit-btn {
  background: rgba(75, 192, 192, 0.1);
  fill: #6cafaf;
}

.edit-btn:hover {
  background: rgba(75, 192, 192, 0.2);
}

.delete-btn {
  background: rgba(255, 99, 132, 0.1);
  fill: #FF6384;
}

.delete-btn:hover {
  background: rgba(255, 99, 132, 0.2);
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #777;
  font-style: italic;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 520px;
  max-height: 480px;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
}

.delete-modal {
  text-align: center;
}

.delete-modal p {
  margin: 1.5rem 0;
  color: #ccc;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #d6b064;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-content h3 {
  color: #C1902D;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #aaa;
  letter-spacing: 1px;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: black;
  border: 1px solid #C1902D;
  color: whitesmoke;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.form-group input:focus {
  outline: none;
  border-color: #C1902D;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn {
  background: transparent;
  border: 1px solid #777;
  color: #ccc;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.cancel-btn:hover {
  border-color: #aaa;
  color: #d6b064;
}

.confirm-btn {
  background: transparent;
  border: none;
  color: grey;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.confirm-btn:hover {
  background: #E8C252;
}

.delete-confirm-btn {
  background: #be2848;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.delete-confirm-btn:hover {
  background: #cf5670;
}

.status-filters {
  display: flex;
  gap: 0.5rem;
}

.status-filter-btn {
  background: transparent;
  border: 1px solid #C1902D;
  color: #C1902D;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-filter-btn.active {
  background: #C1902D;
  color: black;
  font-weight: 600;
}

.status-filter-btn:hover {
  background: rgba(193, 144, 45, 0.2);
}

.status-select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid;
  background: black;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.status-select.pending {
  border-color: #FFA500;
  color: #FFA500;
}

.status-select.confirmed {
  border-color: #4CAF50;
  color: #4CAF50;
}

.status-select.completed {
  border-color: #2196F3;
  color: #2196F3;
}

.status-select.cancelled {
  border-color: #F44336;
  color: #F44336;
}

.service-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: black;
  border: 1px solid #C1902D;
  color: whitesmoke;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.status-badge.pending {
  background-color: rgba(255, 165, 0, 0.1);
  color: #FFA500;
}

.status-badge.confirmed {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.status-badge.completed {
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196F3;
}

.status-badge.cancelled {
  background-color: rgba(244, 67, 54, 0.1);
  color: #F44336;
}

.service-select, 
input[type="date"],
input[type="time"],
input[type="number"],
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: black;
  border: 1px solid #C1902D;
  color: whitesmoke;
  border-radius: 4px;
  font-size: 0.9rem;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

.notes-textarea {
  width: 100%;
  padding: 0.75rem;
  background: rgba(193, 144, 45, 0.05);
  border: 1px solid rgba(193, 144, 45, 0.3);
  border-radius: 4px;
  color: #ddd;
}

.address-cell {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.booking-details {
  margin: 1.5rem 0;
}

.detail-row {
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.detail-label {
  font-weight: 500;
  color: #C1902D;
  width: 150px;
  flex-shrink: 0;
}

.detail-value {
  color: #ccc;
  flex-grow: 1;
}

@media (max-width: 1200px) {
  .client-table-container {
    overflow-x: auto;
  }
  
  .client-table {
    min-width: 1000px;
  }
}

@media (max-width: 768px) {
  .booking-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .status-filters {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .status-filter-btn {
    white-space: nowrap;
  }
  
  .detail-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .detail-label {
    width: 100%;
  }
}

input[type="datetime-local"] {
  width: 100%;
  padding: 0.75rem 1rem;
  background: black;
  border: 1px solid #C1902D;
  color: whitesmoke;
  border-radius: 4px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .booking-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .status-filters {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .status-filter-btn {
    white-space: nowrap;
  }
}

.booking-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 768px) {
  .customer-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .search-container {
    width: 90%;
  }
  
  .client-table th, 
  .client-table td {
    padding: 0.75rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
}
</style>
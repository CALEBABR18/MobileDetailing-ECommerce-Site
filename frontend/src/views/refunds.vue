<template>
  <div class="customers-page">
    <div class="luxury-header">
      <h2>REFUNDS</h2>
      <p>Manage refund requests for your premium services</p>
    </div>

    <div class="customer-actions">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search refunds..." 
          class="search-input"
        >
        <svg class="search-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
      <button class="add-client-btn" @click="openRefundModal">
        <svg viewBox="0 0 24 24" class="add-icon">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        ISSUE REFUND
      </button>
    </div>

    <div class="client-table-container">
      <table class="client-table">
        <thead>
          <tr>
            <th class="text-left">PAYMENT ID</th>
            <th class="text-left">AMOUNT</th>
            <th class="text-left">REASON</th>
            <th class="text-left">DATE ISSUED</th>
            <th class="text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="refund in filteredRefunds" :key="refund.id">
            <td>{{ refund.paymentId }}</td>
            <td>R{{ refund.amount.toFixed(2) }}</td>
            <td>{{ refund.reason }}</td>
            <td>{{ formatDate(refund.dateIssued) }}</td>
            <td class="actions-cell">
              <button class="action-btn view-btn" @click="viewRefund(refund)">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
              <button class="action-btn delete-btn" @click="confirmDelete(refund)">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="!filteredRefunds.length">
            <td colspan="5" class="no-results">
              No refunds found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Issue Refund Modal -->
    <div class="modal-overlay" v-if="showRefundModal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">✕</button>
        <h3>ISSUE NEW REFUND</h3>
        
        <div class="form-group">
          <label>Payment ID</label>
          <input type="text" v-model="currentRefund.paymentId" placeholder="PAY-123456">
        </div>
        
        <div class="form-group">
          <label>Amount (R)</label>
          <input type="number" v-model="currentRefund.amount" placeholder="0.00" step="0.01" min="0">
        </div>
        
        <div class="form-group">
          <label>Reason</label>
          <select v-model="currentRefund.reason" class="refund-select">
            <option value="" disabled>Select a reason</option>
            <option value="Service not performed">Service not performed</option>
            <option value="Customer dissatisfaction">Customer dissatisfaction</option>
            <option value="Cancellation">Cancellation</option>
            <option value="Overpayment">Overpayment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div class="form-group" v-if="currentRefund.reason === 'Other'">
          <label>Custom Reason</label>
          <input type="text" v-model="currentRefund.customReason" placeholder="Please specify...">
        </div>
        
        <div class="form-actions">
          <button class="cancel-btn" @click="closeModal">CANCEL</button>
          <button class="confirm-btn" @click="processRefund">
            PROCESS REFUND
          </button>
        </div>
      </div>
    </div>

    <!-- View Refund Modal -->
    <div class="modal-overlay" v-if="showViewModal" @click.self="closeViewModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeViewModal">✕</button>
        <h3>REFUND DETAILS</h3>
        
        <div class="refund-details">
          <div class="detail-row">
            <span class="detail-label">Payment ID:</span>
            <span class="detail-value">{{ viewingRefund.paymentId }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Amount:</span>
            <span class="detail-value">R{{ viewingRefund.amount.toFixed(2) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Reason:</span>
            <span class="detail-value">{{ viewingRefund.reason === 'Other' ? viewingRefund.customReason : viewingRefund.reason }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date Issued:</span>
            <span class="detail-value">{{ formatDate(viewingRefund.dateIssued) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value">{{ viewingRefund.status }}</span>
          </div>
        </div>
        
        <div class="form-actions">
          <button class="cancel-btn" @click="closeViewModal">CLOSE</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal-overlay" v-if="showDeleteModal" @click.self="cancelDelete">
      <div class="modal-content delete-modal">
        <h3>CONFIRM DELETION</h3>
        <p>Are you sure you want to delete the refund for Payment ID: {{ refundToDelete?.paymentId }}?</p>
        <div class="form-actions">
          <button class="cancel-btn" @click="cancelDelete">CANCEL</button>
          <button class="delete-confirm-btn" @click="deleteRefund">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const refunds = ref([]);
// Fetch refunds from backend on mount
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/refunds/my', { withCredentials: true });
    refunds.value = res.data.map(r => ({
      ...r,
      dateIssued: r.createdAt ? new Date(r.createdAt) : new Date(),
    }));
  } catch (err) {
    console.error('Failed to fetch refunds:', err);
  }
});

const searchQuery = ref('');
const showRefundModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const currentRefund = ref({ 
  id: null, 
  paymentId: '', 
  amount: 0, 
  reason: '', 
  customReason: '',
  dateIssued: new Date(),
  status: 'Pending'
});
const viewingRefund = ref(null);
const refundToDelete = ref(null);

const filteredRefunds = computed(() => {
  if (!searchQuery.value) return refunds.value;
  const query = searchQuery.value.toLowerCase();
  return refunds.value.filter(refund => 
    refund.paymentId.toLowerCase().includes(query) ||
    refund.reason.toLowerCase().includes(query) ||
    (refund.customReason && refund.customReason.toLowerCase().includes(query)) ||
    refund.status.toLowerCase().includes(query)
  );
});

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function openRefundModal() {
  currentRefund.value = { 
    id: null, 
    paymentId: '', 
    amount: 0, 
    reason: '', 
    customReason: '',
    dateIssued: new Date(),
    status: 'Pending'
  };
  showRefundModal.value = true;
}

async function processRefund() {
  if (currentRefund.value.reason === '') {
    alert('Please select a reason for the refund');
    return;
  }
  try {
    // You may need to map paymentId to bookingId in your real app
    const payload = {
      bookingId: Number(currentRefund.value.paymentId.replace(/\D/g, '')) || 1, // Example mapping
      amount: currentRefund.value.amount,
      reason: currentRefund.value.reason === 'Other' ? currentRefund.value.customReason : currentRefund.value.reason
    };
    const res = await axios.post('http://localhost:5000/api/refunds', payload, { withCredentials: true });
    // Add new refund to list
    refunds.value.push({
      id: res.data.refundId,
      paymentId: currentRefund.value.paymentId,
      amount: currentRefund.value.amount,
      reason: payload.reason,
      dateIssued: new Date(),
      status: 'Pending'
    });
    closeModal();
  } catch (err) {
    alert('Failed to process refund.');
    console.error(err);
  }
}

function viewRefund(refund) {
  viewingRefund.value = { ...refund };
  showViewModal.value = true;
}

function confirmDelete(refund) {
  refundToDelete.value = refund;
  showDeleteModal.value = true;
}

function cancelDelete() {
  refundToDelete.value = null;
  showDeleteModal.value = false;
}

function deleteRefund() {
  refunds.value = refunds.value.filter(r => r.id !== refundToDelete.value.id);
  cancelDelete();
}

function closeModal() {
  showRefundModal.value = false;
}

function closeViewModal() {
  showViewModal.value = false;
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
  max-width: 500px;
  padding: 2rem;
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
/* Adding a few additional styles for the refunds page */

.refund-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: black;
  border: 1px solid #C1902D;
  color: whitesmoke;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.refund-select:focus {
  outline: none;
  border-color: #C1902D;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.refund-details {
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
  width: 120px;
  flex-shrink: 0;
}

.detail-value {
  color: #ccc;
  flex-grow: 1;
}

.view-btn {
  background: rgba(54, 162, 235, 0.1);
  fill: #36a2eb;
}

.view-btn:hover {
  background: rgba(54, 162, 235, 0.2);
}
</style>
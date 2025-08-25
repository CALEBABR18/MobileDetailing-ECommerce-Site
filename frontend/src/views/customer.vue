<template>
  <div class="customers-page">
    <div class="luxury-header">
      <h2>CLIENT REGISTRY</h2>
      <p>Manage your valued clientele with discretion</p>
    </div>

    <div class="customer-actions">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search clients..." 
          class="search-input"
        >
        <svg class="search-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
      <button class="add-client-btn" @click="openAddModal">
        <svg viewBox="0 0 24 24" class="add-icon">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        NEW CLIENT
      </button>
    </div>

    <div class="client-table-container">
      <table class="client-table">
        <thead>
          <tr>
            <th class="text-left">NAME</th>
            <th class="text-left">EMAIL</th>
            <th class="text-left">PHONE</th>
            <th class="text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in filteredClients" :key="client.id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td class="actions-cell">
              <button class="action-btn edit-btn" @click="editClient(client)">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button class="action-btn delete-btn" @click="confirmDelete(client)">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="!filteredClients.length">
            <td colspan="4" class="no-results">
              No clients found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Client Modal -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">✕</button>
        <h3>{{ isEditing ? 'EDIT CLIENT' : 'ADD NEW CLIENT' }}</h3>
        
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" v-model="currentClient.name" placeholder="James Bond">
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="currentClient.email" placeholder="james@example.com">
        </div>
        
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" v-model="currentClient.phone" placeholder="+27 12 345 6789">
        </div>
        
        <div class="form-actions">
          <button class="cancel-btn" @click="closeModal">CANCEL</button>
          <button class="confirm-btn" @click="saveClient">
            {{ isEditing ? 'UPDATE' : 'SAVE' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal-overlay" v-if="showDeleteModal" @click.self="cancelDelete">
      <div class="modal-content delete-modal">
        <h3>CONFIRM DELETION</h3>
        <p>Are you sure you want to remove {{ clientToDelete?.name }} from your client registry?</p>
        <div class="form-actions">
          <button class="cancel-btn" @click="cancelDelete">CANCEL</button>
          <button class="delete-confirm-btn" @click="deleteClient">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const clients = ref([
  { id: 1, name: 'Zaaidah Abrahams', email: 'Zada@gmail.com', phone: '+27 81 475 8797' },
  { id: 2, name: 'Caleb Abrahams', email: 'caleb@gmail.com', phone: '+27 73 987 6543' },
  { id: 3, name: 'Lukho ', email: 'lukho@gmail.com', phone: '+27 63 456 7890' },
  { id: 3, name: 'Raeesa Samaai ', email: 'raeesa@gmail.com', phone: '+27 32 456 7890' }
]);

const searchQuery = ref('');
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const currentClient = ref({ id: null, name: '', email: '', phone: '' });
const clientToDelete = ref(null);

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value;
  const query = searchQuery.value.toLowerCase();
  return clients.value.filter(client => 
    client.name.toLowerCase().includes(query) ||
    client.email.toLowerCase().includes(query) ||
    client.phone.toLowerCase().includes(query)
  );
});

function openAddModal() {
  currentClient.value = { id: null, name: '', email: '', phone: '' };
  isEditing.value = false;
  showModal.value = true;
}

function editClient(client) {
  currentClient.value = { ...client };
  isEditing.value = true;
  showModal.value = true;
}

function saveClient() {
  if (isEditing.value) {
    const index = clients.value.findIndex(c => c.id === currentClient.value.id);
    if (index !== -1) {
      clients.value[index] = { ...currentClient.value };
    }
  } else {
    const newId = Math.max(...clients.value.map(c => c.id), 0) + 1;
    clients.value.push({ ...currentClient.value, id: newId });
  }
  closeModal();
}

function confirmDelete(client) {
  clientToDelete.value = client;
  showDeleteModal.value = true;
}

function cancelDelete() {
  clientToDelete.value = null;
  showDeleteModal.value = false;
}

function deleteClient() {
  clients.value = clients.value.filter(c => c.id !== clientToDelete.value.id);
  cancelDelete();
}

function closeModal() {
  showModal.value = false;
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
</style>
<template>
  <NuxtLayout name="admin">
    <div class="p-4 bg-white shadow-md rounded-lg">
      <!-- Search bar and buttons -->
      <div class="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
        <!-- Search Input -->
        <div class="w-full sm:w-1/2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search loan applications..."
            class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500 transition"
          />
        </div>
        <!-- Buttons for Create and View -->
        <div class="flex space-x-2">
          <button
            @click="createLoanApplication"
            class="button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Create Loan Application
          </button>
          <button
            @click="viewLoanApplication"
            class="button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            View Loan Application
          </button>
        </div>
      </div>

      <!-- Table for displaying loan applications -->
      <div class="overflow-x-auto max-h-[30rem] overflow-y-auto rounded-lg border border-gray-200">
        <div v-if="state.isTableLoading" class="p-4">
          <p>Loading loan applications...</p>
        </div>

        <table v-else-if="state.loanApp.length > 0" class="w-full text-sm">
          <thead class="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th v-for="(header, index) in state.columnHeaders" :key="index" class="py-2 px-4 border-b border-gray-300 text-left">
                {{ header.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(loanApp, index) in filteredLoanApps()" :key="index" class="hover:bg-gray-50 transition">
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Customer.family_name }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Customer.first_name }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Customer.middle_name }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.datetime_prepared }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.document_status_description }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.loan_application_no }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.amount_loan }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.factor_rate_value }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.amount_interest }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.amount_paid }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.datetime_approved }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.datetime_rejected }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.approved_by_user }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.rejected_by_user }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.prepared_by_user }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.released_by_user }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.last_modified_by_user }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ loanApp.Loan_Application.notes }}</td>
            </tr>
          </tbody>
        </table>

        <div v-else class="p-4">
          <p>No loan applications available.</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref, reactive, onMounted } from 'vue'
import { apiService } from '~/routes/api/API'
import { loanApplicationService } from '~/models/LoanApplication'
import { PageNameService } from '~/models/PageName';

const state = reactive({
  columnHeaders: [
    { name: 'Family Name' },
    { name: 'First Name' },
    { name: 'Middle Name' },
    { name: 'Date Time Prepared' },
    { name: 'Status' },
    { name: 'Loan Application No' },
    { name: 'Amount Loan' },
    { name: 'Factor Rate' },
    { name: 'Amount Interest' },
    { name: 'Amount Paid' },
    { name: 'Date Time Approved' },
    { name: 'Date Time Rejected' },
    { name: 'Approved by' },
    { name: 'Rejected by' },
    { name: 'Prepared by' },
    { name: 'Released by' },
    { name: 'Last modified by' },
    { name: 'Notes' },
  ],
  error: null,
  isTableLoading: false,
  loanApp: [],
  searchQuery: '',
})

let selectedLoanAppID = ref(null); // Track selected loan application ID
const searchQuery = ref(''); // Search query state

// Fetch loan applications
async function fetchLoanApplication() {
  state.isTableLoading = true
  state.error = null
try {
    const response = await apiService.getLoanApplication({})
    state.loanApp = response.data
    debugger
    console.log( 'Hello: ',state.loanApp);
  } catch (error: any) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
  state.isTableLoading = false
}

// Filter loan applications based on search query
function filteredLoanApps() {
  if (!searchQuery.value) {
    return state.loanApp;
  }
  const query = searchQuery.value.toLowerCase();
const searchTerms = query.split(' ').map(term => term.trim()).filter(term => term); // Split query by spaces

return state.loanApp.filter(loanApp =>
  searchTerms.every(term =>
    // Check loanApp.Loan_Application
    Object.values(loanApp.Loan_Application).some(value =>
      String(value).toLowerCase().includes(term)
    ) ||
    // Check loanApp.Customer
    loanApp.Customer && Object.values(loanApp.Customer).some(value =>
      String(value).toLowerCase().includes(term)
    )
  )
);

}

// Navigate to create loan application page
function createLoanApplication() {
  navigateTo('/loan_applications/create');
}

// Navigate to view loan application page
function viewLoanApplication() {
  if (selectedLoanAppID.value) {
      loanApplicationService.id = selectedLoanAppID.value;
    }
    navigateTo(`/loan_applications/view`);
}

// Fetch loan applications when component mounts
onMounted(() => {
    PageNameService.pageName = 'Loan Applications'
  fetchLoanApplication();
});
</script>

<style scoped>
/* Custom table styling for border and padding */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.button {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: #116f6f; /* Tailwind color teal-800 */
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.button:hover .icon {
  transform: translate(4px);
}

.button:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.button::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}
</style>

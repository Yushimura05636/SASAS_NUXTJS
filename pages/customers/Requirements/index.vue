<template>
    <NuxtLayout name="admin">
      <div class="p-6 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
        <!-- Header -->
        <div class="text-2xl font-bold mb-4 text-gray-800">Customer Requirements</div>

        <!-- Action Bar -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <!-- Button on the left -->
          <div class="flex space-x-2 justify-center md:justify-start">
            <button
              @click="viewSelected"
              :disabled="!selectedId"
              class="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition disabled:opacity-50"
            >
              View
            </button>
          </div>

          <!-- Search Input on the right -->
          <div class="w-full md:w-1/2 relative">
            <input
              v-model="searchQuery"
              placeholder="Search customers..."
              class="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-teal-500 focus:outline-none"
              type="text"
            />
            <span class="absolute right-4 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
          <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead class="bg-teal-600 text-white uppercase text-sm">
              <tr>
                <th class="px-6 py-4 border-b text-left">Select</th>
                <th class="px-6 py-4 border-b text-left">Name</th>
                <th class="px-6 py-4 border-b text-left">Requirements</th>
                <th class="px-6 py-4 border-b text-left">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loading State -->
              <tr v-if="isLoading">
                <td colspan="4" class="text-center py-4 text-gray-500">Loading...</td>
              </tr>

              <!-- No Data State -->
              <tr v-else-if="filteredTableItems.length === 0">
                <td colspan="4" class="text-center py-4 text-gray-500">No data</td>
              </tr>

              <!-- Data Rows -->
              <tr
                v-else
                v-for="item in filteredTableItems"
                :key="item.customerId"
                class="hover:bg-teal-50 transition duration-150"
              >
                <td class="px-6 py-4 border-b text-center">
                  <input type="radio" :value="item.customerId" v-model="selectedId" class="form-radio h-5 w-5 text-teal-600" />
                </td>
                <td class="px-6 py-4 border-b">{{ item.name }}</td>
                <td class="px-6 py-4 border-b">{{ item.requirementsStatus }}</td>
                <td class="px-6 py-4 border-b">{{ item.expiryDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal for viewing customer details -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg w-full max-w-2xl">
          <h2 class="text-xl font-bold mb-4">Customer Details</h2>
          <div v-if="selectedCustomer" class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead class="bg-teal-600 text-white uppercase text-sm">
                <tr>
                  <th class="px-6 py-3 text-left">Field</th>
                  <th class="px-6 py-3 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-teal-50">
                  <td class="px-6 py-4 border-b font-semibold">Name</td>
                  <td class="px-6 py-4 border-b">{{ selectedCustomer.name }}</td>
                </tr>
                <tr class="hover:bg-teal-50">
                  <td class="px-6 py-4 border-b font-semibold">Requirements Status</td>
                  <td class="px-6 py-4 border-b">{{ selectedCustomer.requirementsStatus }}</td>
                </tr>
                <tr class="hover:bg-teal-50">
                  <td class="px-6 py-4 border-b font-semibold">Expiry Date</td>
                  <td class="px-6 py-4 border-b">{{ selectedCustomer.expiryDate }}</td>
                </tr>
                <tr class="hover:bg-teal-50">
                  <td class="px-6 py-4 border-b font-semibold">Submitted Documents</td>
                  <td class="px-6 py-4 border-b">
                    <ul class="list-disc pl-5">
                      <li v-for="doc in selectedCustomer.submittedDocuments" :key="doc">{{ doc }}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 flex justify-end">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>

  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  const searchQuery = ref<string>('');
  const tableItems = ref<TableItem[]>([]);
  const isLoading = ref(true);
  const selectedId = ref<string | null>(null);
  const isModalOpen = ref(false);

  interface TableItem {
    customerId: string;
    name: string;
    requirementsStatus: string;
    expiryDate: string;
    submittedDocuments: string[];
  }

  const filteredTableItems = computed(() => {
    return tableItems.value.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.requirementsStatus.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const selectedCustomer = computed(() => {
    return tableItems.value.find(item => item.customerId === selectedId.value);
  });

  onMounted(async () => {
    await fetchCustomers();
    isLoading.value = false;
  });

  async function fetchCustomers() {
    try {
      isLoading.value = true;
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      tableItems.value = [
        {
          customerId: '1',
          name: 'Juan Dela Cruz',
          requirementsStatus: 'Complete',
          expiryDate: '2025-12-31',
          submittedDocuments: ['Government ID', 'Birth Certificate', 'Police Clearance']
        },
        {
          customerId: '2',
          name: 'Maria Santos',
          requirementsStatus: 'Partial',
          expiryDate: '2024-06-30',
          submittedDocuments: ['Government ID', 'Birth Certificate']
        },
        {
          customerId: '3',
          name: 'Pedro Reyes',
          requirementsStatus: 'Partial',
          expiryDate: '2023-09-15',
          submittedDocuments: ['Government ID', 'Police Clearance']
        },
      ];
    } catch (error: any) {
      toast.error(`${error.message}`, { autoClose: 3000 });
    } finally {
      isLoading.value = false;
    }
  }

  function viewSelected() {
    if (selectedId.value) {
      isModalOpen.value = true;
    } else {
      toast.error('Please select a customer to view', { autoClose: 3000 });
    }
  }

  function closeModal() {
    isModalOpen.value = false;
  }
  </script>

  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .flex {
    display: flex;
  }

  .space-x-2 > * + * {
    margin-left: 0.5rem;
  }

  button:disabled {
    cursor: not-allowed;
  }
  </style>

<template>
    <NuxtLayout name="admin">
      <div class="p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-16">
        <!-- Top Action Bar -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <!-- Action Buttons -->
          <div class="flex space-x-4 justify-center md:justify-start">
            <button
              class="px-5 py-2 button text-white font-medium rounded-full shadow hover:bg-green-500 transition duration-200"
              @click="createFee"
            >
              Create
            </button>
            <button
              class="px-5 py-2 bg-teal-600 text-white font-medium rounded-full shadow hover:bg-teal-500 transition duration-200"
              v-if="selectedFeeID"
              @click="updateFee"
            >
              Modify
            </button>
          </div>

          <!-- Search Bar -->
          <div class="relative flex-grow w-full md:w-auto max-w-xs">
            <input
              type="text"
              placeholder="Search fees"
              v-model="state.searchQuery"
              class="w-full border border-gray-300 rounded-full px-5 py-2 pr-12 shadow-sm focus:outline-none focus:border-blue-500 transition duration-200"
            />
            <button class="absolute right-4 top-2 text-blue-500 hover:text-blue-700">Search</button>
          </div>
        </div>

        <!-- Fees Table -->
        <div class="overflow-x-auto">
          <Table
            class="w-full"
            :columnHeaders="state.columnHeaders"
            :data="state.fee"
            :isLoading="state.isTableLoading"
            :sortData="state.sortData"
          >
            <template #body v-if="!(state.isTableLoading || (state.fee?.data === 0))">
              <tr v-for="(fee, index) in state.fee?.data" :key="index" class="hover:bg-gray-50 transition">
                <td class="py-2 px-4 border-b border-gray-300">
                  <input type="radio" :value="fee.id" v-model="selectedFeeID" class="cursor-pointer" />
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ fee.description }}</span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ fee.amount }}</span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ fee.isactive }}</span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ fee.notes }}</span>
                </td>
              </tr>
              <tr v-if="state.fee.length === 0">
                <td colspan="5" class="text-center py-6 text-gray-500">No fees found</td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </NuxtLayout>
  </template>

  <script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import { ref, reactive, onMounted } from 'vue';
  import { apiService } from '~/routes/api/API';
  import { feeService } from '~/models/Fee';
import { PageNameService } from '~/models/PageName';

  const state = reactive({
    columnHeaders: [
      { name: 'Select' },
      { name: 'Description' },
      { name: 'Amount' },
      { name: 'Is Active' },
      { name: 'Notes' }
    ],
    error: null,
    isTableLoading: false,
    sortData: {
      sortField: 'id',
      sortOrder: 'descend',
    },
    fee: [],
    searchQuery: '',
  });

  let selectedFeeID = ref(null);

  async function fetchFee() {
    state.isTableLoading = true;
    state.error = null;
    try {
      const response = await apiService.getFee({});
      state.fee = response;
    } catch (error: any) {
      toast.error(`${error}`, { autoClose: 5000 });
    }
    state.isTableLoading = false;
  }

  onMounted(() => {
    PageNameService.pageName = 'Fees';
    fetchFee();
  });

  async function updateFee() {
    try {
      if (selectedFeeID.value) {
        const fee = state.fee.data.find(f => f.id === selectedFeeID.value);
        feeService.id = fee.id;
        feeService.amount = fee.amount;
        feeService.description = fee.description;
        feeService.isActive = fee.isactive;
        feeService.notes = fee.notes;

        navigateTo('Fees/update');
      } else {
        alert("Please select a fee to modify.");
      }
    } catch (error) {
      toast.error(`${error}`, { autoClose: 5000 });
    }
  }

  async function createFee() {
    try {
      await apiService.authFeesCreate({});
      navigateTo('Fees/create');
    } catch (error) {
      toast.error(`${error}`, { autoClose: 5000 });
    }
  }
  </script>

<style>
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
<template>
    <NuxtLayout name="admin">
      <div class="p-4">
        <div class="max-w-screen-xl mx-auto px-4 md:px-8">
          <div class="font-bold text-lg">Payment Duration</div>

          <!-- Action Buttons and Search Bar -->
          <div class="flex flex-col md:flex-row md:justify-between items-center mb-8 mt-8 space-y-4 md:space-y-0">
            <!-- Left: Action Buttons -->
            <div class="flex space-x-4 justify-center md:justify-start">
              <button
                class="px-4 py-2 text-white button rounded-lg hover:bg-green-600 transition"
                @click="createPaymentFrequency"
              >
                Create
              </button>
              <button
                class="px-4 py-2 text-white button rounded-lg hover:bg-blue-600 transition"
                v-if="selectedDurationID"
                @click="updateDuration"
              >
                Modify
              </button>
              <button
                class="px-4 py-2 text-white button rounded-lg hover:bg-red-600 transition"
                v-if="selectedDurationID"
              >
                Delete
              </button>
            </div>

            <!-- Right: Search Bar -->
            <div class="flex w-full md:w-auto items-center space-x-2">
              <input
                type="text"
                placeholder="Search"
                v-model="state.searchQuery"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button class="px-4 py-2 text-white button rounded-lg hover:bg-indigo-700">
                Search
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <Table
              class="w-full"
              :columnHeaders="state.columnHeaders"
              :data="state.duration"
              :isLoading="state.isTableLoading"
              :sortData="state.sortData"
            >
              <template #body v-if="!(state.isTableLoading || (state.duration?.data === 0))">
                <tr
                  v-for="(duration, index) in state.duration?.data"
                  :key="index"
                  class="hover:bg-gray-50 transition duration-150"
                >
                  <td class="py-2 px-4 border-b border-gray-300">
                    <input
                      type="radio"
                      :value="duration.id"
                      v-model="selectedDurationID"
                      class="cursor-pointer"
                    />
                  </td>
                  <td class="py-2 px-4 border-b border-gray-300">
                    <span>{{ duration.description }} </span>
                  </td>
                  <td class="py-2 px-4 border-b border-gray-300">
                    <span>{{ duration.number_of_payments }}</span>
                  </td>
                  <td class="py-2 px-4 border-b border-gray-300">
                    <span>{{ duration.notes }}</span>
                  </td>
                </tr>
                <tr v-if="state.duration.length === 0">
                  <td colspan="4" class="text-center py-6 text-gray-500">No durations found</td>
                </tr>
              </template>
            </Table>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>

  <script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import { ref, reactive, onMounted } from 'vue';
  import { apiService } from '~/routes/api/API';
  import { paymentDurationService } from '~/models/PaymentDuration';
import { PageNameService } from '~/models/PageName';

  const state = reactive({
    columnHeaders: [
      { name: 'Select' },
      { name: 'Description' },
      { name: 'Number of Payments' },
      { name: 'Notes' }
    ],
    error: null,
    isTableLoading: false,
    sortData: {
      sortField: 'id',
      sortOrder: 'descend',
    },
    duration: [],
    searchQuery: '',
  });

  const selectedDurationID = ref(null);

  async function fetchFreqandDuration() {
    state.isTableLoading = true;
    state.error = null;
    try {
      const response = await apiService.getPaymentduration({});
      state.duration = response;
    } catch (error: any) {
      toast.error(`${error}`, { autoClose: 5000 });
    }
    state.isTableLoading = false;
    debugger
  }

  onMounted(() => {
    debugger
    PageNameService.pageName = 'Payment Durations';
    fetchFreqandDuration();
  });

  async function updateDuration() {
    try {
      const response = await apiService.authPaymentDurationsUpdate({});
      if (selectedDurationID.value) {
        let numOfPayments = null;
        let description = null;
        let notes = null;

        for (let i = 0; i < state.duration?.data.length; i++) {
          const duration = state.duration.data[i];
          if (duration.id == parseInt(selectedDurationID.value)?.toString()) {
            description = duration.description;
            numOfPayments = duration.number_of_payments;
            notes = duration.notes;
            break;
          }
        }

        paymentDurationService.id = selectedDurationID.value;
        paymentDurationService.description = description;
        paymentDurationService.number_of_payments = numOfPayments;
        paymentDurationService.notes = notes;
        navigateTo('payment_duration/update');
      }
    } catch (error) {
      toast.error(`${error}`, { autoClose: 5000 });
    }
  }

  async function createPaymentFrequency() {
    try {
      await apiService.authPaymentDurationsCreate({});
      navigateTo('payment_duration/create');
    } catch (error) {
      toast.error(`${error}`, { autoClose: 5000 });
    }
  }
  </script>

  <style scoped>
  /* Adjusts top margin for larger screens */
  .mt-16 {
    margin-top: 4rem;
  }

  /* Ensures table borders and layout */
  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  th, td {
    border-bottom: 1px solid #e2e8f0;
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

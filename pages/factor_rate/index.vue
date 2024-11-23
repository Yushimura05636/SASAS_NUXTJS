<template>
    <NuxtLayout name="admin">
      <div class="p-4">
        <div class="max-w-screen-xl mx-auto px-4 md:px-8">
          <div class="font-bold">Factor Rate</div>

          <!-- Action Buttons -->
          <div class="flex flex-col md:flex-row justify-between items-center mb-8 mt-8">
            <!-- Left: Action Buttons -->
            <div class="flex space-x-4">
              <button
                class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                @click="createFactorRate">
                Create
              </button>

              <button
                type="button"
                class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                v-if="selectedFrequencyID"
                @click="updateFactorRate">
                Modify
              </button>

              <button
                type="button"
                class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                v-if="selectedFrequencyID"
                @click="deleteFactorRate">
                Delete
              </button>
            </div>

            <!-- Right: Search Bar -->
            <div class="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Search
              </button>
            </div>
          </div>
        <div class="overflow-x-auto">
          <Table class="w-full"
            :columnHeaders="state.columnHeaders"
            :data="state.factorRate"
            :isLoading="state.isTableLoading"
            :sortData="state.sortData"
          >
            <template #body>
              <tr v-if="!(state.isTableLoading || (state.factorRate?.data === 0))"
                  v-for="(factorRate, index) in state.factorRate?.data"
                  :key="index"
                  class="">
                <td class="py-2 border-b border-gray-300">
                  <input
                    type="radio"
                    :value="factorRate.id"
                    v-model="selectedFrequencyID"
                    class="cursor-pointer"
                  />
                </td>
                <td class="py-2 border-b border-gray-300">
                  <span>{{ factorRate.payment_frequency.description }} </span>
                </td>
                <td class="py-2 border-b border-gray-300">
                  <span>{{ factorRate.payment_duration.description }}</span>
                </td>
                <td class="py-2 border-b border-gray-300">
                  <span>{{ factorRate.description }}</span>
                </td>
                <td class="py-2 border-b border-gray-300">
                  <span>{{ factorRate.value }}</span>
                </td>
                <td class="py-2 border-b border-gray-300">
                  <span>{{ factorRate.notes }}</span>
                </td>
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
  import { PermissionService } from '~/models/Permission';
  import { apiService } from '~/routes/api/API';
  import { navigateTo } from 'nuxt/app';
import { UserService } from '~/models/User';
import Permission from '../non_used_components/Permission.vue';
import { PageNameService } from '~/models/PageName';

  const state = reactive({
    columnHeaders: [
      { name: 'Select' },
      { name: 'Payment Frequency' },
      { name: 'Payment Duration' },
      { name: 'Description' },
      { name: 'Value' },
      { name: 'Notes' },
    ],
    error: null,
    isTableLoading: false,
    sortData: {
      sortField: 'id',
      sortOrder: 'descend',
    },
    factorRate: [],
    searchQuery: '',
  });

  let selectedFrequencyID = ref(null); // Track selected factor rate ID

  async function fetchFactorRate() {
    state.isTableLoading = true;
    state.error = null;
    try {
      const params = {};
      const response = await apiService.getFactorRate(params);
      state.factorRate = response;
      console.log(state.factorRate);
    } catch (error: any) {
      state.error = error;
      toast.error(`${error}`, {
        autoClose: 5000,
      })
    }

    state.isTableLoading = false;
  }

  onMounted(() => {
    PageNameService.pageName = 'Factor Rate';
    fetchFactorRate();
  });

  async function createFactorRate() {
    try {
      await apiService.authFactorRatesCreate({
      });
      navigateTo('/factor_rate/create');
    } catch (error) {
      toast.error(`${error}`, {
      autoClose: 5000,
    })
    }
  }

  async function updateFactorRate() {
    if (selectedFrequencyID.value) {
      try {
        // Use selectedFrequencyID.value to update the specific factor rate
        const response = await apiService.authFactorRatesUpdate({});

        UserService.usbl_id = parseInt(selectedFrequencyID.value);
        navigateTo(`/factor_rate/update`); // Pass the selected ID
      } catch (error) {
        toast.error(`${error}`, {
      autoClose: 5000,
    })
      }
    } else {
      alert("Please select a factor rate to modify.");
    }
  }

  // New function to handle deletion
  async function deleteFactorRate() {
    if (selectedFrequencyID.value) {
      if (confirm("Are you sure you want to delete this factor rate?")) {
        try {
          const response = await apiService.deleteFactorRate(selectedFrequencyID.value); // Replace with your API call for deletion
          alert("Factor rate deleted successfully!");
          fetchFactorRate(); // Refresh the list after deletion
        } catch (error) {
          toast.error(`${error}`, {
      autoClose: 5000,
    })
        }
      }
    } else {
      alert("Please select a factor rate to delete.");
    }
  }
  </script>

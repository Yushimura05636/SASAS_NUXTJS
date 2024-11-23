<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
      <form @submit.prevent="updateFactorRate" class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
        <div class="container mx-auto p-4">
          <div class="border-b border-gray-900/10 pb-12">
            <h1 class="text-xl font-bold leading-7 text-gray-900">Factor Rate</h1>
            <div class="mt-10 grid grid-rows-1 gap-x-6 gap-y-8 sm:grid-rows-6">
              <div class="sm:col-span-2">
                <label for="payment_frequency" class="block text-sm font-bold leading-6 text-gray-900">Payment Frequency <span class="text-red-600">*</span></label>
                <select v-model="factorRate.payment_frequency_id" id="payment_frequency" v-if="!state.isTableLoading" class="block w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-1.5 text-black">
                  <option v-for="frequency in state.frequency" :key="frequency.id"  :value="frequency.id">
                    {{ frequency.description }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-2">
                <label for="payment_duration" class="block text-sm font-bold leading-6 text-gray-900">Payment Duration <span class="text-red-600">*</span></label>
                <select v-model="factorRate.payment_duration_id" id="payment_duration" v-if="!state.isTableLoading" class="block w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-1.5">
                  <option v-for="duration in state.duration" :key="duration.id"  :value="duration.id">
                    {{ duration.description }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-2">
                <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Description <span class="text-red-600">*</span></label>
                <div class="mt-2">
                  <input v-model="factorRate.description" type="text" id="description" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="value" class="block text-sm font-bold leading-6 text-gray-900">Value<span class="text-red-600">*</span></label>
                <input v-model="factorRate.value" type="number" id="value" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
              </div>

              <div class="sm:col-span-2">
                <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Notes <span class="text-red-600">*</span></label>
                <div class="mt-2">
                  <input v-model="factorRate.notes" type="text" id="notes" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" class="text-sm font-bold leading-6 text-gray-900" @click="back">
            <a>Cancel</a>
          </button>
          <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
        </div>
      </form>
    </div>
    </NuxtLayout>
  </template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  import { ref, reactive, onMounted } from 'vue';
  import { PermissionService } from '~/models/Permission';
  import { apiService } from '~/routes/api/API';
  import { useRoute } from 'vue-router'; // Importing useRoute for route parameters
  import { navigateTo } from 'nuxt/app';
  import { UserService } from '~/models/User';




  const state = reactive({
    frequency: [],
    duration: [],
    error: "error",
    isTableLoading: true,
  });

  const factorRate = ref({
    id: 0, // Add ID to track the factor rate being updated
    payment_frequency_id: 0,
    payment_duration_id: 0,
    description: '',
    value: 0,
    notes: '',
  });

  const getIds = {
    freqId: 0,
    durId: 0,
  }

  // Fetch payment frequency and duration
  async function fetchFreqAndDura() {
    //factorRate.value.payment_duration_id
    // factorRate.value.payment_frequency_id
    try {
      const frequency = await apiService.getPaymentFrequencyNoAuth({});
      const duration = await apiService.getPaymentdurationNoAuth({});

      if (frequency && frequency.data && duration && duration.data) {
        state.frequency = frequency.data;
        state.duration = duration.data;

        debugger;
      } else {
        state.error = 'Unexpected response format.';
      }
    } catch (error) {
      state.error = 'Failed to fetch roles. Please try again.';
      toast.error(`${error}`, {
        autoClose: 5000,
      });
    } finally {
      state.isTableLoading = false;
    }
  }

  // Fetch the factor rate details for updating
  async function fetchFactorRate() {
    const route = useRoute();
    const factorRateId = route.params.id; // Assuming the ID is passed as a route parameter

    try {
      const response = await apiService.getFactorRateById({}, UserService.usbl_id); // Adjust this based on your API structure
      if (response && response.data) {
        factorRate.value = response.data;
        getIds.freqId = response.data.payment_frequency_id
        getIds.durId = response.data.payment_duration_id

        fetchFreqAndDura();// Set the factor rate details to the form
      } else {
        state.error = 'Factor rate not found.';
      }
    } catch (error) {
      state.error = 'Failed to fetch factor rate details. Please try again.';
    }
  }

  onMounted(async () => {

    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authFactorRatesUpdate({})
    state_response.value = response.message;
    fetchFactorRate(); // Fetch factor rate details on mount
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/factor_rate`)
          }, 2000);
    }
  }

  });

  // Update factor rate
  const updateFactorRate = async () => {
    try {
      const jsonObject = {
        id: factorRate.value.id, // Include the ID in the update request
        payment_frequency_id: parseInt(factorRate.value.payment_frequency_id?.toString()),
        payment_duration_id: parseInt(factorRate.value.payment_duration_id?.toString()),
        description: factorRate.value.description,
        value: parseFloat(factorRate.value.value).toFixed(8),
        notes: factorRate.value.notes,
      };

      const response = await apiService.updateFactorRate(jsonObject, jsonObject.id); // Adjust your API call here

      if (response) {
        toast.success("Factor rate updated successfully!", {
            autoClose: 2000,
            });
            // Introduce a delay before navigating
            setTimeout(() => {
                navigateTo('/factor_rate');
            }, 2000);
      }
    } catch (error) {
      toast.error('Error updating factor rate: ' + error);
      toast.error(`${error}`, {
        autoClose: 5000,
      });
    }
  };

  // Function to navigate back
  function back() {
    navigateTo('/factor_rate');
  }
  </script>

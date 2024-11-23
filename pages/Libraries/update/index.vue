<template>
  <NuxtLayout name="admin">
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-semibold mb-6 text-center">{{ (form.modeltype)?.toUpperCase() }} <br /> UPDATE FORM</h1>

        <form @submit.prevent="submitForm">

          <!-- Model Type Field -->
          <div class="mb-4">
            <label for="modeltype" class="block text-sm font-medium text-gray-700">Model Type</label>
            <input
              disabled
              v-model="form.modeltype"
              type="text"
              id="modeltype"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Model Type"
            />
          </div>

          <div class="mb-4">
            <label for="olddescription" class="block text-sm font-medium text-gray-700">Old Description</label>
            <input
              disabled
              v-model="form.olddescription"
              type="text"
              id="olddescription"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Old Description"
            />
          </div>

          <!-- Old Collector Field -->
<div class="mb-4">
  <label for="description" class="block text-sm font-medium text-gray-700">Old Collector</label>
  <input
  disabled
    v-model="form.oldcollector"
    id="description"
    rows="4"
    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    placeholder="Enter Old Collector"
  />
</div>

          <!-- Description Field -->
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">New Description</label>
            <textarea
              v-model="form.description"
              id="description"
              rows="4"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Description"
            ></textarea>
          </div>



          <!-- Collector Selection Combobox -->
<div v-if="libraryService.modelType == 'customer_group'" class="mb-4">
  <label for="collector" class="block text-sm font-medium text-gray-700">Select Collector</label>
  <select
    v-model="selectedCollector"
    @change="fetchAndSudoData"
    id="collector"
    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select a Collector</option>
    <option v-for="collector in collectors" :key="collector.id" :value="collector.id">
      {{ collector.last_name }} {{ collector.first_name }} {{ collector.middle_name }}
    </option>
  </select>
</div>


          <!-- Submit and Cancel Buttons -->
          <div class="mt-6 flex justify-between">
            <button
              type="button"
              @click="cancel"
              class="w-full bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="w-full bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-4 p-4 text-green-700 bg-green-100 rounded-md">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref } from 'vue';

import { Library, libraryService } from '~/models/Library';
import { PermissionService } from '~/models/Permission';
import { apiService } from '~/routes/api/API';
import Collector from '~/layouts/Collector.vue';

const form = ref({
  id: libraryService.id,
  modeltype: libraryService.modelType,
  description: '',
  olddescription: libraryService.oldText,
  oldcollector: libraryService.collectorName,
});

const successMessage = ref<string | null>(null);

const collectors = ref([]);
const selectedCollector = ref();

// Function to handle form submission
const submitForm = () => {
  if (form.value.id && form.value.modeltype && form.value.description) {
    // Process form submission, e.g., send data to the backend API
    console.log('Form Data:', form.value);

    update(); // Call the renamed update function

  } else {
    // Handle empty fields (optional)
    successMessage.value = 'Please fill in all the fields.';
  }
};

async function update() { // Renamed from create to update
  try {
    const params = {
      id: form.value.id,
      modeltype: form.value.modeltype,
      description: form.value.description,
      collector_id: selectedCollector.value ?? null,
    };
    const response = await apiService.update(params, parseInt(form.value.id));
    if (response.data) {

      toast.success("Edit successfully!", {
          autoClose: 2000,
      });
      // Introduce a delay before navigating
      setTimeout(() => {
          navigateTo('/libraries');
      }, 2000);
    }
  } catch (error: any) {
    toast.error(`${error}`, {
        autoClose: 3000,
    });
  }
}

// Function to handle cancel action
const cancel = () => {
  // Navigate to the libraries page or perform any other action
  navigateTo("/libraries");
};

// Fetch collectors from API
const fetchCollectors = async () => {
  try {
    const response = await apiService.get({}, 'collectors'); // Adjust API endpoint as necessary
    collectors.value = response.data;
  } catch (error) {
    console.error('Error fetching collectors:', error);
  }
};

async function fetchUserCollector()
{
    if(libraryService.modelType?.length > 0 && libraryService.modelType == 'customer_group')
    {
        const response = await apiService.getOnlyCollectorPermissionNoAUTH({});
        collectors.value = response.data;
        debugger
        selectedCollector.value = libraryService.collectorId;

        console.log(collectors.value)
    }
}

onMounted(async () => {

  //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authLibrariesUpdate({})
    state_response.value = response.message;
    fetchUserCollector()
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/libraries`)
          }, 2000);
    }
  }
});
</script>

<style scoped>
/* You can add custom styles here, or rely on TailwindCSS for design */
</style>

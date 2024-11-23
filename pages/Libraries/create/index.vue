<template>
  <NuxtLayout name="admin">
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-semibold mb-6 text-center">Create Form</h1>

      <form @submit.prevent="submitForm">

        <!-- Model Type Field -->
        <div class="mb-4">
          <label for="modeltype" class="block text-sm font-medium text-gray-700">Model Type</label>
          <select
            v-model="form.modeltype"
            @change="fetchUserCollector"
            id="modeltype"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select Model Type</option>
            <option v-for="type in modelTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <!-- Description Field -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="form.description"
            id="description"
            rows="4"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Description"
          ></textarea>
        </div>

        <!-- Collector Selection Combobox -->
<div v-if="form.modeltype == 'customer_group'" class="mb-4">
  <label for="collector" class="block text-sm font-medium text-gray-700">Select Collector</label>
  <select
    v-model="selectedCollector"
    id="collector"
    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select a Collector</option>
    <option v-for="collector in collectors" :key="collector.id" :value="collector.id">
      {{ collector.last_name }} {{ collector.first_name }} {{ collector.middle_name }}
    </option>
  </select>
</div>

        <!-- Buttons -->
        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="cancel"
            class="w-1/2 bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="w-1/2 ml-2 bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
import { apiService } from '~/routes/api/API';
import { libraryService } from '~/models/Library';
import { PermissionService } from '~/models/Permission';

const selectedCollector = ref();
const collectors = ref([]);

const modelTypes = [
  'barangay',
  'branch',
  'city',
  'civil_status',
  'gender_map',
  'country',
  'province',
  'credit_status',
  'personality_status_map',
  'user_account_status',
  'document_map',
  'document_permission_map',
  'name_type',
  'customer_group',
];

const form = ref({
  id: '',
  modeltype: '', // Initialize with empty string for combo box
  description: '',
});

const successMessage = ref<string | null>(null);

// Function to handle form submission
const submitForm = () => {
  if (form.value.modeltype && form.value.description) {
    try {
      // Process form submission, e.g., send data to the backend API
      console.log('Form Data:', form.value);

      create();
      
      localStorage.setItem("_modeltype", form.value.modeltype);
      
      // Introduce a delay before navigating
      setTimeout(() => {
          navigateTo('/libraries');
      }, 2000);


    } catch (error: any) {
      toast.error(`${error}`, {
      autoClose: 5000,
    })
    }
  } else {
    // Handle empty fields (optional)
    successMessage.value = 'Please fill in all the fields.';
  }
};

async function create() {
  try {
    const params = {
      modeltype: form.value.modeltype.toLowerCase(),
      description: form.value.description,
      collector_id: selectedCollector.value,
    };
    debugger
    const response = await apiService.create(params);
    if (response.data) {

      toast.success("Created successfully!", {
          autoClose: 2000,
      });
    }
  } catch (error: any) {
    toast.error(`${error}`, {
        autoClose: 3000,
    });
  }
}

async function fetchUserCollector()
{
    if(form.value.modeltype?.length > 0 && form.value.modeltype == 'customer_group')
    {
        const response = await apiService.getOnlyCollectorPermissionNoAUTH({});
        collectors.value = response.data;
        console.log(collectors.value)

        debugger
    }
}

onMounted(async () => {

  //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authLibrariesCreate({})
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

const cancel = () => {
  // Logic to handle cancellation
  navigateTo('/libraries'); // Redirect to libraries or any other page
};
</script>

<style scoped>
/* You can add custom styles here, or rely on TailwindCSS for design */
</style>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-semibold mb-6 text-center">Delete Form</h1>

      <form @submit.prevent="submitForm">
        <!-- ID Field -->
        <div class="mb-4">
          <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
          <input
            v-model="form.id"
            type="text"
            id="id"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter ID"
          />
        </div>

        <!-- Model Type Field -->
        <div class="mb-4">
          <label for="modeltype" class="block text-sm font-medium text-gray-700">Model Type</label>
          <input
            v-model="form.modeltype"
            type="text"
            id="modeltype"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Model Type"
          />
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref } from 'vue';
import { apiService } from '~/routes/api/API'

const form = ref({
  id: '',
  modeltype: '',
  description: ''
});

const successMessage = ref<string | null>(null);

// Function to handle form submission
const submitForm = () => {
  if (form.value.id && form.value.modeltype) {
    // Process form submission, e.g., send data to the backend API
    console.log('Form Data:', form.value);

    create();

    // Clear the form
    form.value.id = '';
    form.value.modeltype = '';
    form.value.description = '';
  } else {
    // Handle empty fields (optional)
    successMessage.value = 'Please fill in all the fields.';
  }
};

async function create()
{
  try {
          const params = {
              modeltype: form.value.modeltype,
          }
          const response = await apiService.libraryDelete(params, parseInt(form.value.id));
          if (response.data) {
              alert("delete successfully!");
          }
      } catch (error: any) {
          toast.error(`${error}`, {
            autoClose: 3000,
          })
      }
}

</script>

<style scoped>
/* You can add custom styles here, or rely on TailwindCSS for design */
</style>

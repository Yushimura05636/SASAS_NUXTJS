<template>
    <div class="container mx-auto py-10 px-4 max-w-lg">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Update Requirement</h2>
      <form @submit.prevent="updateRequirement" class="bg-white p-6 rounded-lg shadow-lg">
        <div class="form-control mb-5">
          <label for="description" class="block text-gray-700 font-semibold mb-2">Description:</label>
          <input 
            id="description"
            v-model="form.description" 
            type="text" 
            placeholder="Enter description"
            class="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" 
            required 
          />
        </div>
        <div class="form-control mb-5">
          <label for="isActive" class="block text-gray-700 font-semibold mb-2">Is Active:</label>
          <select 
            id="isActive" 
            v-model="form.isActive" 
            class="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          >
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div class="flex justify-between items-center">
          <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
            Update
          </button>
          <nuxt-link to="/requirements" class="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300">
            Cancel
          </nuxt-link>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
import { apiService } from '~/routes/api/API';
  
  const router = useRouter()
  const route = useRoute()
  
  // Form state
  const form = ref({
    description: '',
    isActive: true
  })
  
  // Fetch the selected requirement based on the ID
  const fetchRequirement = (id: number) => {
    // Simulate fetching the requirement data (you'd fetch from your backend here)
    form.value = {
      description: 'Requirement ' + id,
      isActive: id % 2 === 0
    }
  }
  
  // Update the selected requirement
  const updateRequirement = () => {
    // Here you would typically send the form data to the backend.
    // After updating, redirect to the requirements view page.
    router.push('/requirements')
  }
  
  // Fetch the data when the component is mounted
  onMounted(async () => {

    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authRequirementsUpdate({})
    state_response.value = response.message;
    const id = Number(route.params.id)
    fetchRequirement(id)
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/requriements`)
          }, 2000);
    }
  }

  })
  </script>
  
  <style scoped>
  /* Add some space around the container for better UX */
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  /* Styles for the form control */
  .form-control label {
    font-size: 1rem;
    font-weight: 500;
  }
  
  .input-bordered {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  </style>
  
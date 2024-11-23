<template>
    <div class="container mx-auto py-10 px-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-3">
          <nuxt-link to="/requirements/create" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Create</nuxt-link>
          <button @click="updateRequirement" class="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300" :disabled="!selectedId">Update</button>
          <button @click="deleteRequirement" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300" :disabled="!selectedId">Delete</button>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Search" class="input input-bordered rounded-lg py-2 px-4 w-64 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
      </div>
  
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <table class="min-w-full table-auto text-left">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-3 px-6 font-semibold text-gray-700">Select</th>
              <th class="py-3 px-6 font-semibold text-gray-700">Description</th>
              <th class="py-3 px-6 font-semibold text-gray-700">Is Active</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="requirement in filteredRequirements" :key="requirement.id" class="hover:bg-gray-50 transition duration-300">
              <td class="border-t py-4 px-6 text-center">
                <input type="radio" :value="requirement.id" v-model="selectedId" name="selectedRequirement" class="h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-2 transition duration-300" />
              </td>
              <td class="border-t py-4 px-6 text-gray-900">{{ requirement.description }}</td>
              <td class="border-t py-4 px-6 text-center">
                <span :class="requirement.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'" class="px-3 py-1 rounded-full text-sm">
                  {{ requirement.isActive ? 'Yes' : 'No' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  const requirements = ref([
    { id: 1, description: 'Requirement 1', isActive: true },
    { id: 2, description: 'Requirement 2', isActive: false },
    // More sample data
  ])
  
  const searchQuery = ref('')
  const selectedId = ref<number | null>(null)
  
  // Computed filtered requirements based on search query
  const filteredRequirements = computed(() => {
    return requirements.value.filter(r =>
      r.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  // Delete a requirement
  const deleteRequirement = () => {
    const index = requirements.value.findIndex(r => r.id === selectedId.value)
    if (index !== -1) {
      requirements.value.splice(index, 1)
      selectedId.value = null
    }
  }
  
  const updateRequirement = () => {
    // Simulate updating
    console.log("Selected Requirement ID to update:", selectedId.value);
  }
  </script>
  
  <style scoped>
  /* Improved styling for better visuals */
  .container {
    max-width: 800px;
  }
  table {
    width: 100%;
  }
  input[type="text"] {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  button:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
  }
  </style>
  
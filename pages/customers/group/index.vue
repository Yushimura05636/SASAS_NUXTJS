<template>
  <NuxtLayout name="admin">
    <div class="p-6 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
      <!-- Header -->
      <h1 class="text-3xl font-bold mb-6 text-teal-800">View Groups</h1>

      <!-- Action Bar -->
      <div class="flex justify-between items-center mb-6">
        <!-- Buttons on the left -->
        <div class="flex space-x-2">
          <button
            @click="createGroup"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
          >
            Create
          </button>
          <button
            @click="viewSelected"
            :disabled="!selectedGroup"
            class="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition disabled:opacity-50"
          >
            View
          </button>
        </div>

        <!-- Search Input on the right -->
        <div class="w-1/3 relative">
          <input
            v-model="searchQuery"
            placeholder="Search groups or collectors..."
            class="w-full border-2 border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
            type="text"
          />
          <span class="absolute right-3 top-2 text-teal-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-teal-50 p-4 rounded-lg shadow-md">
        <table class="min-w-full bg-white border border-teal-200 rounded-lg shadow-lg">
          <thead class="bg-teal-100 text-teal-700 uppercase text-sm">
            <tr>
              <th class="px-6 py-3 text-left">Select</th>
              <th class="px-6 py-3 text-left">Group Name</th>
              <th class="px-6 py-3 text-left">Date Time Created</th>
              <th class="px-6 py-3 text-left">Date Time Updated</th>
              <th class="px-6 py-3 text-left">Collector's Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="text-center py-4 text-teal-500">Loading...</td>
            </tr>
            <tr v-else-if="filteredGroups.length === 0">
              <td colspan="5" class="text-center py-4 text-teal-500">No groups found</td>
            </tr>
            <tr
              v-for="group in filteredGroups"
              :key="group.id"
              class="hover:bg-teal-50 transition duration-150"
            >
              <td class="px-6 py-4 border-b border-teal-100">
                <input
                  type="radio"
                  :value="group.id"
                  v-model="selectedGroup"
                  class="form-radio h-5 w-5 text-teal-600"
                />
              </td>
              <td class="px-6 py-4 border-b border-teal-100">{{ group.description }}</td>
              <td class="px-6 py-4 border-b border-teal-100">{{ group.created_at }}</td>
              <td class="px-6 py-4 border-b border-teal-100">{{ group.updated_at }}</td>
              <td class="px-6 py-4 border-b border-teal-100">
                {{ group.last_name }} {{ group.first_name }} {{ group.middle_name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { apiService } from '~/routes/api/API';

const router = useRouter();
const searchQuery = ref('');
const groups = ref([]);
const isLoading = ref(true);
const selectedGroup = ref(null);

onMounted(async () => {
  await fetchGroups();
  isLoading.value = false;
});

const fetchGroups = async () => {
  try {
    const response = await apiService.getGroupViewData({});
    debugger
    groups.value = response.map((group: any) => ({
      id: group.id,
      description: group.description,
      created_at: group.created_at,
      updated_at: group.updated_at,
      first_name: group.first_name.split(' ')[0],
      last_name: group.last_name.split(' ')[1],
      middle_name: group.middle_name.split(' ')[2],
    }));
  } catch (error) {
    toast.error(`Failed to fetch groups: ${error.message}`);
  }
};

const filteredGroups = computed(() =>
  groups.value.filter(
    (group) =>
      group.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      group.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      group.last_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const createGroup = () => router.push('/customers/group/create');
const viewSelected = () => selectedGroup.value && router.push(`/customers/group/view/?id=${selectedGroup.value}`);
const updateSelected = () => selectedGroup.value && router.push(`/customers/group/update/?id=${selectedGroup.value}`);
</script>

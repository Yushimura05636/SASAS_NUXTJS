<template>
    <NuxtLayout name="admin">
      <div class="p-6">
        <!-- Buttons and Search -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
          <!-- Action Buttons -->
          <div class="flex space-x-4 justify-center sm:justify-start">
            <button
              @click="createUser"
              class="button text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition"
            >
              Create
            </button>
            <button
              @click="updateUser"
              class="button text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition disabled:opacity-50"
              :disabled="!selectedUserId"
            >
              Modify
            </button>
          </div>

          <!-- Search Bar -->
          <div class="flex justify-center sm:justify-end w-10 sm:w-auto">
            <input
              v-model="state.searchQuery"
              type="text"
              placeholder="Search users"
              class="p-2 border border-gray-300 rounded-l-md focus:outline-none w-full sm:w-auto"
            />
            <button class="button text-white py-2 px-4 rounded-r-md">Search</button>
          </div>
        </div>

        <!-- User Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border rounded-lg">
            <thead class="bg-blue-900 text-white">
              <tr>
                <th class="p-3 text-left">Select</th>
                <th class="p-3 text-left">Full Name</th>
                <th class="p-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <tr v-for="(user, index) in filteredUsers" :key="index" class="hover:bg-gray-100">
                <td class="p-3 border-b">
                  <input type="radio" v-model="selectedUserId" :value="user.id" class="cursor-pointer" />
                </td>
                <td class="p-3 border-b">
                  {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
                </td>
                <td class="p-3 border-b">
                  {{ user.email }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </template>

  <script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import { ref, reactive, onMounted, computed } from 'vue';
  import { apiService } from '~/routes/api/API';
  import { UserService } from '~/models/User';
  import { navigateTo } from 'nuxt/app';
  import { PageNameService } from '~/models/PageName';

  const state = reactive({
    columnHeaders: [
      { name: 'Select' },
      { name: 'Full Name' },
      { name: 'Email' },
    ],
    error: null,
    isTableLoading: false,
    users: [],
    searchQuery: '',
  });

  const selectedUserId = ref<string | null>(null);

  // Method to fetch users
  async function fetchUsers() {
    state.isTableLoading = true;
    state.error = null;

    try {
      const params = {};
      const response = await apiService.getUser(params);
      debugger
      state.users = response.data;
    } catch (error: any) {
      //state.error = error;
      toast.error(`${error}`, {
        autoClose: 3000,
      });
    }
    state.isTableLoading = false;
  }

  // Create user
  async function createUser() {
    try {
      await apiService.authUserCreate({});
      navigateTo('/users/create');
    } catch (error) {
      toast.error(`${error}`, { autoClose: 5000 });
    }
  }

  // Update user
  async function updateUser() {
    if (selectedUserId.value) {
      try {
        debugger
        UserService.edit_usr_id = parseInt(selectedUserId.value);
        await apiService.authUserUpdate({});
        navigateTo(`/users/update`);
      } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
      }
    } else {
      alert('Please select a user to update.');
    }
  }

  // Delete user
  async function deleteUser() {
    if (selectedUserId.value) {
      try {
        // await apiService.authuser ({ id: selectedUserId.value });
        // toast.success("User deleted successfully.", { autoClose: 3000 });
        // fetchUsers(); // Refresh user list after deletion
      } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
      }
    } else {
      alert('Please select a user to delete.');
    }
  }

  // Compute filtered users based on multi-search
  const filteredUsers = computed(() => {
    const searchTerms = state.searchQuery
      .toLowerCase()
      .split(' ')
      .map(term => term.trim())
      .filter(term => term);

    return state.users.filter(user =>
  searchTerms.every(term =>
    // Check loanApp.Loan_Application
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(term)
    ) ||
    // Check loanApp.Customer
    user && Object.values(user).some(value =>
      String(value).toLowerCase().includes(term)
    )
  )
);
  });

  // Manage permissions (optional, if needed)
  async function managePermissions(userId: number) {
    try {
      UserService.usr_id = userId;
      await apiService.authUserUpdate({});
      navigateTo('/permission/manage');
    } catch (error: any) {
      state.error = error;
      toast.error(`${error}`, {
        autoClose: 3000,
      });
    }
  }

  // Fetch users on mounted
  onMounted(() => {
    PageNameService.pageName = 'Users';
    fetchUsers();
  });
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
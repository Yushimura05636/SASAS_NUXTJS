<template>
    <NuxtLayout name="admin">
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 class="text-2xl font-semibold mb-6 text-center">Update User</h1> <!-- Updated Heading -->
  
          <form @submit.prevent="submitForm">
            <!-- Employee ID Field as Combobox -->
            <!-- <div class="mb-4">
              <label for="employee_id" class="block text-sm font-medium text-gray-700">Employees</label>
              <select
                v-model="form.employee_id"
                id="employee_id"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>Select Employee</option>
                <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                  {{ employee.first_name }} {{ employee.middle_name }} {{ employee.family_name }}
                </option>
              </select>
            </div> -->
  
            <!-- Family Name Field -->
            <div class="mb-4">
              <label for="family_name" class="block text-sm font-medium text-gray-700">Family Name</label>
              <input
                disabled
                v-model="form.family_name"
                type="text"
                id="family_name"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Family Name"
                required
              />
            </div>
  
            <!-- First Name Field -->
            <div class="mb-4">
              <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
              <input
                disabled
                v-model="form.first_name"
                type="text"
                id="first_name"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter First Name"
                required
              />
            </div>
  
            <!-- Middle Name Field -->
            <div class="mb-4">
              <label for="middle_name" class="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                disabled
                v-model="form.middle_name"
                type="text"
                id="middle_name"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Middle Name"
                required
              />
            </div>
  
            <!-- Email Field -->
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                disabled
                v-model="form.email"
                type="email"
                id="email"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Email"
                required
              />
            </div>
  
            <!-- Password Field -->
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                v-model="form.password"
                type="password"
                id="password"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Password"
              />
            </div>
  
            <!-- Status Field -->
            <div class="mb-4">
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <select
                v-model="form.status"
                id="status"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>Select Status</option>
                <option v-for="status in statuses" :key="status.id" :value="status.id">
                  {{ status.name }}
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
                Update <!-- Updated Button Text -->
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

import { ref, onMounted, watch } from 'vue';

import { EmployeesService } from '~/models/Employee';
import { PermissionService } from '~/models/Permission';
import { UserService } from '~/models/User';
import { apiService } from '~/routes/api/API'; // Assuming you have this service

// Employee list for the dropdown
const employees = ref<{ id: string; first_name: string; family_name: string; middle_name: string; email: string, type: string }[]>([]);

// Status list for the dropdown
const statuses = ref<{ id: string; name: string }[]>([]);

// Form data state
const form = ref({
  family_name: '',
  first_name: '',
  middle_name: '',
  email: '',
  employee_id: '',
  type: '',
  password: '', // Added password field to the form state
  status: 0 // Added status field to the form state
});

// Success message state
const successMessage = ref<string | null>(null);

// Function to fetch employee IDs (from API or mock data)
const fetchEmployees = async () => {
  try {
    // Fetch employee data from API
    const response = await apiService.getUserById({}, UserService.edit_usr_id);
    const userEmail = ref('');

    // if(response.data.employee_id == null||response.data.employee_id <= 0)
    // {

    // }
    // else{const userEmail = await apiService.getEmployeeById({}, response.data.employee_id)};

    form.value.first_name = response.data.first_name;
    form.value.family_name = response.data.last_name;
    form.value.middle_name = response.data.middle_name;
    form.value.email = response.data.email;

    // Directly assign response data to employees state
    // employees.value = response.data.map((entry: any) => ({
    //   id: entry.employee.id,
    //   first_name: entry.personality.first_name,
    //   family_name: entry.personality.family_name,
    //   middle_name: entry.personality.middle_name,
    //   email: entry.personality.email_address
    // }));
  } catch (error: any) {
    console.error('Error fetching employees:', error);
  }
};

// Function to fetch user statuses from API
const fetchStatuses = async () => {
  try {
    // Fetch status data from API
    const response = await apiService.get({}, 'user_account_status'); // Ensure this API endpoint exists
    statuses.value = response.data.map((status: any) => ({
      id: status.id,
      name: status.description,
    }));
  } catch (error: any) {
    console.error('Error fetching statuses:', error);
  }
};

onMounted(async () => {

  //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authUserUpdate({})
    state_response.value = response.message;
    fetchEmployees();
    fetchStatuses(); // Fetch statuses on mount
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/users`)
          }, 2000);
    }
  }

});

// Watch for changes in selected employee_id and populate other fields
watch(
  () => form.value.employee_id,
  (newEmployeeId) => {
    if (newEmployeeId) {
      const selectedEmployee = employees.value.find((emp) => emp.id === newEmployeeId);
      if (selectedEmployee) {
        form.value.first_name = selectedEmployee.first_name;
        form.value.family_name = selectedEmployee.family_name;
        form.value.middle_name = selectedEmployee.middle_name;
        form.value.email = selectedEmployee.email;
        form.value.type = selectedEmployee.type;
      }
    }
  }
);

// Function to handle form submission
const submitForm = async () => {
    debugger;
  if (form.value.family_name && form.value.first_name && form.value.email && form.value.status) {
    try {
      debugger
      // Send the form data to the API
      const response = await apiService.updateUser({
        password: form.value.password, // Include password in the API request
        status_id: form.value.status, // Include status in the API request
        type: form.value.type,
      }, UserService.edit_usr_id);

      // Handle successful response
      if (response.data) {
        toast.success("User updated!", {
          autoClose: 2000,
          });
          // Introduce a delay before navigating
          setTimeout(() => {
              cancel();
            // navigateTo('/users');  
          }, 2000);
          // successMessage.value = 'User created successfully!';
          // Clear the form
          //  cancel(); // Call the cancel function to reset the form
          // Call the cancel function to reset the form
      }
    } catch (error: any) {
      console.error('Error updating user:', error); // Updated error log message
      successMessage.value = 'Failed to update user. Please try again.'; // Updated failure message
    }
  } else {
    // Handle empty fields
    successMessage.value = 'Please fill in all fields.';
  }
};

// Function to handle cancel action
const cancel = () => {
  // Clear form
  form.value.family_name = '';
  form.value.first_name = '';
  form.value.middle_name = '';
  form.value.email = '';
  form.value.employee_id = '';
  form.value.password = '';
  form.value.status = 0; // Clear status field

  navigateTo('/users');
};
</script>

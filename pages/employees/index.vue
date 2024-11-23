<template>
  <NuxtLayout name="admin">
    <div class="p-4 sm:p-8 bg-white shadow-md rounded-lg">
      <!-- Action buttons and search bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <div class="flex space-x-2">
          <button @click="createEmployee" class="button text-white px-3 py-1 rounded hover:bg-blue-600 transition">
            Create
          </button>
          <button :disabled="!selectedEmployeeId" @click="viewEmployee" class="button text-white px-3 py-1 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
            View
          </button>
          <button :disabled="!selectedEmployeeId" @click="updateEmployee" class="button text-white px-3 py-1 rounded hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Update
          </button>
        </div>
        <input
          v-model="searchQuery"
          placeholder="Search..."
          class="border px-3 py-2 rounded w-full sm:w-1/3 focus:outline-none focus:ring focus:border-blue-500 transition"
          type="text"
        />
      </div>

      <!-- Responsive Table -->
      <div class="overflow-auto">
        <table class="min-w-full border-collapse border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 border text-left">Select</th>
              <th class="px-4 py-2 border text-left">Name</th>
              <th class="px-4 py-2 border text-left">Email</th>
              <th class="px-4 py-2 border text-left">Phone Number</th>
              <th class="px-4 py-2 border text-left">Birthday</th>
              <th class="px-4 py-2 border text-left">Gender</th>
              <th class="px-4 py-2 border text-left">City</th>
              <th class="px-4 py-2 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading state -->
            <tr v-if="isLoading">
              <td colspan="8" class="text-center py-4">Loading...</td>
            </tr>

            <!-- No data state -->
            <tr v-else-if="filteredTableItems.length === 0">
              <td colspan="8" class="text-center py-4">No data available</td>
            </tr>

            <!-- Data rows -->
            <tr v-else v-for="item in filteredTableItems" :key="item.employeeId" class="hover:bg-gray-50 transition">
              <td class="px-4 py-2 border text-center">
                <input type="radio" :value="item.employeeId" v-model="selectedEmployeeId" />
              </td>
              <td class="px-4 py-2 border">{{ item.first_name }} {{ item.family_name }}</td>
              <td class="px-4 py-2 border">{{ item.email }}</td>
              <td class="px-4 py-2 border">{{ item.cellphone_no }}</td>
              <td class="px-4 py-2 border">{{ item.birthday }}</td>
              <td class="px-4 py-2 border">{{ item.gender }}</td>
              <td class="px-4 py-2 border">{{ item.city }}</td>
              <td class="px-4 py-2 border">{{ item.personalityStatus }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { EmployeesService } from '~/models/Employee';
import { PageNameService } from '~/models/PageName';
import { apiService } from '~/routes/api/API';

const searchQuery = ref<string>('');
const tableItems = ref<TableItem[]>([]);
const isLoading = ref(true);
const selectedEmployeeId = ref<string | null>(null);

interface TableItem {
  employeeId: string;
  first_name: string;
  family_name: string;
  email: string;
  cellphone_no: string;
  birthday: string;
  gender: string;
  city: string;
  personalityStatus: string;
}

// Computed property for search functionality
const filteredTableItems = computed(() => {
    const query = searchQuery.value.toLowerCase();
const searchTerms = query.split(' ').map(term => term.trim()).filter(term => term); // Split query by spaces

return tableItems.value.filter(item =>
  searchTerms.every(term =>
    // Check loanApp.Loan_Application
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(term)
    )
  )
);
});

// Fetch data when the component is mounted
onMounted(async () => {
    PageNameService.pageName = 'Employees'
  await fetchEmployees();
  isLoading.value = false;
});

// Fetch employees from API
async function fetchEmployees() {
  try {
    const response = await apiService.getEmployees({});
    storeResponseInTableItems(response.data);
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

// Function to map API response to table items
function storeResponseInTableItems(data: any[]) {
  tableItems.value = data.map(employeeData => {
    const { personality, employee } = employeeData;
    return {
      employeeId: employee.id.toString(),
      first_name: personality.first_name,
      family_name: personality.family_name,
      email: personality.email_address,
      cellphone_no: personality.cellphone_no,
      birthday: personality.birthday,
      gender: personality.gender_code === 1 ? 'Male' : 'Female',
      city: `City ${personality.city_id}`,
      personalityStatus: mapPersonalityStatus(personality.personality_status_code),
    };
  });
}

// Example helper function for personality status mapping
function mapPersonalityStatus(statusCode: number) {
  const statuses: { [key: number]: string } = {
    1: 'Inactive',
    2: 'Active',
    3: 'Suspended',
  };
  return statuses[statusCode] || 'Unknown';
}

// Action buttons functions
async function createEmployee() {
  try {
    const response = await apiService.authEmployeesCreate({});
    navigateTo('employees/create');
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

async function viewEmployee() {
  try {
    if (selectedEmployeeId.value) {
      EmployeesService.id = parseInt(selectedEmployeeId.value?.toString());
      const response = await apiService.authEmployeesUpdate({});
      navigateTo('employees/view');
    }
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

async function updateEmployee() {
  try{
  if (selectedEmployeeId.value) {
    EmployeesService.id = parseInt(selectedEmployeeId.value?.toString());
      const response = await apiService.authEmployeesUpdate({});
      navigateTo('employees/update');
    }
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

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

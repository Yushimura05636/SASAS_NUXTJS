<template>
  <NuxtLayout name="admin">
    <div class="bg-white">
    <header class="py-8 px-4 md:px-16">
      <div class="container mx-auto flex justify-between items-center">
        <img src="/img/LendCash_Logo-removebg-preview.png" class="w-20" alt="logo" />
      </div>
    </header>
  </div>
  <div class="max-w-screen-xl mx-auto px-4 md:px-8">
    <!-- Title Section -->
    <div class="items-start justify-between md:flex mt-8">
      <div class="max-w-lg">
        <h3 class="text-gray-800 text-xl font-bold sm:text-2xl mb-4">Employees</h3>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mb-8">
      <!-- Left: Action Buttons -->
      <div class="flex space-x-4">
        <button @click="createEmployee" class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
          Create
        </button>
        <button @click="modifyEmployee" :disabled="!selectedEmployeeId" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50">
          Modify
        </button>
        <button @click="deleteEmployee" :disabled="!selectedEmployeeId" class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50">
          Delete
        </button>
      </div>

      <!-- Right: Search Bar -->
      <div class="flex items-center space-x-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search employees"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        <!-- <button class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Search
        </button> -->
      </div>
    </div>

    <!-- Employee Table -->
    <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
      <table class="w-full table-auto text-sm text-left">
        <thead class="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th class="py-3 px-6">Select</th>
            <th class="py-3 px-6">Employee No</th>
            <th class="py-3 px-6">Last Name</th>
            <th class="py-3 px-6">First Name</th>
            <th class="py-3 px-6">Middle Name</th>
            <th class="py-3 px-6">Email</th>
            <th class="py-3 px-6">SSS Number</th>
            <th class="py-3 px-6">PhilHealth Number</th>
            <th class="py-3 px-6">TIN Number</th>
            <th class="py-3 px-6">Date Hired</th>
            <th class="py-3 px-6">Date Resigned</th>
            <th class="py-3 px-6">Telephone#</th>
            <th class="py-3 px-6">Birthday</th>
            <th class="py-3 px-6">Gender</th>
            <th class="py-3 px-6">Civil Status</th>
            <th class="py-3 px-6">House Street</th>
            <th class="py-3 px-6">Purok Zone</th>
            <th class="py-3 px-6">postal Code</th>
            <th class="py-3 px-6">Personality Status</th>
            <th class="py-3 px-6">Barangay</th>
            <th class="py-3 px-6">City</th>
            <th class="py-3 px-6">Country</th>
            <th class="py-3 px-6">Province</th>
            <th class="py-3 px-6">Date Created</th>
            <th class="py-3 px-6">Date Last Modified</th>
            <th class="py-3 px-6">Notes</th>
            <!-- <th class="py-3 px-6">Action</th> -->
          </tr>
        </thead>
        <tbody class="text-gray-600 divide-y">
          <tr v-for="(item, idx) in filteredTableItems" :key="idx">
            <td class="px-6 py-4 whitespace-nowrap">
              <input type="radio" :value="item.employeeId" v-model="selectedEmployeeId" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.employeeId }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.family_name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.first_name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.middle_name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.sssno }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.phicno }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.tinno }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.datetime_hired }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.datetime_resigned }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.telephoneNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.birthday }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.civilStatus }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.houseStreet }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.purokZone }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.postalCode }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.personalityStatus }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.Barangay }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.city }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.country }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.province }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.dateCreated }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.dateLastModified }}</td>
            <td class="text-right px-6 whitespace-nowrap"></td>
          </tr>
          <tr v-if="filteredTableItems.length === 0">
            <td colspan="8" class="text-center py-4 text-gray-600">No data found</td>
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

import { EmployeesService } from '~/models/Employee';
import { ref, computed } from 'vue'
import { apiService } from '~/routes/api/API'
import { PermissionService } from '../../models/Permission';
import { Employee } from '../../models/Employee';


const searchQuery = ref<string>('')

const tableItems = ref<TableItem[]>([]); // Initialize
const selectedEmployeeId = ref<string | null>(null); // Track selected employee ID


const state = {
  datas: [] as any[],
  employees: [] as any[], // Array to store multiple customers
  personalities: [] as any[], // Array to store multiple personalities
};

const filteredTableItems = computed(() => {
  return tableItems.value.filter(item => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

const editEmployee = (item: TableItem) => {
  EmployeesService.id = parseInt(item.employeeId);
  navigateTo(`/Libraries/EmployeeUpdate`)
  // console.log('Editing member:', item)
}


interface TableItem {
  employeeId: string;
  first_name: string;
  family_name: string;
  middle_name: string;
  birthday: string;
  civilStatus: string;
  gender: string;
  houseStreet: string;
  purokZone: string;
  postalCode: string;
  telephoneNumber: string;
  email: string;
  cellphoneNo: string;
  personalityStatus: string;
  Barangay: string;
  city: string;
  country: string;
  province: string;
  dateCreated: string;
  dateLastModified: string;
  sssno: number;
  phicno: number;
  tinno: number;
  datetime_hired: string;
  datetime_resigned: string;

}

async function createEmployee() {
  try {
    debugger;
    const response = await apiService.authEmployeesCreate({});
    navigateTo('employees/create');
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

async function modifyEmployee() {
  try {
    debugger;
    EmployeesService.id = parseInt(selectedEmployeeId.value?.toString());
    const response = await apiService.authEmployeesUpdate({});
    navigateTo('employees/update');
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

async function fetchEmployees() {
  try {
     // Your query params for the API
    const response = await apiService.getEmployees({}); // Fetch customer data from API
    state.datas = response;

    // Call the function to map the API data to tableItems
    storeResponseInTableItems();

  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}


// Function to map customer and personality data to tableItems
function storeResponseInTableItems() {
  // Clear table items before pushing new data
  tableItems.value = [];

  for (let i = 0; i < state.datas.data.length; i++)
  {
    const personality = state.datas.data[i].personality;
    const employees = state.datas.data[i].employee;

    tableItems.value.push({

      //Personality Section
      family_name: personality.family_name,
      first_name: personality.first_name,
      middle_name: personality.middle_name,
      birthday: personality.birthday, // Make sure it's properly formatted
      civilStatus: mapCivilStatus(personality.civil_status), // Map the civil_status code
      gender: personality.gender_code === 1 ? 'Male' : 'Female', // Example: gender_code mapping
      houseStreet: personality.house_street,
      purokZone: personality.purok_zone,
      postalCode: personality.postal_code,
      telephoneNumber: personality.telephone_no,
      email: personality.email_address,
      cellphoneNo: personality.cellphone_no,
      personalityStatus: mapPersonalityStatus(personality.personality_status_code), // Example mapping
      Barangay: mapBarangay(personality.barangay_id), // Example: You might want to map IDs to names
      city: mapCity(personality.city_id),
      country: mapCountry(personality.country_id),
      province: mapProvince(personality.province_id),
      dateCreated: new Date().toISOString().split('T')[0], // Set current date as dateCreated
      dateLastModified: new Date().toISOString().split('T')[0], // Set current date as dateLastModified

      //Employee Section
      employeeId: employees.id.toString(),
      sssno: employees.sss_no,
      phicno: employees.phic_no,
      tinno: employees.tin_no,
      datetime_hired: employees.datetime_hired,
      datetime_resigned:  employees.datetime_resigned,

    });
  }
}


function mapCivilStatus(civilStatusCode: number) {
  const statuses: { [key: number]: string } = {
    1: 'Single',
    2: 'Married',
    3: 'Divorced',
    4: 'Widowed',
  };
  return statuses[civilStatusCode] || 'Unknown';
}

// Example helper function for personality status
function mapPersonalityStatus(statusCode: number) {
  const statuses: { [key: number]: string } = {
    1: 'Active',
    2: 'Inactive',
    3: 'Suspended',
  };
  return statuses[statusCode] || 'Unknown';
}

// Add your own mapping functions for barangay, city, province, etc.
function mapBarangay(barangayId: number) {
  // Mapping logic for barangay IDs to names
  return `Brgy ${barangayId}`;
}

function mapCity(cityId: number) {
  return `City ${cityId}`;
}

function mapCountry(countryId: number) {
  return `Country ${countryId}`;
}

function mapProvince(provinceId: number) {
  return `Province ${provinceId}`;
}

fetchEmployees();
</script>

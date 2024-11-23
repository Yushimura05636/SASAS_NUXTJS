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
        <h3 class="text-gray-800 text-xl font-bold sm:text-2xl mb-4">Customers</h3>
      </div>
    </div>
    </div>
    
  <div class="max-w-screen-xl mx-auto px-4 md:px-8">
    <!-- Action Buttons -->
    <div class="flex justify-between items-center mb-8">
      <!-- Left: Action Buttons -->
      <div class="flex space-x-4">
        <button @click="createCustomer" class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
          Create
        </button>
        <button @click="modifyCustomer" :disabled="!selectedEmployeeId" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50">
          Modify
        </button>
        <button @click="deleteEmployee" :disabled="!selectedEmployeeId" class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50">
          Delete
        </button>
        <button  @click="approveORreject"
          :disabled="!selectedEmployeeId"
          class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false">
          {{ isHovered ? 'Reject' : 'Approved' }}
        </button>


      </div>

      <!-- Right: Search Bar -->
      <div class="flex items-center space-x-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customers"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        <!-- <button class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Search
        </button> -->
      </div>
    </div>

    <!-- Customer Table -->
    <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
      <table class="w-full table-auto text-sm text-left">
        <thead class="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th class="py-3 px-6"></th>
            <th class="py-3 px-6">Employee ID</th>
            <th class="py-3 px-6">Name</th>
            <th class="py-3 px-6">Email</th>
            <th class="py-3 px-6">Telephone#</th>
            <th class="py-3 px-6">Birthday</th>
            <th class="py-3 px-6">Gender</th>
            <th class="py-3 px-6">Civil Status</th>
            <th class="py-3 px-6">Group Name</th>
            <th class="py-3 px-6">House Street</th>
            <th class="py-3 px-6">Purok Zone</th>
            <th class="py-3 px-6">postal Code</th>
            <th class="py-3 px-6">Pesonality Status</th>
            <th class="py-3 px-6">Barangay</th>
            <th class="py-3 px-6">City</th>
            <th class="py-3 px-6">Country</th>
            <th class="py-3 px-6">Province</th>
            <th class="py-3 px-6">Credit Status</th>
            <th class="py-3 px-6">Date Created</th>
            <th class="py-3 px-6">Date Last Modified</th>
            <th class="py-3 px-6">Passbook Number</th>
            <th class="py-3 px-6">Loan Count</th>
            <th class="py-3 px-6">Mortuary Status</th>
            <th class="py-3 px-6">Mortuary Coverage Start</th>
            <th class="py-3 px-6">Mortuary Coverage End</th>
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
            <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.telephoneNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.birthday }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.civilStatus }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.groupName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.houseStreet }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.purokZone }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.postalCode }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.personalityStatus }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.Barangay }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.city }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.country }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.province }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.creditStatus }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.dateCreated }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.dateLastModified }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.passbookNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.loanCount }}</td>
            <td class="px-6 py-4 whitespace-nowrap"></td>
            <!-- Display Mortuary Status with Color Indicator -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{'bg-green-500': item.mortuaryStatus, 'bg-red-500': !item.mortuaryStatus}" class="inline-block w-3 h-3 rounded-full"></span>
              {{ item.mortuaryStatus ? 'Enabled' : 'Disabled' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.mortuaryCoverageStart }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.mortuaryCoverageEnd }}</td>
          </tr>
          <tr v-if="filteredTableItems.length === 0">
            <td colspan="11" class="text-center py-4 text-gray-600">No data found</td>
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

import { CustomersService } from '~/models/Customer';
import { PersonalityService } from '~/models/Personality';

import { ref, computed } from 'vue'
import { apiService } from '~/routes/api/API'
import { numeric } from '@vuelidate/validators';
import { PermissionService } from '~/models/Permission';
import Permission from '../non_used_components/Permission.vue';


const isHovered = ref(false);

const searchQuery = ref<string>('')

  const tableItems = ref<TableItem[]>([]); // Initialize tableItems
  let selectedEmployeeId = ref(null);

const state = {
  datas: [],
  customers: [],
  personality: [],
};

// Fetch customers when necessary
fetchCustomers();

const filteredTableItems = computed(() => {
  return tableItems.value.filter(item => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

async function createCustomer() {
  try {
    const response = await apiService.authCustomersCreate({});
    navigateTo('/customers/create');
  } catch (error: any) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

async function modifyCustomer() {
  try {
    debugger;
    CustomersService.id = parseInt(selectedEmployeeId.value?.toString());
    const response = await apiService.authCustomersUpdate({});
    navigateTo(`customers/update`)
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

interface TableItem {
  employeeId: string;
  name: string;
  email: string;
  telephoneNumber: string;
  birthday: string;
  gender: string;
  civilStatus: string;
  groupName: string;
  houseStreet: string;
  purokZone: string;
  postalCode: string;
  personalityStatus: string;
  Barangay: string;
  city: string;
  country: string;
  province: string;
  creditStatus: string;
  dateCreated: string;
  dateLastModified: string;
  passbookNumber: string;
  loanCount: number;
  mortuaryStatus: boolean;
  mortuaryCoverageStart: string | undefined;
  mortuaryCoverageEnd: string | undefined;
}

// Fetching customers from the API
async function fetchCustomers() {
  try {
    const response = await apiService.getCustomers({}); // Fetch customer data from API

    // Store API response in state (assuming API returns arrays)
    state.datas = response // An array of personality objects

    // Call the function to map the API data to tableItems
    debugger;

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
    const customer = state.datas.data[i].customer;

    tableItems.value.push({
      employeeId: customer.id.toString(), // Assuming passbook_no is like employeeId
      name: `${personality.first_name} ${personality.family_name}`,
      email: personality.email_address,
      telephoneNumber: personality.telephone_no,
      birthday: personality.birthday, // Make sure it's properly formatted
      gender: personality.gender_code === 1 ? 'Male': 'Female', // Example: gender_code mapping
      civilStatus: mapCivilStatus(personality.civil_status), // Map the civil_status code
      groupName: `Group ${customer.group_id}`, // Assuming group_id is like groupName
      houseStreet: personality.house_street,
      purokZone: personality.purok_zone,
      postalCode: personality.postal_code,
      personalityStatus: mapPersonalityStatus(personality.personality_status_code), // Example mapping
      Barangay: mapBarangay(personality.barangay_id), // Example: You might want to map IDs to names
      city: mapCity(personality.city_id),
      country: mapCountry(personality.country_id),
      province: mapProvince(personality.province_id),
      creditStatus: mapCreditStatus(personality.credit_status_id), // Example mapping
      dateCreated: new Date().toISOString().split('T')[0], // Set current date as dateCreated
      dateLastModified: new Date().toISOString().split('T')[0], // Set current date as dateLastModified
      passbookNumber: customer.passbook_no.toString(),
      loanCount: customer.loan_count,
      mortuaryStatus: customer.enable_mortuary === 1,
      mortuaryCoverageStart: customer.mortuary_coverage_start,
      mortuaryCoverageEnd: customer.mortuary_coverage_end,
    });

    console.log(customer);
  }

  // // Loop through each customer and personality data (assuming they have matching indices)
  // state.datas?.data.forEach((customer, index) => {

  // });
}

// Example helper function to map civil status codes to human-readable values
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
    1: 'Pending',
    2: 'Approved',
    3: 'Reject',
    4: 'Active',
    5: 'Inactive',
    //3: 'Suspended',
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

function mapCreditStatus(creditStatusId: number) {
  const statuses: { [key: number]: string } = {
    1: 'Good',
    2: 'Fair',
    3: 'Poor',
  };
  return statuses[creditStatusId] || 'Unknown';
}

function approve(){
  navigateTo("customers/approve");
}

async function approveORreject(){
  try {
    // debugger;
    CustomersService.id = parseInt(selectedEmployeeId.value?.toString());
    const response = await apiService.authCustomersUpdate({});
    // console.log("test" + CustomersService.id);
    navigateTo(`customers/approve`)
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}



</script>

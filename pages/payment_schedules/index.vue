<template>
    <NuxtLayout name="admin">
      <div class="p-8">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">Schedules</h1>
          <!-- <div class="flex space-x-2">
            <button @click="updatePayment" class="bg-yellow-500 text-white px-4 py-2 rounded">Pay</button>
            <button @click="deletePayment" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div> -->
        </div>

        <!-- Comboboxes for group, customer, and search input -->
        <div class="flex space-x-4 mb-4">
          <select v-model="selectedGroup" @change="loadCustomers" class="border rounded px-4 py-2 w-1/4">
            <option value="">Groups</option>
            <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.description }}</option>
          </select>

          <select v-if="customers.length" v-model="selectedCustomer" @change="LoadPaymentSchedule" class="border rounded px-4 py-2 w-1/4">
            <option value="">Customers</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.personality.family_name }} {{ customer.personality.first_name }} {{ customer.personality.middle_name }}</option>
          </select>

          <!-- Refresh button with Hero Icon -->
          <button @click="LoadPaymentSchedule" class="text-gray-600 hover:text-gray-900">
            <img src="https://www.svgrepo.com/show/14059/refresh.svg" alt="Refresh Icon" class="w-5 h-5" />
          </button>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search payments"
            class="border rounded px-4 py-2 w-1/2"
          />
        </div>

        <!-- Scrollable table container -->
        <div class="overflow-y-auto max-h-96">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-900 text-white">
              <tr>
                <th class="py-2 px-4">Select</th>
                <th class="py-2 px-4">Group Name</th>
                <th class="py-2 px-4">Loan Application No</th>
                <th class="py-2 px-4">Family Name</th>
                <th class="py-2 px-4">First Name</th>
                <th class="py-2 px-4">Middle Name</th>
                <th class="py-2 px-4">DateTime Due</th>
                <th class="py-2 px-4">Amount Due</th>
                <th class="py-2 px-4">Amount Interest</th>
                <th class="py-2 px-4">Amount Paid</th>
                <th class="py-2 px-4">Amount Balance</th>
                <th class="py-2 px-4">Payment Status</th>
                <th class="py-2 px-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(payment, index) in filteredPayments" :key="index">
                <td class="text-center py-2">
                  <input type="radio" name="select" v-model="selectedPayment" :value="payment.id" @change="getSelectedValue(payment)">
                </td>
                <td class="py-2 px-4">{{ payment.group_name }}</td>
                <td class="py-2 px-4">{{ payment.loan_application_no }}</td>
                <td class="py-2 px-4">{{ payment.family_name }}</td>
                <td class="py-2 px-4">{{ payment.first_name }}</td>
                <td class="py-2 px-4">{{ payment.middle_name }}</td>
                <td class="py-2 px-4">{{ payment.datetime_due }}</td>
                <td class="py-2 px-4">{{ payment.amount_due }}</td>
                <td class="py-2 px-4">{{ payment.amount_interest }}</td>
                <td class="py-2 px-4">{{ payment.amount_paid }}</td>
                <td class="py-2 px-4">{{ payment.balance }}</td>
                <td class="py-2 px-4">{{ payment.payment_status_code }}</td>
                <td class="py-2 px-4">{{ payment.notes }}</td>
              </tr>
              <tr v-if="filteredPayments.length === 0">
                <td colspan="12" class="text-center py-4 text-gray-500">No data found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </template>

  <script setup>
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import { ref, computed, onMounted } from 'vue';
  import { apiService } from '~/routes/api/API';

  const groups = ref([]);
  const paymentSchedule = ref([]);
  const customers = ref([]);
  const selectedGroup = ref('');
  const selectedCustomer = ref('');
  const searchQuery = ref('');
  const selectedPayment = ref('');
  const customers_temp = ref([]);

  // Computed property for filtered payments
  const filteredPayments = computed(() => {
    if (!selectedCustomer.value) return paymentSchedule.value;

    const query = searchQuery.value.toLowerCase();
    const searchTerms = query.split(' ').map(term => term.trim()).filter(term => term);

    return paymentSchedule.value.filter(payment =>
      searchTerms.every(term =>
        Object.values(payment).some(value =>
          String(value).toLowerCase().includes(term)
        )
      )
    );
  });

  // Function to load groups
  const loadGroups = async () => {
    const response = await apiService.get({}, 'customer_group');
    groups.value = response.data;

    const customer_data = await apiService.getApproveActiveCustomersNoAuth({})
        customers_temp.value = customer_data.data;
  };

// Function to load customers based on the selected group
const loadCustomers = async () => {
  if (selectedGroup.value) {
    debugger
    const response = await apiService.getCustomerByGroupIdAndData({}, selectedGroup.value);
    customers.value = response.data;
  } else {
    customers.value = [];
    // If no group is selected, load all payment schedules
    await fetchLoanSchedules();
  }
};

// Function to load payment schedule based on the selected customer
const LoadPaymentSchedule = async () => {
  if (selectedCustomer.value) {
    const response = await apiService.getPaymentScheduleByCustomerIdNoAuth({}, selectedCustomer.value);
    paymentSchedule.value = response.data;
  } else {
    // If no customer is selected, load all payment schedules
    await fetchLoanSchedules();
  }
};

  // Function to fetch all loan schedules
  const fetchLoanSchedules = async () => {
    try {
      const response = await apiService.getPaymentScheduleAll({});
      paymentSchedule.value = response.data;
    } catch (error) {
      console.error('Error fetching loan schedules:', error);
    }
  };

  function filteredGroup() {
    try {
        debugger
        const uniqueGroupIds = new Set(customers_temp.value.map(customer => customer.customer.group_id));
        groups.value = groups.value.filter(group => uniqueGroupIds.has(group.id));
        return groups.value;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 3000, })
setTimeout(() => {
    }, 2000);
    }
};

  // Load groups and loan schedules on component mount
  onMounted(async () => {
//Promise for authentication
const state_response = ref('');
  try {
    await fetchLoanSchedules();
    await loadGroups();
    filteredGroup();
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
          }, 2000);
    }
  }
    
  });
  </script>

<template>
    <NuxtLayout name="client">
      <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Welcome Message and Date-Time -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">Welcome Back, {{  UserService.last_name ?? 'User'}} {{  UserService.first_name ?? 'User'}} {{ UserService.middle_name ?? 'User'}}!</h1>
            <p class="text-gray-600 text-lg">{{ currentDateTime }}</p>
          </div>
        </div>
  
        <!-- Loan Overview Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-3">Total Loan Balance</h2>
            <p class="text-3xl font-semibold text-blue-600">{{ formatCurrency(totalLoanBalance) || 0 }}</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-3">Number of Loans</h2>
            <p class="text-3xl font-semibold text-green-600">{{ numberOfLoans || 0 }}</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-3">Outstanding Balance</h2>
            <p class="text-3xl font-semibold text-red-600">{{ formatCurrency(outstandingBalance) || 0 }}</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-3">Total Payments</h2>
            <p class="text-3xl font-semibold text-green-700">{{ formatCurrency(totalPayments) || 0 }}</p>
          </div>
        </div>
  
        <!-- Susceptible for Reloan Section -->
        <div class="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Eligible to Reloan</h2>
          <p :class="statusClasses(susceptibleForReloan)" class="text-lg font-semibold">
            {{ susceptibleForReloan === 'Yes' ? 'Yes' : susceptibleForReloan === 'No' ? 'No' : 'N/A' }}
          </p>
        </div>
  
        <!-- Loans Table -->
<div v-if="loans.length > 0" class="bg-white p-6 rounded-xl shadow-md mb-10">
  <h2 class="text-xl font-semibold text-gray-700 mb-4">Loans</h2>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-lg border border-gray-200">
  <thead>
    <tr>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Loan Application No</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Date Prepared</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Status Code</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Loan Amount</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Factor Rate</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Interest Amount</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount Paid</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Date Fully Paid</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Date Approved</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="loan in loans" :key="loan.id" class="hover:bg-gray-50 transition duration-200">
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.loan_application_no }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.datetime_prepared }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.document_status_code }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.amount_loan }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.factor_rate }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.amount_interest }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.amount_paid }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.datetime_fully_paid }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.datetime_approved }}</td>
      <td class="py-2 px-4 border-b border-gray-300">{{ loan.notes }}</td>
    </tr>
  </tbody>
</table>
  </div>
</div>

  
        <!-- Payments Table -->
        <div v-if="payments.length > 0" class="bg-white p-6 rounded-xl shadow-md">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Payments</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg border border-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Prepared At</th>
                  <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount Paid</th>
                  <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Date Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50 transition duration-200">
                  <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ payment.prepared_at || 'N/A' }}</td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ payment.amount_paid || 0 }}</td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ payment.document_status_description || 0 }}</td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ payment.updated_at || 'N/A' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import { ref, onMounted } from 'vue'
  import { UserService } from '~/models/User';
  import { apiService } from '~/routes/api/API'
  
  // Temporary variables for dashboard data
  const totalLoanBalance = ref(0)
  const numberOfLoans = ref(0)
  const outstandingBalance = ref(0)
  const totalPayments = ref(0)
  const susceptibleForReloan = ref('')
  
  // Temporary list of loans for the table
  const loans = ref([])
  
  // Temporary list of payments for the table
  const payments = ref([])
  
  // Real-time clock
  const currentDateTime = ref('')

  const last_name = ref('User');
  const first_name = ref('User');
  const middle_name = ref('User');
  
  // Update the time every second
  const updateTime = () => {
    const now = new Date()
    currentDateTime.value = now.toLocaleString()
  }
  
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await apiService.getDashboardUserLoanDetailsNoAUTH({})
      totalLoanBalance.value = response.total_balances
      numberOfLoans.value = response.number_of_loans
      outstandingBalance.value = response.outstanding_balance
      totalPayments.value = response.total_payments

      debugger

      if(response.can_reloan == true)
      {
          susceptibleForReloan.value = 'Yes'
      }
      else
      {
          susceptibleForReloan.value = 'No'
      }

      loans.value = response.loan_history
      payments.value = response.payment_history

      //name
      first_name.value = UserService.first_name
      last_name.value = UserService.last_name
      middle_name.value = UserService.middle_name
    } catch (error) {
      toast.error(`${error}`)
    }
  }
  
  // Status color classes for loan status and reloan eligibility
  const statusClasses = (status: string) => {
    return {
      'text-green-500': status === 'Yes',
      'text-red-500': status === 'No',
      'text-yellow-500': status === 'Pending',
    }
  }

  const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}

  
  // Call the updateTime function every second
  onMounted(() => {
    debugger
    fetchDashboardData()
    setInterval(updateTime, 1000) // Update time every second
  })
  </script>  
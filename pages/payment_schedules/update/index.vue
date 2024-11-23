<template>
  <NuxtLayout name="admin">
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Payment Form</h2>
    <form @submit.prevent="submitPayment">
        <div class="mb-4">
    <label for="customer_fname" class="block text-sm font-medium text-gray-700">Customer First Name</label>
    <span v-if="!comboboxLoan.value || isLoanNoLoading">Loading..</span>
    <input v-else
    readonly
    v-model="comboboxLoan.value.loan_applications.loan_application_no"
    type="text"
    id="customer_fname"
    required
    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
    placeholder="Enter Loan Application ID"
    />
</div>

    <!-- <div class="mb-4">
    <label for="loan-select" class="block text-sm font-medium text-gray-700">Loan Application No</label>
    <select
      id="loan-select"
      v-model="selectedLoan.value"
      class="mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
    >
      <option value="" disabled>Select a loan application</option>
      <option v-for="loanApp in loanApps.value" :key="loanApp.loan_applications.id" :value="getLoanData(loanApp)">
        {{ loanApp.loan_applications.loan_application_no }}
      </option>
    </select>
  </div> -->
      <div class="mb-4">
        <label for="customer_fname" class="block text-sm font-medium text-gray-700">Customer First Name</label>
        <input
        readonly
          v-model="personalities.value.family_name"
          type="text"
          id="customer_fname"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter Loan Application ID"
        />
      </div>

      <div class="mb-4">
        <label for="customer_lname" class="block text-sm font-medium text-gray-700">Customer Last Name</label>
        <input
        readonly
          v-model="personalities.value.first_name"
          type="text"
          id="customer_lname"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter Loan Application ID"
        />
      </div>

      <div class="mb-4">
        <label for="customer_mname" class="block text-sm font-medium text-gray-700">Customer Middle Name</label>
        <input
        readonly
          v-model="personalities.value.middle_name"
          type="text"
          id="customer_mname"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter Loan Application ID"
        />
      </div>

      <div class="mb-4">
        <label for="loan_application_id" class="block text-sm font-medium text-gray-700">Amount Due</label>
        <input
        readonly
          v-model="schedules.value.amount_due"
          type="number"
          id="loan_application_id"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter Loan Application ID"
        />
      </div>

      <div class="mb-4">
        <label for="amount_interest" class="block text-sm font-medium text-gray-700">Amount Interest</label>
        <input
        readonly
          v-model="schedules.value.amount_interest"
          type="number"
          id="amount_interest"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter Amount Paid"
        />
      </div>


      <div class="mb-4">
          <label for="balance" class="block text-sm font-medium text-gray-700">Balance</label>
          <input
          v-model="schedules.value.balance"
          type="number"
          id="balance"
          readonly
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter Balance"
          />
        </div>

        <div class="mb-4">
          <label for="amount_paid" class="block text-sm font-medium text-gray-700">Amount Paid</label>
          <input
            v-model="schedules.value.amount_paid"
            type="number"
            id="amount_paid"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter Amount Paid"
          />
        </div>

      <div class="mb-4">
        <label for="loan_application_id" class="block text-sm font-medium text-gray-700">Amount Due Date</label>
        <input
          readonly
          v-model="schedules.value.datetime_due"
          type="text"
          id="loan_application_id"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter Loan Application ID"
        />
      </div>

      <div class="mb-4">
        <label for="status" class="block text-sm font-medium text-gray-700">Notes</label>
        <input disabled
          v-model="schedules.value.payment_status_code"
          id="status"
          rows="3"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="UNPAID"
        >
      </div>

      <div class="mb-4">
        <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          v-model="schedules.value.remarks"
          id="notes"
          rows="3"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter any notes..."
        ></textarea>
      </div>

      <div class="flex justify-between mt-4 w-full">
  <button type="submit" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 w-1/2 mr-2">
    Submit Payment
  </button>
  <button type="button" @click="cancelForm" class="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 w-1/2 ml-2">
    Cancel
  </button>
</div>
    </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, onMounted } from 'vue';
import { loanApplicationService } from '~/models/LoanApplication';
import { paymentScheduleService } from '~/models/PaymentSchedules';
import { apiService } from '~/routes/api/API';

const customers = reactive({
  value: {}
})

const personalities = reactive({
  value: {}
})

const schedules = reactive({
  value: {}
})

const loanApps = reactive({
  value: {}
})

const comboboxLoan = reactive({
  value: {}
})

const state = {
  selectedCustomerValue: 0,
}

const selectedLoan = {
  value: null
}

const payment = ref({
  customer_id: null,
  loan_application_id: null, // Include loan application ID
  amount_paid: null,
  notes: '',
  payment_schedule_id: null,
});

const isLoanNoLoading = ref(true);


// Call fetchCustomers and fetchLoans when the component is mounted
onMounted(() => {
  fetchCustomers();
  fetchSchedules();
  fetchLoanApp();
});

const fetchLoanApp = async () => {
  try {

    if(paymentScheduleService.customer_id == null)
    {
      navigateTo('/payment_schedules/')
    }
    const response = await apiService.getLoanApplicationByLoanNo({}, loanApplicationService.loan_application_no); // Replace with your actual API endpoint
    debugger;
    // Assuming your API returns a list of customers
    loanApps.value = response.data
    comboboxLoan.value = loanApps.value;
    console.log('loanApps: ', loanApps.value.loan_applications.loan_application_no);
  } catch (error) {
    console.error('Error fetching customers:', error);
    // Handle error (e.g., show an error message)
  }
  finally
  {
    isLoanNoLoading.value = false;
  }
}

const fetchCustomers = async () => {
  try {

    if(paymentScheduleService.customer_id == null)
    {
      navigateTo('/payment_schedules/')
    }
    const response = await apiService.getCustomerByIdNoAuth({}, paymentScheduleService.customer_id); // Replace with your actual API endpoint
    // Assuming your API returns a list of customers
    customers.value = response.customer
    personalities.value = response.personality
    console.log('Fetched customers: ', customers)
    console.log('Fetched personalities: ', personalities)
  } catch (error) {
    console.error('Error fetching customers:', error);
    // Handle error (e.g., show an error message)
  }
};

// Fetch loan applications from the API
const fetchSchedules = async () => {
  try {
    const response = await apiService.getPaymentScheduleById({}, paymentScheduleService._id);
    schedules.value = response.data;
    schedules.value.balance = paymentScheduleService.balance;

    console.log('schedules: ', response)
  } catch (error) {
    console.error('Error fetching loans:', error);
    // Handle error (e.g., show an error message)
  }
};

const submitPayment = async () => {
  try {

    if(schedules.value.payment_status_code == 'PAID')
    {
        alert('This schedule is already paid!');
    }

    //amount paid
    const customer = customers.value
    const personality = personalities.value
    const schedule = schedules.value
    const loan = comboboxLoan.value
    const json = {
      customer,
      personality,
      schedule,
      loan,
    }
    const response = await apiService.createPayment(json); // Pass payment object
    toast.success("Transaction successful!", {
        autoClose: 5000,
    });

    setTimeout(()=>{
        navigateTo('/payment_schedules')
    }, 5000)

    // Handle success (e.g., show a success message, reset form, etc.)
  } catch (error) {
    console.error('Error submitting payment:', error);
    // Handle error (e.g., show an error message)
  }
};

const getLoanData = async (loan: any) => {
  comboboxLoan.value = loan;
    debugger;
  comboboxLoan.value.loan_applications.loan_application_no;

  return 1;
}

const cancelForm = () => {
    navigateTo('/payment_schedules/');
}

</script>

<style scoped>
/* Add any additional styling if needed */
</style>

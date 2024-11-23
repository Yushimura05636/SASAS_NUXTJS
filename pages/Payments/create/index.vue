<template>
    <NuxtLayout name="admin">
        <div class="p-8 relative">

<button
@click="cancelForm()"
class="mb-4 flex items-center text-gray-700 hover:text-blue-500 transition-colors"
>
<span class="text-xl mr-2">&lt;</span>
<span class="text-lg font-semibold">Back</span>
</button>
<!-- Loading Spinner -->
<div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
<div class="loader"></div>
</div>

<!-- Customer Name Combobox -->
<div v-if="!loading" class="mb-4">
<label class="block text-gray-700">Customer Name</label>
<select v-model="selectedCustomer" @change="fetchPayments" class="w-full border rounded-lg px-4 py-2">
<option disabled value="">Select Customer</option>
<option v-for="customer in customers" :key="customer.customer.id" :value="customer.customer.id">
  {{ customer.personality.family_name }} {{ customer.personality.first_name }} {{ customer.personality.middle_name }}
</option>
</select>
</div>

<!-- Loan Application Combobox -->
<div v-if="loanApplications.length > 0 && !loading" class="mb-4">
<label class="block text-gray-700">Loan Application</label>
<select v-model="selectedLoan" @change="fetchPayments" class="w-full border rounded-lg px-4 py-2">
<option disabled value="">Select Loan Application</option>
<option v-for="loan in loanApplications" :key="loan.id" :value="loan.loan_application_no">
  {{ loan.loan_application_no }}
</option>
</select>
</div>


<!-- Payments Table -->
<div v-if="!loading">
  <div v-if="payments.length > 0" class="overflow-x-auto">
    <div class="max-h-60 overflow-x-auto overflow-y-auto">
      <table class="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr>
            <th class="px-4 py-2 border text-left">Select</th>
            <th class="px-4 py-2 border text-left">Payment ID</th>
            <th class="px-4 py-2 border text-left">Payment Amount Due</th>
            <th class="px-4 py-2 border text-left">Payment Amount Interest</th>
            <th class="px-4 py-2 border text-left">Payment Amount Paid</th>
            <th class="px-4 py-2 border text-left">Payment Amount Balance</th>
            <th class="px-4 py-2 border text-left">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id" @click="selectPayment(payment)">
            <td class="px-4 py-2 border text-left">
              <input type="checkbox" v-model="payment.isSelected" />
            </td>
            <td class="px-4 py-2 border">{{ payment.id }}</td>
            <td class="px-4 py-2 border">{{ payment.amount_due }}</td>
            <td class="px-4 py-2 border">{{ payment.amount_interest }}</td>
            <td class="px-4 py-2 border">{{ payment.amount_paid }}</td>
            <td class="px-4 py-2 border">{{ payment.balance }}</td>
            <td class="px-4 py-2 border">{{ payment.payment_status_code }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


<!-- Payment Details Form -->
<div v-if="selectedPayment && !loading" class="mt-6">
<div v-if="selectedPayment" class="mt-6">
<h2 class="text-xl font-bold mb-4">Payment Details</h2>
<div class="grid grid-cols-2 gap-4">
  <!-- Display Balance, Amount Due, Interest, Amount Paid -->
  <div>
    <label class="block text-gray-700">Balance</label>
    <input
      type="number"
      v-model="selectedPayment.balance"
      readonly
      class="w-full border rounded-lg px-4 py-2 bg-gray-100"
    />
  </div>
  <div>
    <label class="block text-gray-700">Amount Due</label>
    <input
      type="number"
      v-model="selectedPayment.amount_due"
      readonly
      class="w-full border rounded-lg px-4 py-2 bg-gray-100"
    />
  </div>
  <div>
    <label class="block text-gray-700">Amount Interest</label>
    <input
      type="number"
      v-model="selectedPayment.amount_interest"
      readonly
      class="w-full border rounded-lg px-4 py-2 bg-gray-100"
    />
  </div>
  <div>
    <label class="block text-gray-700">Amount Paid</label>
    <input
      type="number"
      v-model="selectedPayment.amount_paid"
      class="w-full border rounded-lg px-4 py-2"
    />
  </div>

  <!-- Fields for Status and Notes outside the table -->
  <div>
    <label class="block text-gray-700">Status</label>
    <input
      type="text"
      v-model="selectedPayment.payment_status_code"
      readonly
      class="w-full border rounded-lg px-4 py-2 bg-gray-100"
    />
  </div>
  <div>
    <label class="block text-gray-700">Notes</label>
    <textarea
      v-model="selectedPayment.notes"
      class="w-full border rounded-lg px-4 py-2"
      rows="3"
      placeholder="Enter notes here"
    ></textarea>
  </div>
</div>

<!-- Submit and Cancel Buttons -->
<div class="mt-4 flex gap-4">
  <button @click="submitForm" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
  <button @click="cancelForm" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel</button>
</div>
</div>
</div>
</div>
    </NuxtLayout>
  </template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref, onMounted } from 'vue';
import { loanApplicationService } from '~/models/LoanApplication';
import { paymentServices } from '~/models/Payments';
import { apiService } from '~/routes/api/API';

interface Customer {}

interface LoanApplication {}

interface Payment {}

const loading = ref(true);
const selectedCustomer = ref<string | null>(null);
const selectedLoan = ref<string | null>(null);
const selectedPayment = ref<Payment | null>(null);

const customers = ref<Customer[]>([]);
const loanApplications = ref<LoanApplication[]>([]);
const payments = ref<Payment[]>([]);

async function fetchCustomers() {
  try {
    const response = await apiService.getCustomerWithPaymentsNoAuth({});
    customers.value = response.data;
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000 });
  } finally {
    loading.value = false;
  }
}

async function fetchLoanApplications() {
  loading.value = true;
  debugger
  try {
    if (selectedCustomer.value) {
    fetchPayments();
    //   const response = await apiService.getLoanApplicationByCustomerId({}, selectedCustomer.value);
    //   loanApplications.value = response.data;

    //   if(!response || response.data.length <= 0)
    //   {
    //   }

    }
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000 });
  } finally {
    loading.value = false;
  }
}

async function fetchPayments() {
    debugger
  try {
    if (selectedCustomer.value) {
        loading.value = true;
        const response = await apiService.getPaymentByCustomerIdNoAuth({}, selectedCustomer.value);
        payments.value = response.data;
    }
    // if(selectedLoan.value)
    // {
    //     const response = await apiService.getPaymentByLoanNONoAuth({}, selectedLoan.value);
    //     if(!response.data && response.data == null && response.data.length <= 0)
    //     {
    //         const response = await apiService.getPaymentByCustomerIdNoAuth({}, selectedCustomer.value);
    //         if(!response.data && response.data == null)
    //         {
    //             throw new Error(`Payment Schedule and Loan Application does not exists`);
    //         }
    //         payments.value = response.data;
    //     }
    //     else
    //     {
    //         payments.value = response.data;
    //     }
    // }
    // else
    // {
    //     debugger

    //     if(!response.data && response.data == null)
    //     {
    //         throw new Error(`Payment Schedule does not exists`);
    //     }

    //     payments.value = response.data;
    // }
  } catch (error) {
    toast.error(`${error}`, {autoClose: 3000});
  }
  finally{
    loading.value = false;
  }
}

function selectPayment(payment: Payment) {
  selectedPayment.value = payment;
}

async function submitForm() {
  // Collect data for all selected or modified payments
  const payment = payments.value
    .filter(payment => payment.isSelected || payment.isModified) // Assume you mark modified payments
    .map(payment => ({
      id: payment.id, // Include ID to identify payment on the backend
      balance: payment.balance,
      amount_due: payment.amount_due,
      amount_interest: payment.amount_interest,
      amount_paid: payment.amount_paid,
      payment_status_code: payment.payment_status_code,
      notes: payment.notes,
    }));

  const payload = {
    payment,
    customer_id: selectedCustomer.value,
    loan_application_no: selectedLoan.value,
  }

  //save the value to api service
  loanApplicationService.loan_application_no = selectedLoan.value;



  if (payment.length === 0) {
    toast.error('No payments selected or modified to submit!', { autoClose: 3000 });
    return;
  }

  try {
    // Send batch data to the backend
    const response = await apiService.createPayment(payload); // Ensure this endpoint handles batch updates

    toast.success('Payment data submitted successfully!', { autoClose: 3000 });

    //navigateTo('/payments')

    // Optionally, refresh payments list or clear selections
    payments.value.forEach(payment => (payment.isSelected = false));
    await fetchPayments();
  } catch (error) {
    toast.error(`Failed to submit payment data: ${error}`, { autoClose: 3000 });
  }
  finally{
    setTimeout(() => {
    }, 3000);
  }
}


function cancelForm() {
    navigateTo('/payments/');
}


onMounted(async () => {

  //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authPaymentCreate({})
    state_response.value = response.message;
    fetchCustomers();
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/payments`)
          }, 2000);
    }
  }

});
</script>

<style>
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

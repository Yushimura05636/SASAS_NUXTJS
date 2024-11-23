<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Payment Form</h2>
      <form @submit.prevent="submitPayment">
        <div class="mb-4">
          <label for="customer_id" class="block text-sm font-medium text-gray-700">Customer</label>
          <select
            v-model="payment.customer_id"
            id="customer_id"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Select a customer</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
        </div>
  
        <div class="mb-4">
          <label for="loan_application_id" class="block text-sm font-medium text-gray-700">Loan Application</label>
          <select
            v-model="payment.loan_application_id"
            id="loan_application_id"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Select a loan application</option>
            <option v-for="loan in loans" :key="loan.id" :value="loan.id">
              {{ loan.description }} <!-- Change according to your loan structure -->
            </option>
          </select>
        </div>
  
        <div class="mb-4">
          <label for="amount_paid" class="block text-sm font-medium text-gray-700">Amount Paid</label>
          <input
            v-model="payment.amount_paid"
            type="number"
            id="amount_paid"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
  
        <div class="mb-4">
          <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            v-model="payment.notes"
            id="notes"
            rows="3"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          ></textarea>
        </div>
  
        <div class="mb-4">
          <label for="payment_schedule_id" class="block text-sm font-medium text-gray-700">Payment Schedule ID</label>
          <input
            v-model="payment.payment_schedule_id"
            type="number"
            id="payment_schedule_id"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
  
        <button type="submit" class="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600">
          Submit Payment
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">

import { ref, onMounted } from 'vue';

const payment = ref({
  customer_id: null,
  loan_application_id: null, // Updated to include loan application ID
  amount_paid: null,
  notes: '',
  payment_schedule_id: null,
});

const customers = ref([]);
const loans = ref([]); // Store loan applications

// Fetch customers from the API
const fetchCustomers = async () => {
  try {
    const response = await fetch('/api/customers'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    customers.value = data; // Assuming data is an array of customers
  } catch (error) {
    console.error('Error fetching customers:', error);
    // Handle error (e.g., show an error message)
  }
};

// Fetch loan applications from the API
const fetchLoans = async () => {
  try {
    const response = await fetch('/api/loans'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    loans.value = data; // Assuming data is an array of loans
  } catch (error) {
    console.error('Error fetching loans:', error);
    // Handle error (e.g., show an error message)
  }
};

const submitPayment = async () => {
  try {
    const response = await apiService.createPayment({});

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Payment submitted successfully:', data);
    // Handle success (e.g., show a success message, reset form, etc.)
  } catch (error) {
    console.error('Error submitting payment:', error);
    // Handle error (e.g., show an error message)
  }
};

// Fetch customers when the component is mounted
onMounted(() => {
  fetchCustomers();
});
</script>

<style scoped>
/* Add any additional styling if needed */
</style>

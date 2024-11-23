<template>
    <NuxtLayout name="admin">
        <div v-if="state.payment && state.customer" id="print-section" class="max-w-lg mx-auto bg-gray-100 shadow-lg rounded-lg p-8 border border-gray-200">
      <div class="flex justify-between items-center mb-4 border-b pb-2 border-gray-300">
        <h1 class="text-2xl font-bold text-gray-800">Receipt</h1>
        <span class="text-gray-500 text-sm">Reference No #{{ state.payment.data.id }}</span>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div class="text-gray-800 font-medium text-lg">Customer Information</div>
        <div class="border-l-4 border-blue-500 pl-4">
          <p class="text-gray-700"><span class="font-semibold">Customer Name:</span> {{ state.customer.personality.last_name }} {{ state.customer.personality.first_name }} {{ state.customer.personality.middle_name }}</p>
          <p class="text-gray-700"><span class="font-semibold">Prepared By:</span> {{ state.payment.user.last_name }} {{ state.payment.user.first_name }} {{ state.payment.user.middle_name }}</p>
        </div>

        <div class="text-gray-800 font-medium text-lg mt-4">Payment Details</div>
        <div class="border-l-4 border-blue-500 pl-4">
          <p class="text-gray-700"><span class="font-semibold">Amount Paid:</span> ₱{{ state.payment.data.amount_paid }}</p>
          <p class="text-gray-700"><span class="font-semibold">Status:</span> {{ state.payment.data.document_status_code }}</p>
          <p class="text-gray-700"><span class="font-semibold">Date:</span> {{ formatDate(state.payment.data.prepared_at) }}</p>
        </div>
      </div>
      <div class="flex justify-center gap-4 mt-6">
        <button @click="printReceipt" class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors">
          Print Receipt
        </button>
        <button @click="okayAction" class="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-400 transition-colors">
          Okay
        </button>
      </div>
    </div>

    <div v-else class="text-center mt-8">
      <p class="text-gray-500">Loading payment information...</p>
    </div>
    </NuxtLayout>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { apiService } from '~/routes/api/API';
  import { loanApplicationService } from '~/models/LoanApplication';
  import { paymentServices } from '~/models/Payments';

  const state = ref({
    payment: null,
    customer: null,
  });

  async function fetchPaymentData(paymentId: number) {
    try {
      const response = await apiService.getPaymentByIdNoAuth({}, paymentServices.id);
      const customerData = await apiService.getCustomerByIdNoAuth({}, response.data.customer_id);
      debugger;
      state.value.payment = response;
      state.value.customer = customerData;
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  function printReceipt() {
    const printContents = document.getElementById('print-section')?.innerHTML;
    if (printContents) {
      const printWindow = window.open('', '', 'width=600,height=400');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Payment Receipt</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 p-8">
              <div class="max-w-lg mx-auto">${printContents}</div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  }

  function okayAction() {
    navigateTo('/payments/')
  }

  // Fetch data when component mounts
  onMounted(() => {
    const paymentId = 101; // Replace with dynamic ID if needed
    fetchPaymentData(paymentId);
  });
  </script>

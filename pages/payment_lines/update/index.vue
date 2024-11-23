<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Update Payment Line</h1>
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md">
        <div class="mb-4">
          <label for="paymentLineId" class="block text-gray-700">Payment Line ID</label>
          <input 
            type="text" 
            id="paymentLineId" 
            v-model="paymentLineId" 
            class="border rounded w-full py-2 px-3 mt-1" 
            disabled
          />
        </div>
        <div class="mb-4">
          <label for="payment" class="block text-gray-700">Payment</label>
          <input 
            type="text" 
            id="payment" 
            v-model="payment" 
            class="border rounded w-full py-2 px-3 mt-1" 
          />
        </div>
        <div class="mb-4">
          <label for="paymentSchedule" class="block text-gray-700">Payment Schedule</label>
          <input 
            type="date" 
            id="paymentSchedule" 
            v-model="paymentSchedule" 
            class="border rounded w-full py-2 px-3 mt-1" 
          />
        </div>
        <div class="mb-4">
          <label for="balance" class="block text-gray-700">Balance</label>
          <input 
            type="text" 
            id="balance" 
            v-model="balance" 
            class="border rounded w-full py-2 px-3 mt-1" 
          />
        </div>
        <div class="mb-4">
          <label for="amountPaid" class="block text-gray-700">Amount Paid</label>
          <input 
            type="text" 
            id="amountPaid" 
            v-model="amountPaid" 
            class="border rounded w-full py-2 px-3 mt-1" 
          />
        </div>
        <div class="mb-4">
          <label for="remarks" class="block text-gray-700">Remarks</label>
          <input 
            type="text" 
            id="remarks" 
            v-model="remarks" 
            class="border rounded w-full py-2 px-3 mt-1" 
          />
        </div>
        <div class="flex space-x-2">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button type="button" @click="handleCancel" class="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const paymentLineId = ref('');
  const payment = ref('');
  const paymentSchedule = ref('');
  const balance = ref('');
  const amountPaid = ref('');
  const remarks = ref('');
  
  const router = useRouter();
  const route = useRoute();
  
  const loadPaymentLineData = () => {
    const id = route.params.id; // Assuming `id` is passed via the route params
    // Fetch existing payment line data using the `id`
    // This can be an API call or fetching from a store/state
    // For example:
    // const data = await fetchPaymentLine(id);
    // Simulated fetch data
    const existingData = {
      paymentLineId: 'PL001',
      payment: 'Payment001',
      paymentSchedule: '2024-11-01',
      balance: '2000',
      amountPaid: '1500',
      remarks: 'Update remarks'
    };
  
    // Pre-fill the form with existing data
    paymentLineId.value = existingData.paymentLineId;
    payment.value = existingData.payment;
    paymentSchedule.value = existingData.paymentSchedule;
    balance.value = existingData.balance;
    amountPaid.value = existingData.amountPaid;
    remarks.value = existingData.remarks;
  };
  
  onMounted(() => {
    loadPaymentLineData(); // Load data when the component is mounted
  });
  
  const handleSubmit = () => {
    // Handle form submission and update logic here
    console.log('Payment Line Updated:', {
      paymentLineId: paymentLineId.value,
      payment: payment.value,
      paymentSchedule: paymentSchedule.value,
      balance: balance.value,
      amountPaid: amountPaid.value,
      remarks: remarks.value
    });
    // Redirect to payment lines table after updating
    router.push('/paymentLine_Table/Payment_Line'); // Assuming the route is '/payment-lines'
  };
  
  const handleCancel = () => {
    router.push('/paymentLine_Table/Payment_Line'); // Redirect to payment lines page on cancel
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Roboto', sans-serif;
  }
  </style>
  
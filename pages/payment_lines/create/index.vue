<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Create Payment Line</h1>
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md">
        <div class="mb-4">
          <label for="paymentLineId" class="block text-gray-700">Payment Line ID</label>
          <input 
            type="text" 
            id="paymentLineId" 
            v-model="paymentLineId" 
            class="border rounded w-full py-2 px-3 mt-1" 
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
          <!-- Changed input type to 'date' -->
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
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Create</button>
          <button type="button" @click="handleCancel" class="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const paymentLineId = ref('');
  const payment = ref('');
  const paymentSchedule = ref('');  // Now bound to a date input
  const balance = ref('');
  const amountPaid = ref('');
  const remarks = ref('');
  
  const router = useRouter();
  
  const handleSubmit = () => {
    // Handle form submission, you can integrate your business logic here
    console.log('Payment Line Created:', {
      paymentLineId: paymentLineId.value,
      payment: payment.value,
      paymentSchedule: paymentSchedule.value,
      balance: balance.value,
      amountPaid: amountPaid.value,
      remarks: remarks.value,
    });
    // After form submission, redirect to the payment line table
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
  
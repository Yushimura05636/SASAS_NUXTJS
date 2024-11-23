<template>
  <NuxtLayout name="admin">
    <div class="bg-white p-6 md:p-8 max-w-lg mx-auto shadow-lg rounded-lg mt-12"> <!-- Added margin-top -->
      <h2 class="text-gray-800 text-2xl font-bold mb-6 text-center">Loan Count Form</h2>

      <form @submit.prevent="submitForm">
        <div class="space-y-4">

          <!-- Loan Count Field (Integer) -->
          <div>
            <label for="loanCount" class="block text-gray-700 font-medium">Loan Count</label>
            <input
              v-model="loanCount"
              type="number"
              id="loanCount"
              placeholder="Enter loan count"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required />
          </div>

          <!-- Min Amount Field (Decimal/Money) -->
          <div>
            <label for="minAmount" class="block text-gray-700 font-medium">Min Amount</label>
            <input
              v-model="minAmount"
              type="number"
              step="0.01"
              id="minAmount"
              placeholder="Enter minimum amount"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required />
          </div>

          <!-- Max Amount Field (Decimal/Money) -->
          <div>
            <label for="maxAmount" class="block text-gray-700 font-medium">Max Amount</label>
            <input
              v-model="maxAmount"
              type="number"
              step="0.01"
              id="maxAmount"
              placeholder="Enter maximum amount"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required />
          </div>

        </div>

        <div class="mt-6 text-center flex justify-center space-x-4">
          <button type="submit" class="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Submit
          </button>
          <button type="button" @click="cancelForm" class="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Cancel
          </button>
        </div>

        <div v-if="submitted" class="mt-4 text-center text-green-500">
          Form submitted successfully!
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref } from 'vue';
import { PermissionService } from '~/models/Permission';
import { apiService } from '~/routes/api/API';
import { useRouter } from 'vue-router';



const loanCount = ref<number | null>(null);
const minAmount = ref<number | null>(null);
const maxAmount = ref<number | null>(null);
const submitted = ref(false);
const router = useRouter(); // Using the router to navigate

const submitForm = async () => {
  try {
      const params = {
          loan_count: loanCount.value,
          min_amount: minAmount.value,
          max_amount: maxAmount.value
      }
      const response = await apiService.createLoanCount(params);
      submitted.value = true;
          toast.success("Loan count created successfully!", {
                autoClose: 2000,
                });
                // Introduce a delay before navigating
                setTimeout(() => {
                    navigateTo('/loan_counts');
                }, 2000);
                 // Redirect to the customer list page
      console.log({
          loanCount: loanCount.value,
          minAmount: minAmount.value,
          maxAmount: maxAmount.value
      });
  } catch (error) {
      toast.error(error+"Error");
  } finally {
      loanCount.value = null;
      minAmount.value = null;
      maxAmount.value = null;

      // router.push('/loancount'); // Using the router to navigate
  }
};

// Method to handle the cancel action
const cancelForm = () => {
  loanCount.value = null;
  minAmount.value = null;
  maxAmount.value = null;
  router.push('/loan_counts'); // Redirect to the loan count page
};

onMounted(async () => {
//Promise for authentication
const state_response = ref('');
  try {
      const response = await apiService.authLoanCountsCreate({})
      state_response.value = response.message;
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
}
finally
{
    if(state_response.value.length <= 0)
    {
        setTimeout(() => {
        navigateTo(`/loan_counts`)
        }, 2000);
    }
  }
})
</script>

<style scoped>
/* Added margin to prevent form from sticking to the top of the screen */
.mt-12 {
  margin-top: 3rem; /* This is the margin-top added for spacing */
}
</style>

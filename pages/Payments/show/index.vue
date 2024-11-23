<template>
  <NuxtLayout name="admin">
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Show Payment</h1>

      <div class="space-y-4">
        <!-- First Name Field -->
        <div>
          <label for="first_name" class="block mb-1">First Name:</label>
          <input
            type="text"
            id="first_name"
            :value="paymentData.first_name"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <!-- Family Name Field -->
        <div>
          <label for="family_name" class="block mb-1">Family Name:</label>
          <input
            type="text"
            id="family_name"
            :value="paymentData.family_name"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <!-- Middle Name Field -->
        <div>
          <label for="middle_name" class="block mb-1">Middle Name:</label>
          <input
            type="text"
            id="middle_name"
            :value="paymentData.middle_name"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <!-- Document Status Description Field -->
        <div>
          <label for="document_status_description" class="block mb-1">Document Status Description:</label>
          <input
            type="text"
            id="document_status_description"
            :value="paymentData.document_status_description"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <!-- Amount Paid Field -->
        <div>
          <label for="amount_paid" class="block mb-1">Amount Paid:</label>
          <input
            type="number"
            id="amount_paid"
            :value="paymentData.amount_paid"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <!-- Loan Application No Field -->
        <div>
          <label for="loan_application_no" class="block mb-1">Loan Application No:</label>
          <input
            type="text"
            id="loan_application_no"
            :value="paymentData.loan_application_no"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <!-- Prepared At Field -->
        <div>
          <label for="prepared_at" class="block mb-1">Prepared At:</label>
          <input
            type="datetime-local"
            id="prepared_at"
            :value="paymentData.prepared_at"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <div>
          <label for="user_name" class="block mb-1">Prepared At:</label>
          <input
            type="text"
            id="user_name"
            :value="userData.last_name + ' ' + userData.first_name + ' ' + userData.middle_name"
            class="border rounded px-4 py-2 w-full"
            readonly
          />
        </div>

        <!-- Notes Field -->
        <div>
          <label for="notes" class="block mb-1">Notes:</label>
          <textarea
            id="notes"
            :value="paymentData.notes"
            class="border rounded px-4 py-2 w-full"
            readonly
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4">
          <button type="button" @click="acceptPayment" class="bg-green-500 text-white px-4 py-2 rounded">
            Accept
          </button>
          <button type="button" @click="rejectPayment" class="bg-red-500 text-white px-4 py-2 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
  <script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { paymentServices } from '~/models/Payments';
  import { apiService } from '~/routes/api/API';
import { loanApplicationService } from '~/models/LoanApplication';
import { CustomersService } from '~/models/Customer';

  const route = useRoute();
  const router = useRouter();
  const paymentData = ref({
    id: null,
    loan_application_no: '',
    customer_id: '',
    prepared_at: '',
    document_status_code: '',
    prepared_by_id: '',
    amount_paid: '',
    notes: '',
    family_name: '',
    first_name: '',
    middle_name: '',
    document_status_description: '',
  });
  const userData = ref({
    last_name: '',
    first_name: '',
    middle_name: '',
  })

  const state = {
    payment: null,
    customer: null,
  }

  const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}

  // Fetch the selected payment data when the component is mounted
  async function fetchPayment() {
    try {
      const response = await apiService.getPaymentByIdNoAuth({}, paymentServices.id);
      const payment = response.data;
      const user = response.user;
      state.payment = response.data;
      state.customer = response.user;
      paymentData.value = payment;
      userData.value = user;

      debugger
    } catch (error) {
      toast.error(`${error}`, { autoClose: 3000 });
    }
  }

  // Call fetchPayment when the component is mounted
  onMounted(async () => {

    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authPaymentView({})
    state_response.value = response.message;
    fetchPayment();
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

  // Accept payment function
  async function acceptPayment() {
    try {
        //get the loan application no
        loanApplicationService.loan_application_no = state.payment.loan_application_no;
        CustomersService.id = state.payment.customer_id;
      await apiService.approvePayment({state}, paymentServices.id);
      toast.success('Payment accepted successfully!', { autoClose: 3000 });
      navigateTo('/payments/show/receipt');
    } catch (error) {
      toast.error(`Failed to accept payment: ${error}`, { autoClose: 3000 });
    }
    finally{
      setTimeout(() => {
      }, 3000);
    }
  }

  // Reject payment function
  async function rejectPayment() {
    try {

      //get the loan application no
      loanApplicationService.loan_application_no = state.payment.loan_application_no;
      CustomersService.id = state.payment.customer_id;
      paymentServices.id = state.payment.id;

      const jsonObject = {
        state,
        payment_status_description: 'Reject',
      }

      const response = await apiService.rejectPayment({jsonObject}, state.payment.customer_id);
      toast.success('Payment rejected successfully!', { autoClose: 3000 });
      setTimeout(() => {
        router.push('/payments');
      }, 3000);
    } catch (error) {
      toast.error(`Failed to reject payment: ${error}`, { autoClose: 3000 });
    }
    finally{
      setTimeout(() => {
      }, 3000);
    }
  }
  </script>

  <style scoped>
  body {
    font-family: 'Roboto', sans-serif;
  }
  </style>

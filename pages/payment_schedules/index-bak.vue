<template>
  <NuxtLayout name="admin">
  <div class="p-8">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Schedules</h1>
      <div class="flex space-x-2">
        <button @click="updatePayment" class="bg-yellow-500 text-white px-4 py-2 rounded">Pay</button>
        <button @click="deletePayment" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
    <div class="flex justify-center mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search payments"
        class="border rounded px-4 py-2 w-1/2"
      />
    </div>

    <div class="overflow-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-900 text-white">
          <tr>
            <th class="py-2 px-4">Select</th>
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
            <td colspan="9" class="text-center py-4 text-gray-500">No data found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="p-8">
  <div class="overflow-auto">
    <h1 class="text-2xl font-bold">Payments</h1>
  <table class="min-w-full bg-white">
    <thead class="bg-gray-900 text-white">
      <tr>
        <th class="py-2 px-4">Select</th>
        <th class="py-2 px-4">Family Name</th>
        <th class="py-2 px-4">First Name</th>
        <th class="py-2 px-4">Middle Name</th>
        <th class="py-2 px-4">Prepared At</th>
        <th class="py-2 px-4">Status Code</th>
        <th class="py-2 px-4">Prepared By</th>
        <th class="py-2 px-4">Amount Paid</th>
        <th class="py-2 px-4">Notes</th>
        <th class="py-2 px-4">Created At</th>
        <th class="py-2 px-4">Updated At</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(payment, index) in viewpayments" :key="index">
        <td class="text-center py-2">
          <input type="radio" name="selectPayment" v-model="selectedPayment" :value="payment.id">
        </td>
        <td class="py-2 px-4">{{ payment.family_name }}</td>
        <td class="py-2 px-4">{{ payment.first_name }}</td>
        <td class="py-2 px-4">{{ payment.middle_name }}</td>
        <td class="py-2 px-4">{{ payment.prepared_at }}</td>
        <td class="py-2 px-4">{{ payment.document_status_code }}</td>
        <td class="py-2 px-4">{{ payment.prepared_by_id}}</td>
        <td class="py-2 px-4">{{ payment.amount_paid }}</td>
        <td class="py-2 px-4">{{ payment.notes }}</td>
        <td class="py-2 px-4">{{ payment.created_at }}</td>
        <td class="py-2 px-4">{{ payment.updated_at }}</td>
      </tr>
      <tr v-if="viewpayments.length === 0">
        <td colspan="10" class="text-center py-4 text-gray-500">No data found</td>
      </tr>
    </tbody>
  </table>
</div>
</div>

<div class="p-8">
<div class="overflow-auto mt-4">
  <h1 class="text-2xl font-bold">Payment Lines</h1>
  <table class="min-w-full bg-white">
    <thead class="bg-gray-900 text-white">
      <tr>
        <th class="py-2 px-4">Select</th>
        <th class="py-2 px-4">Balance</th>
        <th class="py-2 px-4">Amount Paid</th>
        <th class="py-2 px-4">Remarks</th>
        <th class="py-2 px-4">Created At</th>
        <th class="py-2 px-4">Updated At</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(paymentLine, index) in viewpaymentLines" :key="index">
        <td class="text-center py-2">
          <input type="radio" name="selectPaymentLine" v-model="selectedPaymentLine" :value="paymentLine.id">
        </td>
        <td class="py-2 px-4">{{ paymentLine.balance }}</td>
        <td class="py-2 px-4">{{ paymentLine.amount_paid }}</td>
        <td class="py-2 px-4">{{ paymentLine.remakrs }}</td>
        <td class="py-2 px-4">{{ paymentLine.created_at }}</td>
        <td class="py-2 px-4">{{ paymentLine.updated_at }}</td>
      </tr>
      <tr v-if="viewpaymentLines.length === 0">
        <td colspan="9" class="text-center py-4 text-gray-500">No data found</td>
      </tr>
    </tbody>
  </table>
</div>
</div>

</NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { loanApplicationService } from '~/models/LoanApplication';
import { PageNameService } from '~/models/PageName';
import { paymentScheduleService } from '~/models/PaymentSchedules';
import { apiService } from '~/routes/api/API';

// Router instance
const router = useRouter();

// Payments data would typically be fetched from an API or passed as a prop
const payments = ref([]); // Assume this will be populated from an API or prop


// Reactive state for search and selected payment
const searchQuery = ref('');
const selectedPayment = ref<number | null>(null);
const viewpayments = ref('');
const viewpaymentLines = ref('');
const selectedCustomer = ref('');

const balance = ref('');

// Computed property to filter payments based on search query
const filteredPayments = computed(() => {
  if (!searchQuery.value) return payments.value;
  return payments.value.filter((payment) =>
    Object.values(payment).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

// Button functionalities
const createPayment = () => {
  router.push('/Payment_Table/CreatePayment');
};

// Redirect to the create payment page for updating payment
const updatePayment = () => {

  if (selectedPayment.value) {
    paymentScheduleService._id = selectedPayment.value;

    navigateTo('/payment_schedules/update')
  } else {
    alert('Please select a payment to update.');
  }
};

const getSelectedValue = (payment: any) => {

  paymentScheduleService._id = payment.id
  paymentScheduleService.customer_id = payment.customer_id
  paymentScheduleService.balance = payment.balance;
  loanApplicationService.loan_application_no = payment.loan_application_no;

  return payment.id
}

// Delete payment
const deletePayment = () => {
  if (selectedPayment.value) {
    const index = payments.value.findIndex(payment => payment.id === selectedPayment.value);
    if (index !== -1) {
      payments.value.splice(index, 1);
      selectedPayment.value = null;
      alert('Payment deleted successfully.');
    }
  } else {
    alert('Please select a payment to delete.');
  }
};

const fetchLoanSchedules = async () => {
  try {
    const response = await apiService.getPaymentScheduleAll({});
    payments.value = response.data;

  } catch (error) {
  }
}

const fetchPayment = async () => {
  try {
    const response = await apiService.getPayment({});
    viewpayments.value = response.data;

  } catch (error) {
  }
}

const fetchPaymentLine = async () => {
  try {
    const response = await apiService.getPaymentLine({});
    viewpaymentLines.value = response.data;

  } catch (error) {
  }
}

onMounted(() => {
    PageNameService.pageName = 'Payment Schedules'
  fetchLoanSchedules();
  fetchPayment();
  fetchPaymentLine();
})

</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
}
</style>

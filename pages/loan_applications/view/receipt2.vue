<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h1 style="text-align: center;">Loan Application Receipt</h1>
    <hr />

    <!-- Check if receiptData has data -->
    <div v-if="receiptData && receiptData.length > 0">
      <div
        v-for="(customer, index) in receiptData"
        :key="index"
        class="receipt-container"
        style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 20px; background-color: #f9f9f9;"
      >
        <h3 style="margin: 0 0 10px;">Customer {{ index + 1 }}</h3>
        <p><strong>Customer ID:</strong> {{ customer.customer_id }}</p>
        <p><strong>Loan Application No:</strong> {{ customer.loan_application_no }}</p>
        <p><strong>Loan Amount:</strong> {{ customer.amount_loan }}</p>
        <p><strong>Interest Amount:</strong> {{ customer.amount_interest }}</p>
        <p><strong>Amount Paid:</strong> {{ customer.amount_paid }}</p>
        <!-- <p>
          <strong>Fees:</strong>
          {{ customer.fees ? customer.fees.join(", ") : "No fees applied" }}
        </p> -->
        <p><strong>Payment Frequency:</strong> {{ customer.payment_frequency_id }}</p>
        <p><strong>Duration:</strong> {{ customer.payment_duration_id }}</p>
        <p><strong>Release Schedule:</strong> {{ customer.datetime_target_release }}</p>
        <p><strong>Prepared On:</strong> {{ customer.datetime_prepared }}</p>
        <!-- <p><strong>CoMaker</strong> {{ customer.coMaker || "None" }}</p> -->
        <!-- <p><strong>Notes:</strong> {{ customer.notes || "No additional notes" }}</p> -->
      </div>
    </div>

    <!-- Show this message if no data is available -->
    <p v-else style="text-align: center; color: red;">
      No receipt data available.
    </p>

    <!-- Buttons Section -->
    <div style="text-align: center; margin-top: 20px;">
      <button
        style="padding: 10px 20px; font-size: 16px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;"
        @click="goBack"
      >
        Back to Loan Applications
      </button>

      <!-- Print Button -->
      <button
        style="padding: 10px 20px; font-size: 16px; background-color: #28a745; color: #fff; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;"
        @click="printReceipt"
      >
        Print Receipt
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ReceiptPage",
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Retrieve receiptData from localStorage
    const receiptData = ref([]);

    onMounted(() => {
      const storedData = localStorage.getItem("receiptData");
      if (storedData) {
        receiptData.value = JSON.parse(storedData);
      }
    });

    const goBack = () => {
      router.push("/loan_applications"); // Navigate back to the loan applications list
    };

    const printReceipt = () => {
      window.print(); // Open the browser's print dialog
    };

    return {
      receiptData,
      goBack,
      printReceipt,
    };
  },
};
</script>

<style>
/* Ensure each receipt starts on a new page when printing */
.receipt-container {
  page-break-after: always;
}

/* Avoid an empty last page */
.receipt-container:last-child {
  page-break-after: auto;
}
</style>

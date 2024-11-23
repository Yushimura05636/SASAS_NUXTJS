<template>
    <NuxtLayout name="admin">
      <div class="container mx-auto p-6">
        <!-- Receipt Card -->
        <div class="bg-gray-50 shadow-xl rounded-xl p-8 max-w-2xl mx-auto" id="receipt">
          <!-- Header -->
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-semibold text-gray-800">Loan Receipt</h1>
            <div class="text-right">
              <p class="text-sm text-gray-500">Date: {{ formattedDate }}</p>
            </div>
          </div>

          <div v-if="isLoading">
            Loading...
          </div>

          <div v-else>
            <!-- Ensure loan and customer data exists before rendering -->
            <div v-if="loan && customer">
              <!-- Customer and Loan Info -->
              <div class="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 class="text-lg font-bold text-gray-700">Customer Information</h2>
                  <p class="text-gray-600"><strong>Name:</strong> {{ customer.personality.family_name }} {{ customer.personality.first_name }} {{ customer.personality.middle_name }}</p>
                  <p class="text-gray-600"><strong>Loan Number:</strong> {{ loan.loan_applications.loan_application_no }}</p>
                </div>

                <div class="text-right">
                  <h2 class="text-lg font-bold text-gray-700">Loan Details</h2>
                  <p class="text-gray-600"><strong>Amount Due:</strong> {{ formatCurrency(addAmountDue(loan.loan_applications.amount_loan , loan.loan_applications.amount_interest)) }}</p>
                  <p class="text-gray-600"><strong>Interest:</strong> {{ formatCurrency(loan.loan_applications.factor_rate_value) }}</p>

                  <!-- Fees (dynamically rendered) -->
                  <div v-if="loan.fees && loan.fees.length">
                    <h3 class="text-md font-bold text-gray-600 mb-2">Fees:</h3>
                    <ul class="list-disc list-inside">
                      <li v-for="(fee, index) in loan.fees" :key="index" class="text-gray-600">
                        <span><strong>{{ fee.description }}:</strong> {{ formatCurrency(fee.amount) }} </span>
                      </li>
                    </ul>
                  </div>

                  <!-- If there are no fees, show this message -->
                  <div v-else>
                    <p class="text-gray-500">No fees available.</p>
                  </div>
                  <hr class="my-2 border-gray-300" />
                  <p class="text-lg font-bold text-gray-900"><strong>Total Amount:</strong>
                    {{ formatCurrency(calculateTotalAmount(loan.loan_applications.amount_loan, loan.loan_applications.amount_interest, loan.fees)) }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-gray-500">No loan information available.</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-between items-center mt-8">
            <p class="text-gray-500 text-sm">Thank you for your business.</p>
            <div class="flex space-x-4"> <!-- Added space between buttons -->
              <button
                class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:shadow-md transition-all"
                @click="printReceipt"
              >
                Print Receipt
              </button>
              <button
                class="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg hover:shadow-md transition-all"
                @click="handleOk"
              >
                OK
              </button>
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
  import { apiService } from '~/routes/api/API';

  const loan = ref({});
  const customer = ref({});
  const isLoading = ref(true);
  const formattedDate = new Date().toLocaleDateString();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  const calculateTotalAmount = (amountLoan, amountInterest, fees) => {
    // Calculate Amount Due
    const amountDue = addAmountDue(amountLoan, amountInterest);
    // Calculate Total Fees
    const totalFees = fees.reduce((sum, fee) => sum + parseFloat(fee.amount), 0);
    // Return Total Amount
    return amountDue + totalFees;
  };

  const addAmountDue = (amountLoan: any, amountInterest: any) => {
    // Convert to float
    amountLoan = parseFloat(amountLoan);
    amountInterest = parseFloat(amountInterest);
    return amountLoan + amountInterest; // Adjust as necessary based on your logic
  };

  const printReceipt = () => {
    const receipt = document.getElementById('receipt');
    const win = window.open('', 'PrintWindow');
    win?.document.write('<html><head><title>Loan Receipt</title><style>' + getPrintStyles() + '</style></head><body>' + receipt?.innerHTML + '</body></html>');
    win?.document.close();
    win?.focus();
    win?.print();
    win?.close();
  };

  const getPrintStyles = () => `
    /* General styles for the print version */
    body {
      font-family: Arial, sans-serif;
      color: #333;
      line-height: 1.5;
      margin: 0;
      padding: 20px;
    }

    h1 {
      font-size: 24px;
      color: #111;
      text-align: center;
      margin-bottom: 20px;
    }

    h2, h3 {
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      margin-bottom: 5px;
    }

    /* Layout for sections */
    .grid {
      display: flex;
      justify-content: space-between;
    }

    /* Add table-like borders for clarity */
    .grid div {
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    /* Footer */
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-top: 20px;
    }

    /* Subtle lines to separate sections */
    hr {
      border: 0;
      height: 1px;
      background: #ddd;
      margin: 20px 0;
    }
  `;

  async function fetchLoanDetails() {
    try {
      // Search for loan
      const loanData = await apiService.getLoanApplicationByLoanNoNoAUTH({}, loanApplicationService.loan_application_no);
      //const loanData = await apiService.getLoanApplicationByLoanNoNoAUTH({}, 'LN-USMNKWOQ9662');
      // Search for customer
      const customerData = await apiService.getCustomerByIdNoAuth({}, loanData.data.loan_applications.customer_id);
      //const customerData = await apiService.getCustomerByIdNoAuth({}, 4);
      loan.value = loanData.data;
      customer.value = customerData;
      debugger;
    } catch (error) {
      toast.error(`Error Message: ${error}`, {
        autoClose: 5000
      });
    } finally {
      isLoading.value = false;
    }
  }

  function handleOk() {
    navigateTo('/loan_applications/');
  }

  // Fetch all function
  onMounted(() => {
    fetchLoanDetails();
  });
  </script>

  <style scoped>
  /* On-screen style */
  @media print {
    body * {
      visibility: hidden;
    }
    #receipt, #receipt * {
      visibility: visible;
    }
    #receipt {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin: 0;
    }
  }
  </style>

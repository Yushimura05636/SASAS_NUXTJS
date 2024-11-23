<template>
    <NuxtLayout name="admin">
      <div class="p-8">
        <!-- Header and Action Buttons -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <h1 class="text-2xl font-bold">Payment Line</h1>
          <!-- <div class="flex space-x-2">
            <button @click="" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Update
            </button>
            <button @click="" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Delete
            </button>
          </div> -->
        </div>

        <!-- Search Bar -->
        <div class="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search payment lines"
            v-model="state.searchQuery"
            class="border rounded px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto">
          <Table
            class="w-full"
            :columnHeaders="state.columnHeaders"
            :data="state.paymentLine"
            :isLoading="state.isTableLoading"
            :sortData="state.sortData"
          >
            <template #body v-if="!(state.isTableLoading || (state.paymentLine?.data === 0))">
              <tr v-for="(paymentLine, index) in state.paymentLine?.data" :key="index" class="hover:bg-gray-50 transition">
                <td class="py-2 px-4 border-b border-gray-300">
                  <input type="radio" :value="paymentLine.id" v-model="selectedPaymentLine" class="cursor-pointer" />
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ paymentLine.payment_id }} </span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ paymentLine.payment_schedule_id }}</span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ paymentLine.balance }}</span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ paymentLine.amount_paid }}</span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span>{{ paymentLine.remarks }}</span>
                </td>
              </tr>
              <tr v-if="state.paymentLine.length === 0">
                <td colspan="6" class="text-center py-6 text-gray-500">No payment lines found</td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </NuxtLayout>
  </template>

  <script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import { ref, reactive, onMounted } from 'vue';
  import { apiService } from '~/routes/api/API';
import { PageNameService } from '~/models/PageName';

  const state = reactive({
    columnHeaders: [
      { name: 'Select' },
      { name: 'Payment ID' },
      { name: 'Payment Schedule ID' },
      { name: 'Balance' },
      { name: 'Amount Paid' },
      { name: 'Remarks' },
    ],
    error: null,
    isTableLoading: false,
    sortData: {
      sortField: 'id',
      sortOrder: 'descend',
    },
    paymentLine: [],
    searchQuery: '',
  });

  let selectedPaymentLine = ref(null);

  async function fetchPaymentLine() {
    state.isTableLoading = true;
    state.error = null;
    try {
      const response = await apiService.getPaymentLine({});
      state.paymentLine = response;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 5000 });
    }
    state.isTableLoading = false;
  }

  onMounted(() => {
    fetchPaymentLine();
  });
  </script>

  <style scoped>
  body {
    font-family: 'Roboto', sans-serif;
  }
  </style>

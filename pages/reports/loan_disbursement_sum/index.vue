<template>
    <NuxtLayout name="admin">
        <div class="p-4">
            <div class="max-w-screen-xl mx-auto px-4 md:px-8">
                <div class="font-bold text-2xl mb-4">Loan Disbursement Summary</div>
    
                <!-- Action Buttons -->
                <div class="flex justify-between items-center mb-8 mt-8">
                    <div class="flex space-x-4">
                        <button @click="printTable" class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                            Generate Report
                        </button>
                    </div>
                </div>
                <div v-if="state.isTableLoading" class="text-center">Loading...</div>
    
                <!-- Chart Container with Flex for Side-by-Side Alignment -->
                <div v-else class="flex flex-wrap justify-center gap-8">
                    <div class="flex-1 text-center">
                        <BarChart :data="BarchartData" />
                    </div>
                </div>
            </div>
        </div>
    
        <div id="printable-area" class="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead class="bg-gray-300 text-gray-700 text-sm">
                <tr>
                    <th class="px-6 py-4 border-b text-left">Customer ID</th>
                    <th class="px-6 py-4 border-b text-left">Customer Name</th>
                    <th class="px-6 py-4 border-b text-left">Disbursed Amount</th>
                    <th class="px-6 py-4 border-b text-left">Amount Interest</th>
                </tr>
                </thead>
                <tbody>
                <!-- Loop through each customer and their payments -->
                <template v-for="customer in state.totalLoanPerCustomer" :key="customer.customer_id">
                    <tr class="hover:bg-gray-50 transition duration-150">
                        <td class="px-6 py-4 border-b">{{ customer.customer_id }}</td>
                        <td class="px-6 py-4 border-b">{{ customer.customer_name }}</td>
                        <td class="px-6 py-4 border-b">{{ customer.total_loan_amount }}</td>
                        <td class="px-6 py-4 border-b">{{ customer.total_amount_interest }}</td>
                    </tr>
                </template>
                </tbody>
                <tfoot>
                    <!-- Total Row -->
                    <tr class="font-bold bg-gray-200">
                        <td class="px-6 py-4 border-b" colspan="3"><strong>Total Disbursed Amount</strong></td>
                        <td class="px-6 py-4 border-b"><strong>{{ state.totalLoanAmount }}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import BarChart from '~/components/graphs/BarChart.vue';
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { apiService } from '~/routes/api/API';

const state = ref({
    totalLoanAmount: 0,
    totalAmountInterest: 0,
    disburse: [],
    totalLoanPerCustomer: [],
    isTableLoading: true,
});

const BarchartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Total Loan Disbursed', 
            data: [], 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
});

const fetchCollectionReports = async () => {
    try {
        const response = await apiService.getDisburse({});

        // Handle the response data to populate state
        state.value.totalLoanAmount = response.total_loan_amount;
        state.value.totalAmountInterest = response.total_amount_interest;
        state.value.totalLoanPerCustomer = response.total_loan_per_customer;

        const totalPaymentsByMonth = response.disbursed_by_month;

        // Set chart data based on the month's disbursement totals
        BarchartData.value.datasets[0].data = BarchartData.value.labels.map((month, index) => {
            const monthKey = `${String(index + 1).padStart(2, '0')}-${new Date().getFullYear()}`;
            return totalPaymentsByMonth[monthKey] || 0;
        });

        state.value.isTableLoading = false;
    } catch (error) {
        toast.error(error.message, {
            autoClose: 5000,
        });
    }
};

// Print table function
const printTable = () => {
    const printContent = document.getElementById('printable-area');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Report</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table, th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            ${printContent.innerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
};

// Fetch data on component mount
onMounted(async () => {
    fetchCollectionReports();
});
</script>

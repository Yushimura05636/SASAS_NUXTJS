<template>
    <NuxtLayout name="admin">
        <div class="p-4">
            <div class="max-w-screen-xl mx-auto px-4 md:px-8">
                <div class="font-bold text-2xl mb-4">Summary of Balances</div>
    
                <!-- Action Buttons -->
                <div class="flex justify-between items-center mb-8 mt-8">
                    <div class="flex space-x-4">
                        <button @click="printTable"  class=  "px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                            Generate Report
                        </button>
                    </div>
                </div>
    
                <!-- Doughnut Chart Section -->
                <div class="flex-1 text-center w-full sm:w-64 md:w-96 lg:w-1/2 xl:w-1/3 h-auto mx-auto">
                    <h2 class="font-semibold text-lg mb-4">Summary of Balances</h2>
                    <DoughnutChart :data="chartData" />
                </div>
            </div>

            <div  id= "printable-area" class="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
                <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead class="bg-gray-300 text-gray-700 text-sm">
                        <tr>
                            <th class="px-6 py-4 border-b text-left">Customer ID</th>
                            <th class="px-6 py-4 border-b text-left">Customer Name</th>
                            <th class="px-6 py-4 border-b text-left">Due Date</th>
                            <th class="px-6 py-4 border-b text-left">Unsettled Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loop through each customer and their payments -->
                        <template v-for="balances in statee.balances" :key="balances.customer_id">
                            <tr class="hover:bg-gray-50 transition duration-150">
                                <td class="px-6 py-4 border-b">{{ balances.customer_id }}</td>
                                <td class="px-6 py-4 border-b">{{ balances.customer_name }}</td>
                                <td class="px-6 py-4 border-b">{{ balances.latest_due_date }}</td>
                                <td class="px-6 py-4 border-b">{{ balances.total_balance }}</td>
                            </tr>
                        </template>
                    </tbody>
                    <tfoot>
                        <tr class="font-bold bg-gray-200">
                            <td class="px-6 py-4 border-b" colspan="3"><strong>Total Balance</strong></td>
                            <td class="px-6 py-4 border-b"><strong>{{ formattedTotalUnpaidBalance }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import DoughnutChart from '~/components/graphs/DoughnutChart.vue';
import { ref, onMounted, reactive, computed } from 'vue';
import { apiService } from '~/routes/api/API';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const statee = ref({
    balances: [],
    totalUnpaidBalance: null,
    totalAmountToCollect: null,
    isTableLoading: true,
});

const state = reactive({
    progress: 0, // Initial progress value in percentage
    //totalBalanceTarget: statee.value.totalAmountToCollect // Define the total target balance
});

// Fetch balance report from API and calculate progress
const fetchBalanceReport = async () => {
    const response = await apiService.getBalances({});
    console.log("API Response:", response);
    
    // Assign values from API response to reactive state
    statee.value.balances = response.total_balance_per_customer;
    statee.value.totalAmountToCollect = parseFloat(response.total_amount_to_collect.replace(/,/g, ''));
    statee.value.totalUnpaidBalance = parseFloat(response.total_unpaid_balance.replace(/,/g, '')); // Remove commas if present

    console.log( "Value: ",statee.value.totalAmountToCollect);
    // Calculate progress based on total unpaid balance and target balance
    state.progress = ((statee.value.totalAmountToCollect - statee.value.totalUnpaidBalance) / statee.value.totalAmountToCollect) * 100;

    state.progress = Math.max(0, Math.min(100, state.progress)); // Ensure progress is within 0-100%
};

// Calculate dynamic colors based on progress
const getBackgroundColor = (progress) => {
    if (progress <= 33) {
        return ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'];
    } else if (progress <= 80) {
        return ['rgb(255, 159, 64)', 'rgb(75, 192, 162)'];
    } else {
        return ['rgb(75, 192, 192)', 'rgb(75, 192, 75)'];
    }
};

// Chart data as a computed property to dynamically update
const chartData = computed(() => ({
    labels: ['Remaining', 'Already Collected'],
    datasets: [
        {
            label: 'Balance',
            data: [100 - state.progress, state.progress], // Remaining first, then Collected
            backgroundColor: getBackgroundColor(state.progress),
            hoverOffset: 4,
        },
    ],
}));


// Computed property to format total unpaid balance with commas and two decimal places
const formattedTotalUnpaidBalance = computed(() => {
    return statee.value.totalUnpaidBalance?.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }) || '0.00';
});

// Print function
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


// Fetch balance report when the component mounts
onMounted(async () => {
    await fetchBalanceReport();
});
</script>

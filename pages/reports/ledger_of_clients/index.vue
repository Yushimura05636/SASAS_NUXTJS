<template>
    <NuxtLayout name="admin">
        <div class="p-4">
            <div class="max-w-screen-xl mx-auto px-4 md:px-8">
                <div class="font-bold text-2xl mb-4">Ledger of Clients</div>
    
                <!-- Action Buttons -->
                <div class="flex justify-between items-center mb-8 mt-8">
                    <div class="flex space-x-4">
                        <button @click="printTable"  class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                            Generate Report
                        </button>
                    </div>
                </div>
    
                <!-- Chart Container with Flex for Side-by-Side Alignment -->
                <!-- Pie Chart Section -->
                <!-- <div class="flex flex-wrap justify-center gap-8">
                    <div class="flex-1 text-center">
                        <h2 class="font-semibold text-lg mb-4">Collection Pie Report</h2>
                        <PieChart :data="chartData" />
                    </div>
                </div> -->

                <div id="printable-area" class="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto text-centr">
                    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead class="bg-gray-300 text-gray-700 text-sm">
                        <tr>
                            <th class="px-6 py-4 border-b text-left"> Date</th>
                            <th class="px-6 py-4 border-b text-left">Customer Name</th>
                            <th class="px-6 py-4 border-b text-left">Type of Transaction</th>
                            <th class="px-6 py-4 border-b text-left">Amount Due</th>
                            <th class="px-6 py-4 border-b text-left">Amount Interest</th>
                            <th class="px-6 py-4 border-b text-left">Amount Paid</th>
                            <th class="px-6 py-4 border-b text-left">Balance</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- Loop through each customer and their payments -->
                            <template v-for="ledger in state.ledger" :key="ledger.id">
                                <tr class="hover:bg-gray-50 transition duration-150 ">
                                    <td class="px-6 py-4 border-b">{{ ledger.date }}</td>
                                    <td class="px-6 py-4 border-b">{{ ledger.customer_name }}</td>
                                    <td class="px-6 py-4 border-b">{{ ledger.type }}</td>
                                    <td class="px-6 py-4 border-b">{{ ledger.amount_due }}</td>
                                    <td class="px-6 py-4 border-b">{{ ledger.amount_interest }}</td>
                                    <td class="px-6 py-4 border-b">{{ ledger.amount_paid }}</td>
                                    <td class="px-6 py-4 border-b">{{ ledger.balance }}</td>
                                </tr>
                            </template>
                        </tbody>
                        <tfoot>
                            <!-- Total Row -->
                            <!-- <tr class="font-bold bg-gray-200">
                                <td class="px-6 py-4 border-b" colspan="3"><strong>Total Collected</strong></td>
                                <td class="px-6 py-4 border-b"><strong>{{  }}</strong></td>
                            </tr> -->
                        </tfoot>
                    </table>
                </div>

            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import PieChart from '~/components/graphs/PieChart.vue';
import { apiService } from '~/routes/api/API';
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const state = ref({
    ledger: [],
    isTableLoading: true,

});


const fetchLedgerClients = async () => {
    try {
        const response = await apiService.getClientLedger({});
         state.value.ledger = response.data
         console.log(state.value.ledger);


        state.value.isTableLoading = false;
    } catch (error) {
        toast.error(error.message, {
            autoClose: 5000,
        });
    }
};

// Fetch data on component mount
onMounted(async () => {
    fetchLedgerClients();
});


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

</script>

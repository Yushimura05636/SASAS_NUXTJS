<template>
<NuxtLayout name="admin">
    <div class="p-4">
        <div class="max-w-screen-xl mx-auto px-4 md:px-8">
            <div class="font-bold text-2xl mb-4">Collection Reports</div>

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
                <th class="px-6 py-4 border-b text-left">Transaction Date</th>
                <th class="px-6 py-4 border-b text-left">Transaction ID</th>
                <th class="px-6 py-4 border-b text-left">Customer</th>
                <th class="px-6 py-4 border-b text-left">Amount</th>
            </tr>
            </thead>
            <tbody>
            <!-- Loop through each customer and their payments -->
            <template v-for="(payments, customerId) in state.collections" :key="customerId">
                <template v-for="payment in payments" :key="payment.id">
                    <tr class="hover:bg-gray-50 transition duration-150">
                        <td class="px-6 py-4 border-b">{{ payment.prepared_at }}</td>
                        <td class="px-6 py-4 border-b">{{ payment.id }}</td>
                        <td class="px-6 py-4 border-b">{{ payment.customer_name }}</td>
                        <td class="px-6 py-4 border-b">{{ payment.amount_paid }}</td>
                    </tr>
                </template>
            </template>
            </tbody>
            <tfoot>
                <!-- Total Row -->
                <tr class="font-bold bg-gray-200">
                    <td class="px-6 py-4 border-b" colspan="3"><strong>Total Collected</strong></td>
                    <td class="px-6 py-4 border-b"><strong>{{  state.totalAmount }}</strong></td>
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
import 'vue3-toastify/dist/index.css'
import { apiService } from '~/routes/api/API';


const state = ref({
collections: [],
totalAmount: null,
isTableLoading: true,
});


const BarchartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // X-axis labels
    datasets: [
        {
            label: 'Total Collections', // Dataset label
            data: [], // Data for each month
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
            borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
            borderWidth: 1, // Bar border width
        },
    ],
});

const fetchCollectionReports = async () => {
    try {
        const response = await apiService.getCollections({});
        console.log("API Response:", response);

        // Assign `payments_by_customer` to `collections`
        state.value.collections = response.payments_by_customer;
        state.value.totalAmount = response.total_amount_collected;

        console.log("Total Amount", state.value.totalAmount);

        const totalPaymentsByMonth = response.total_payments_by_month;

        console.log("totalPaymentsByMonth", totalPaymentsByMonth);

        // Get the current year
        const currentYear = new Date().getFullYear();
        console.log("Current Year:", currentYear);

        // Update the 'data' array of the chart
        BarchartData.value.datasets[0].data = BarchartData.value.labels.map((month, index) => {
            // Construct the current month key in the format "MM-yyyy" (e.g., "09-2024")
            const monthKey = `${String(index + 1).padStart(2, '0')}-${currentYear}`;

            // Log the constructed key and the corresponding value for debugging
            console.log(`Formatted month key for ${month}: ${monthKey}`);
            console.log(`Value from totalPaymentsByMonth for ${monthKey}: ${totalPaymentsByMonth[monthKey]}`);

            // Get the value from totalPaymentsByMonth for the formatted month key
            const value = totalPaymentsByMonth[monthKey];

            // Parse the value and remove commas if present, default to 0 if undefined or invalid
            return value ? parseFloat(value.replace(/,/g, '')) : 0;
        });

        // Optionally log the updated BarchartData for debugging
        console.log("Updated BarchartData:", BarchartData.value);
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






// Fetch the collection reports when the component mounts
onMounted(async () => {
    fetchCollectionReports();
});

</script>

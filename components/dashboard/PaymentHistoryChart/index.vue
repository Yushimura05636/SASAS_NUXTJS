<template>
    <Bar :data="chartData" :options="chartOptions" />
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { apiService } from '~/routes/api/API';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  const chartData = ref({
    labels: [],
    datasets: [
      {
        label: 'Daily Payments',
        data: [], // Initialize with an empty array
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Function to format the date as 'YYYY-MM-DD' for chart labels
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }

  // Fetch the payment data and process it into daily sums
  async function fetchPaymentData() {
    try {
      const response = await apiService.getPaymentDataBarGraph({}); // API call to get payment data
      const payments = await response.data;

      const dailyPayments: Record<string, number> = {};

      // Group payments by day
      payments.forEach((payment: any) => {
        const date = formatDate(payment.created_at); // Format the payment date
        if (!dailyPayments[date]) {
          dailyPayments[date] = 0; // Initialize if not already
        }
        dailyPayments[date] += payment.amount_paid; // Add the payment amount for that day
      });

      // Prepare the data for the chart
      const labels = Object.keys(dailyPayments).sort(); // Sort the dates
      const data = labels.map(date => dailyPayments[date]); // Map the payments to the sorted dates

      // Update the chart data with the daily sums
      chartData.value.labels = labels;
      chartData.value.datasets[0].data = data;

    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  }

  onMounted(fetchPaymentData); // Fetch data when the component is mounted
  </script>

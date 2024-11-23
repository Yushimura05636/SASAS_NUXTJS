<template>
<div>
    <Doughnut :data="chartData" :options="chartOptions" />
</div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

ChartJS.register(Tooltip, Legend, ArcElement, ChartDataLabels); // Register the plugin

export default {
name: 'DoughnutChart',
components: {
    Doughnut,
},
props: {
    data: {
    type: Object,
    required: true,
    },
},
computed: {
    chartData() {
    return this.data;
    },
    chartOptions() {
    return {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        datalabels: {
            color: 'white', // Label color
            formatter: (value) => `${Math.round(value)}%`, // Format as percentage
            font: {
            weight: 'bold',
            size: 16,
            },
            anchor: 'center', // Place the label in the center of the segment
            align: 'center',  // Align the label in the center
        },
        },
    };
    },
},
};
</script>

<style scoped>
.chart-container {
margin: auto;
}
</style>

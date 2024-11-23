<template>
<div>
    <Line :data="chartData" :options="chartOptions" />
</div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default {
name: 'LineChart',
components: {
    Line,
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
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X Axis',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y Axis',
                    },
                    beginAtZero: true,
                },
            },
        };
    },
},
};
</script>

<style scoped>
/* Add any custom styles for the line chart here */
</style>

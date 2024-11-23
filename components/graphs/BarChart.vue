<template>
<div>
    <Bar :data="chartData" :options="chartOptions" />
</div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
name: 'BarChart',
components: {
    Bar,
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
            beginAtZero: true,
        },
        y: {
            beginAtZero: true,
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

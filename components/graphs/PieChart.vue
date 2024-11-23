<template>
<div >
    <Pie :data="chartData" :options="chartOptions" />
</div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement);

export default {
name: 'PieChart',
components: {
    Pie,
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

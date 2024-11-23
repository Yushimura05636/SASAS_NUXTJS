<template>
<div>
    <PolarArea :data="chartData" :options="chartOptions" />
</div>
</template>

<script>
import { PolarArea } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Tooltip, Legend, RadialLinearScale, ArcElement);

export default {
name: 'PolarAreaChart',
components: {
    PolarArea,
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
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5,
                    },
                },
            },
        };
    },
},
};
</script>

<style scoped>
/* Add any custom styles for the polar area chart here */
</style>

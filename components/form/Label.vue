<template>
    <label :for="props.for" v-if="props.label" class="text-sm text-gray-600 dark:text-white">{{ props.label }}</label>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    for: {
        type: String,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
})
</script>
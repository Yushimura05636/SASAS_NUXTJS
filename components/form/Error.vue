<template>
    <p class="text-sm text-red-500" v-if="props.error">
        {{ props.error }}
    </p>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    error: {
        type: String,
        required: false,
    },
});
</script>

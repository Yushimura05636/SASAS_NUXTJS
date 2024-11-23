<template>
    <input type="checkbox" class="w-5 h-5 accent-primary cursor-pointer focus:ring-transparent mr-2"
        :checked="props.value">
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    value: {
        type: Boolean,
        required: false,
    },
})
</script>
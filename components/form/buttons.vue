<template>
    <button type="button" class="flex items-center justify-center gap-x-2 outline-none px-4 rounded-md text-xs" :class="props.buttonStyle === 'primary' && 'py-3 bg-primary text-white hover:bg-primary-900/90 dark:bg-sky-500 dark:hover:bg-sky-400',
        props.buttonStyle === 'action' && 'py-3 border border-primary text-primary hover:bg-primary hover:text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-white',
        props.buttonStyle === 'success' && 'py-3 bg-green-800 text-white hover:bg-green-900',
        props.buttonStyle === 'warning' && 'py-3 bg-orange-600 text-white hover:bg-orange-500',
        props.buttonStyle === 'danger' && 'py-3 bg-red-800 text-white hover:bg-red-700',
        props.buttonStyle === 'link' && 'py-3 text-gray-800 hover:text-primary dark:text-white dark:hover:text-white',
        !props.buttonStyle && 'py-3 text-primary hover:text-primary-light pl-0',
        props.disabled && 'py-3 bg-red-400 hover:bg-red-400 cursor-not-allowed'" :disabled="props.disabled">
        <slot name="icon-left" />
        <slot></slot>
        <slot name="right-left" />
    </button>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    buttonStyle: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
})
</script>
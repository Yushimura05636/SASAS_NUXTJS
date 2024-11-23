<template>
    <button type="button" class="flex items-center justify-center gap-x-2 outline-none px-5 rounded-lg text-sm transition duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none shadow-md"
        :class="props.buttonStyle === 'primary' && 'py-3 bg-primary text-white hover:bg-primary-800 dark:bg-sky-500 dark:hover:bg-sky-400',
            props.buttonStyle === 'action' && 'py-3 border border-primary text-primary hover:bg-primary hover:text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-white',
            props.buttonStyle === 'success' && 'py-3 bg-green-600 text-white hover:bg-green-700',
            props.buttonStyle === 'warning' && 'py-3 bg-orange-500 text-white hover:bg-orange-600',
            props.buttonStyle === 'danger' && 'py-3 bg-red-600 text-white hover:bg-red-700',
            props.buttonStyle === 'link' && 'py-3 text-gray-800 hover:text-primary dark:text-white dark:hover:text-gray-300',
            props.buttonStyle === 'black' && 'py-3 bg-black text-white hover:bg-gray-800',
            !props.buttonStyle && 'py-3 text-primary hover:text-primary-light',
            props.disabled && 'bg-gray-400 text-gray-200 cursor-not-allowed hover:bg-gray-400'"
        :disabled="props.disabled">
        <slot name="icon-left" />
        <slot></slot>
        <slot name="icon-right" />
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

<template>
    <div class="mt-8 flex flex-col items-center gap-y-3 md:flex-row" v-if="props.data && props.data.links">
        <div class="text-sm flex items-center dark:text-white">
            Showing from
            {{ props.data.meta && props.data.meta.from ? props.data.meta.from : 0 }}
            to
            {{ props.data.meta && props.data.meta.to ? props.data.meta.to : 0 }}
            of
            {{ props.data.meta && props.data.meta.total ? props.data.meta.total : 0 }}
        </div>
        <div class="grow flex flex-row justify-end gap-x-3">
            <button
                class="w-28 bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400"
                v-if="props.data.links && props.data.links.prev !== null"
                @click="!(props.data.links && props.data.links.prev === null) && $emit('previous')">Previous</button>
            <button
                class="w-28 bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400"
                v-if="props.data.links && props.data.links.next !== null"
                @click="!(props.data.links && props.data.links.next === null) && $emit('next')">Next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <Editor api-key="gaool68vntgn1ctfio058qgrzw3odjqwwee5gp396bnv0hks" :init="{
        height: props.height,
        menubar: true,
        plugins: 'lists link image emoticons table code help wordcount'
    }" />
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Editor from '@tinymce/tinymce-vue'

const props = defineProps({
    height: {
        type: String,
        required: false,
    },
})
</script>
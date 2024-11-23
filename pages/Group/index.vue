<template>
  Processing..    
</template>
  
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

onMounted(() => {
  goTOUI();
})

function goTOUI()
{
  navigateTo('/libraries');
}
</script>

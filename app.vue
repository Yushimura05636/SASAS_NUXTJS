<template>
  <div>
    <NuxtPage :class="{ 'dark': darkModeStore.getDarkMode }" />
  </div>
</template>

<script setup>
import { useDarkModeStore } from '@/store/darkMode'

const darkModeStore = useDarkModeStore()
</script>

<style>
.logo {
  width: 150px;
  height: auto;
}
</style>
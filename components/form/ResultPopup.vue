<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <transition name="popup">
          <div v-if="isSuccess" class="flex flex-col items-center text-green-500">
            <!-- Success Animation -->
            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p class="mt-4 text-lg font-semibold">Transaction Successful!</p>
          </div>
          <div v-else class="flex flex-col items-center text-red-500">
            <!-- Error Animation -->
            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <p class="mt-4 text-lg font-semibold">Transaction Failed!</p>
          </div>
        </transition>
  
        <!-- Close Button -->
        <button @click="hidePopup" class="mt-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  import { ref } from 'vue';
  
  const visible = ref(false); // Popup visibility
  const isSuccess = ref(false); // Transaction result state (true for success, false for error)
  
  function showPopup(success: boolean) {
    isSuccess.value = success;
    visible.value = true;
  }
  
  function hidePopup() {
    visible.value = false;
  }
  </script>
  
  <style scoped>
  /* Simple popup transition */
  .popup-enter-active, .popup-leave-active {
    transition: opacity 0.3s;
  }
  .popup-enter, .popup-leave-to /* .popup-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>  
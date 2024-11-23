<template>
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto bg-white shadow-lg rounded-lg p-8 max-w-md">
        <h2 class="text-2xl font-bold text-teal-600 mb-6">Change Password</h2>
  
        <form @submit.prevent="changePassword">
          <!-- Current Password -->
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-1">Current Password</label>
            <input
              v-model="form.currentPassword"
              type="password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
  
          <!-- New Password -->
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              v-model="form.newPassword"
              type="password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              required
            />
            <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">{{ errors.newPassword }}</p>
          </div>
  
          <!-- Confirm New Password -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-1">Confirm New Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              required
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>
  
          <!-- Actions -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
  
        <!-- Success Message -->
        <div v-if="successMessage" class="mt-4 p-4 bg-green-50 text-green-700 border border-green-500 rounded-lg">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  // Temporary variables for form and validation
  const form = ref({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const errors = ref({
    newPassword: "",
    confirmPassword: "",
  });
  
  const successMessage = ref("");
  
  // Function to handle password change
  const changePassword = () => {
    // Reset errors
    errors.value.newPassword = "";
    errors.value.confirmPassword = "";
  
    // Validate new password
    if (form.value.newPassword.length < 8) {
      errors.value.newPassword = "Password must be at least 8 characters.";
      return;
    }
  
    if (form.value.newPassword !== form.value.confirmPassword) {
      errors.value.confirmPassword = "Passwords do not match.";
      return;
    }
  
    // Simulate password change
    setTimeout(() => {
      successMessage.value = "Your password has been changed successfully!";
      form.value.currentPassword = "";
      form.value.newPassword = "";
      form.value.confirmPassword = "";
    }, 1000);
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
  }
  </style>
  
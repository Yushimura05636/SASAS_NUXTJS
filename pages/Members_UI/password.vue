<template>
<div class="max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-center items-center bg-teal-50">
    <div class="flex items-center justify-center mb-6">
    <img alt="Company Logo" class="h-16" src="../../img/landing_bg.png" />
    </div>

    <!-- Enter Password Section -->
    <section class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h2 class="text-xl font-semibold mb-4">Enter Your Password</h2>
    <form @submit.prevent="submitForm">
        <div class="mb-4 relative">
        <label class="block text-gray-500 mb-2" for="password">Password</label>
        <input
            id="password"
            class="w-full p-2 border rounded"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
        />
        <button @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-3 text-gray-500" type="button">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>
        <router-link
        to="/newpassword">
        <button class="w-full bg-teal-800 text-white p-2 rounded" type="submit">Save</button>
    </router-link>
    </form>
    </section>
</div>
</template>

<script setup>
import { ref } from 'vue';

const accountPassword = 'correct_password'; // For demo purposes; in a real app, this should be securely handled
const password = ref('');
const showPassword = ref(false);
const errorMessage = ref('');

function togglePasswordVisibility() {
showPassword.value = !showPassword.value;
}

function submitForm() {
if (password.value === accountPassword) {
    alert('Password is correct!');
    // Redirect to the next page or perform the desired action
} else {
    errorMessage.value = 'Incorrect password. Please try again.';
}
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

body {
font-family: 'Inter', sans-serif;
}
</style>
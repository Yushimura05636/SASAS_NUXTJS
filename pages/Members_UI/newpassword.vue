<template>
<div class="max-w-4xl mx-auto p-6 bg-teal-50">
    <div class="flex items-center justify-center mb-6">
    <img alt="Company Logo" class="h-16" src="../../img/Lending_logo.png" />
    </div>

    <!-- Create Password Section -->
    <section class="flex items-center justify-center min-h-screen bg-green-50">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Create New Password</h2>
        <form @submit.prevent="submitForm">
        <div class="mb-4">
            <label class="block text-gray-500 mb-2" for="old-password">Old Password</label>
            <div class="relative">
            <input
                id="old-password"
                class="w-full p-2 border rounded"
                :type="showOldPassword ? 'text' : 'password'"
                v-model="oldPassword"
            />
            <button
                @click="togglePasswordVisibility('old')"
                class="absolute inset-y-0 right-0 px-3 text-gray-500"
                type="button"
            >
                <i :class="showOldPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
            </div>
        </div>

        <div class="mb-4">
            <label class="block text-gray-500 mb-2" for="new-password">Create New Password</label>
            <div class="relative">
            <input
                id="new-password"
                class="w-full p-2 border rounded"
                :type="showNewPassword ? 'text' : 'password'"
                v-model="newPassword"
            />
            <button
                @click="togglePasswordVisibility('new')"
                class="absolute inset-y-0 right-0 px-3 text-gray-500"
                type="button"
            >
                <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
            </div>
        </div>

        <div class="mb-4">
            <label class="block text-gray-500 mb-2" for="retype-password">Re-type New Password</label>
            <div class="relative">
            <input
                id="retype-password"
                class="w-full p-2 border rounded"
                :type="showRetypePassword ? 'text' : 'password'"
                v-model="retypePassword"
            />
            <button
                @click="togglePasswordVisibility('retype')"
                class="absolute inset-y-0 right-0 px-3 text-gray-500"
                type="button"
            >
                <i :class="showRetypePassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
            </div>
        </div>

        <button class="w-full bg-teal-800 text-white p-2 rounded" type="submit">
            Submit
        </button>
        </form>
    </div>
    </section>
</div>
</template>

<script setup>
import { ref } from 'vue';

const oldPassword = ref('');
const newPassword = ref('');
const retypePassword = ref('');
const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showRetypePassword = ref(false);

function togglePasswordVisibility(type) {
if (type === 'old') showOldPassword.value = !showOldPassword.value;
else if (type === 'new') showNewPassword.value = !showNewPassword.value;
else if (type === 'retype') showRetypePassword.value = !showRetypePassword.value;
}

function submitForm() {
console.log("Old Password:", oldPassword.value);
console.log("New Password:", newPassword.value);
console.log("Re-typed Password:", retypePassword.value);
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

body {
font-family: 'Inter', sans-serif;
}
</style>
<template>
<div class="flex flex-col md:flex-row h-screen bg-teal-600">
    <!-- User Information -->
<div class="w-full md:w-1/4 bg-teal-600 text-white border-r border-gray-200 p-4 flex flex-col justify-between">
    <div>
    <div class="flex items-center justify-between mb-6">
        <img src="../../img/Lending_logo.png" alt="Company Logo" class="h-8" />
        <i class="fas fa-times"></i>
    </div>
    <div class="mt-4 flex flex-col items-center">
        <a href="/memProfile" class="flex flex-col items-center text-white">
        <div class="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center text-2xl font-bold">
            JD
        </div>
        <h3 class="mt-2 text-lg font-semibold">John Doe</h3>
        </a>
        <p class="mt-1">johndoe@lendcash.erd.ph</p>
        <p class="mt-1">+1 202 555 0156</p>
        <div class="flex items-center space-x-2 mt-2">
        <span class="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
            Registered Member
            <i class="fas fa-check-circle text-blue-800 ml-1"></i>
        </span>
        </div>
    </div>
    <div class="mt-6">
        <h4 class="text-lg font-semibold mb-2">Security</h4>
        <!-- Change Password Button as a Router Link -->
        <router-link
            to="/password"
            class="flex items-center justify-between w-full bg-teal-700 hover:bg-teal-800 text-white px-3 py-2 rounded">
            <button class="flex items-center justify-between w-full bg-teal-700 hover:bg-teal-800 text-white px-3 py-2 rounded">
            Change Password
            <i class="fas fa-arrow-right"></i>
            </button>
        </router-link>
    </div>
    </div>
    <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mb-4 self-center" type="button">
    Logout
    </button>
</div>

    <!-- Main Content Area -->
    <main class="w-full md:w-3/4 flex flex-col bg-teal-50 overflow-hidden">
    <header class="p-4 border-b border-gray-200 bg-white">
        <h1 class="text-2xl font-semibold text-teal-800">Customer Dashboard</h1>
    </header>
    <div class="flex-1 p-4 space-y-6 overflow-y-auto">
        <!-- Loan Schedule -->
        <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-teal-700">Loan Schedule</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <p><strong>Loan Application ID:</strong> #12345</p>
            <p><strong>Passbook Number:</strong> PB12345</p>
            <p><strong>Amount to Pay:</strong> $1000</p>
            <p><strong>Co-maker:</strong> Jane Doe</p>
            </div>
            <div>
            <p><strong>Due Date:</strong> 2023-10-15</p>
            <p><strong>Prepared By:</strong> John Smith</p>
            <p><strong>Balance:</strong> $500</p>
            </div>
        </div>
        </section>

        <!-- Loan Application History -->
        <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-teal-700">Loan Application History</h2>
        <div v-for="application in loanApplications" :key="application.id" class="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><strong>Application ID:</strong> #{{ application.id }}</p>
            <p><strong>Loan Cycle:</strong> {{ application.cycle }}</p>
            <p><strong>Amount Paid:</strong> ${{ application.amountPaid }}</p>
            <p><strong>Status:</strong> <span :class="getStatusClass(application.status)">{{ application.status }}</span></p>
            <p><strong>Application Date:</strong> {{ application.date }}</p>
            </div>
        </div>
        </section>

        <!-- History Payments -->
        <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-teal-700">Payment History</h2>
        <div v-for="payment in paymentHistory" :key="payment.id" class="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><strong>Application ID:</strong> #{{ payment.applicationId }}</p>
            <p><strong>Payment Date:</strong> {{ payment.date }}</p>
            <p><strong>Amount Paid:</strong> ${{ payment.amount }}</p>
            <p><strong>Status:</strong> <span :class="getStatusClass(payment.status)">{{ payment.status }}</span></p>
            <p><strong>Prepared By:</strong> {{ payment.preparedBy }}</p>
            </div>
        </div>
        </section>
    </div>
    </main>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loanApplications = ref([
{ id: '12345', cycle: 1, amountPaid: 500, status: 'Approved', date: '2023-01-15' },
{ id: '67890', cycle: 2, amountPaid: 300, status: 'Pending', date: '2023-02-20' },
])

const paymentHistory = ref([
{ id: 1, applicationId: '12345', date: '2023-03-01', amount: 500, status: 'Completed', preparedBy: 'John Smith' },
{ id: 2, applicationId: '67890', date: '2023-04-01', amount: 300, status: 'Completed', preparedBy: 'Jane Doe' },
])

const getStatusClass = (status: string) => {
switch (status.toLowerCase()) {
    case 'approved':
    case 'completed':
    return 'text-green-600 font-semibold'
    case 'pending':
    return 'text-yellow-600 font-semibold'
    default:
    return 'text-gray-600'
}
}

const logout = () => {
// Implement logout logic here
console.log('Logging out...')
}
</script>

<style scoped>
body {
font-family: 'Roboto', sans-serif;
}
</style>
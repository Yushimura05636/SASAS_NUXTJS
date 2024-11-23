<template>
<NuxtLayout name="admin">
    <div class="p-6 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
    <div class="flex items-center space-x-4 mb-6">
        <h1 class="text-3xl font-bold text-teal-800">{{ group.name }}</h1>
    </div>

    <div class="flex items-center space-x-4 mb-6 mt-6">
        <h1 class="text-3xl font-bold text-teal-800">{{ group.collector_name }}</h1>
    </div>

    <div class="overflow-x-auto bg-teal-50 p-4 rounded-lg shadow-md">
        <table class="min-w-full bg-white border border-teal-200 rounded-lg shadow-lg">
        <thead class="bg-teal-100 text-teal-700 uppercase text-sm">
            <tr>
            <th class="px-6 py-3 text-left">Last Name</th>
            <th class="px-6 py-3 text-left">First Name</th>
            <th class="px-6 py-3 text-left">Middle Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="isLoading">
            <td colspan="3" class="text-center py-4 text-teal-500">Loading...</td>
            </tr>
            <tr v-else-if="group.members.length === 0">
            <td colspan="3" class="text-center py-4 text-teal-500">No members in this group</td>
            </tr>
            <tr v-for="member in group.members" :key="member.id" class="hover:bg-teal-50 transition duration-150">
            <td class="px-6 py-4 border-b border-teal-100">{{ member.family_name }}</td>
            <td class="px-6 py-4 border-b border-teal-100">{{ member.first_name }}</td>
            <td class="px-6 py-4 border-b border-teal-100">{{ member.middle_name }}</td>
            </tr>
        </tbody>
        </table>
        
    </div>

    <!-- Back Button with Additional Margin -->
    <div class="mt-8 flex justify-start">
        <button
        @click="goBack"
        class="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
        >
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Back
        </button>
    </div>
    </div>
</NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { apiService } from '~/routes/api/API';

const route = useRoute();
const router = useRouter();

const group = ref({ name: '', members: [], collector_name: '', });
const isLoading = ref(true);
const gorupId = ref('');

onMounted(async () => {
gorupId.value = route.query.id;
// Simulate API call
// await new Promise(resolve => setTimeout(resolve, 1000));
// // Mock data for demonstration
// group.value = {
//     name: 'Group A',
//     members: [
//     { id: 1, name: 'Alice Johnson', dateAdded: '2023-05-01', loanAmount: 1000 },
//     { id: 2, name: 'Bob Smith', dateAdded: '2023-05-02', loanAmount: 1500 },
//     // Add more mock data as needed
//     ]

// };
fetchGroupDetails();
isLoading.value = false;
});

async function fetchGroupDetails()
{
    try {
        const response = await apiService.getGroupViewDataById({}, parseInt(gorupId.value));
        group.value.members = response.data
        group.value.name = response.group_name
        group.value.collector_name = response.collector.last_name + ' ' + ' ' + response.collector.first_name + ' ' + response.collector.middle_name
        debugger
    } catch (error) {
        console.error(`${error}`)
    }
}

const totalLoanAmount = computed(() => {
return group.value.collector_name
});

// Go back to the previous page
function goBack() {
router.back();
}
</script>
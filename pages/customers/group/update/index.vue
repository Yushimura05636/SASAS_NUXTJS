<template>
<NuxtLayout name="admin">
    <div class="p-6 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-teal-800">Update Group</h1>

    <form @submit.prevent="submitForm" class="space-y-6">
        <div>
        <h2 class="text-xl font-semibold mb-3 text-teal-700">{{ group.name }}</h2>

        <!-- Add and Remove Member Section -->
        <div class="mb-4 flex justify-between items-center space-x-2">
            <div class="flex-1 max-w-xs">
            <label for="addMemberSelect" class="block text-sm font-medium text-gray-700 mb-1">Add Member</label>
            <select
                id="addMemberSelect"
                v-model="selectedNewMember"
                class="w-full border-2 border-teal-300 rounded-lg px-2 py-2 focus:outline-none focus:border-teal-500"
            >
                <option value="" disabled>Select a member to add</option>
                <option
                v-for="member in availableMembers"
                :key="member.id"
                :value="member"
                >{{ member.name }}</option>
            </select>
            </div>
            <div class="flex space-x-2">
            <button
                type="button"
                @click="addMember"
                :disabled="!selectedNewMember"
                class="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition flex items-center"
            >
                <PlusIcon class="w-5 h-5 mr-2" /> <!-- Plus Icon for Add -->
                Add
            </button>
            <button
                type="button"
                @click="removeMember"
                :disabled="!selectedMember"
                class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition flex items-center"
            >
                <TrashIcon class="w-5 h-5 mr-2" /> <!-- Trash Icon for Remove -->
                Remove
            </button>
            </div>
        </div>

        <!-- Members Table -->
        <div class="overflow-x-auto bg-teal-50 p-4 rounded-lg shadow-md">
            <table class="min-w-full bg-white border border-teal-200 rounded-lg shadow-lg">
            <thead class="bg-teal-100 text-teal-700 uppercase text-sm">
                <tr>
                <th class="px-6 py-3 text-left">Select</th>
                <th class="px-6 py-3 text-left">Name</th>
                <th class="px-6 py-3 text-left">Date Added</th>
                <th class="px-6 py-3 text-left">Loan Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="member in group.members" :key="member.id" class="hover:bg-teal-50 transition duration-150">
                <td class="px-6 py-4 border-b border-teal-100">
                    <input
                    type="radio"
                    :value="member.id"
                    v-model="selectedMember"
                    class="form-radio h-5 w-5 text-teal-600"
                    />
                </td>
                <td class="px-6 py-4 border-b border-teal-100">{{ member.name }}</td>
                <td class="px-6 py-4 border-b border-teal-100">{{ member.dateAdded }}</td>
                <td class="px-6 py-4 border-b border-teal-100">{{ member.loanAmount }}</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>

        <!-- Collector Selection -->
        <div>
        <label for="collectorSelect" class="block text-sm font-medium text-gray-700 mb-2">Collector's Name</label>
        <select
            id="collectorSelect"
            v-model="selectedCollector"
            class="w-full border-2 border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
        >
            <option value="">Select a collector</option>
            <option v-for="collector in collectors" :key="collector.id" :value="collector.id">{{ collector.name }}</option>
        </select>
        </div>

        <div class="flex justify-between">
        <button
            type="button"
            @click="cancelUpdate"
            class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
        >
            Cancel
        </button>
        <button
            type="submit"
            class="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
            :disabled="!isFormValid"
        >
            Update Group
        </button>
        </div>
    </form>
    </div>
</NuxtLayout>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();

const group = ref({
id: 1,
name: 'Group A',
members: [
{ id: 1, name: 'John Doe', dateAdded: '2023-05-01', loanAmount: 1000 },
{ id: 2, name: 'Jane Smith', dateAdded: '2023-05-02', loanAmount: 1500 },
],
});

// Mock data for registered members in the system
const registeredMembers = ref([
{ id: 3, name: 'Alice Johnson' },
{ id: 4, name: 'Bob Brown' },
{ id: 5, name: 'Charlie Clark' },
]);

const collectors = ref([
{ id: 1, name: 'John Doe' },
{ id: 2, name: 'Jane Smith' },
]);

const selectedMember = ref(null);
const selectedCollector = ref('');
const selectedNewMember = ref(null);

// Filter registered members to exclude already added members
const availableMembers = computed(() =>
registeredMembers.value.filter(
(member) => !group.value.members.some((m) => m.id === member.id)
)
);

const isFormValid = computed(() => {
return group.value.members.length >= 4 && group.value.members.length <= 8 && selectedCollector.value !== '';
});

function addMember() {
if (selectedNewMember.value && group.value.members.length < 8) {
const newMember = {
    ...selectedNewMember.value,
    dateAdded: new Date().toISOString().split('T')[0],
    loanAmount: 0,
};
group.value.members.push(newMember);
selectedNewMember.value = null;
} else {
alert('Maximum number of members (8) reached.');
}
}

function removeMember() {
if (selectedMember.value && group.value.members.length > 4) {
group.value.members = group.value.members.filter(member => member.id !== selectedMember.value);
selectedMember.value = null;
} else {
alert('Minimum number of members (4) reached.');
}
}

function submitForm() {
if (isFormValid.value) {
console.log('Form submitted', {
    groupId: group.value.id,
    collectorId: selectedCollector.value,
    members: group.value.members,
});
router.push('/customers/group');
}
}

function cancelUpdate() {
router.push('/customers/group');
}
</script>
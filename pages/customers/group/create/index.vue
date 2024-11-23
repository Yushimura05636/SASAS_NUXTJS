<template>
<NuxtLayout name="admin">
    <div class="p-6 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-teal-800">Create Group</h1>

    <form @submit.prevent="createGroup" class="space-y-6">
        <div>
            <label for="groupSelect" class="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
            <input v-model="customer_group.description" type="text" class="w-full border rounded-lg px-4 py-2"  />
        </div>

        <div>
            <label for="collectorSelect" class="block text-sm font-medium text-gray-700 mb-2">
                Collector's Name
            </label>
            <select
                v-model="customer_group.collector_id"
                id="collectorSelect"
                class="w-full border-2 border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
            >
                <option value="" disabled>Select a collector</option>
                <!-- Dynamically populate the dropdown -->
                <option v-for="collector in state.collectors" :key="collector.id" :value="collector.id">
                {{ collector.first_name }} {{ collector.last_name }}
                </option>
            </select>
        </div>



        <div class="flex justify-between">
        <button
            type="button"
            @click="handleCancel()"
            class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition">
            Cancel
        </button>

        <button
            type="submit"
            class="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
            Create Group
        </button>
        </div>
    </form>
    </div>
</NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref, onMounted } from 'vue';
import { apiService } from '~/routes/api/API';

function handleCancel()
{
    navigateTo(`/customers/group`)
}

const fetchCollectors = async () => {
// Replace with your actual API call
    try {
        debugger
        const response = await apiService.getCollector({});
        state.value.collectors = response.data;

        console.log("Collectors",response);
    } catch (error) {
        toast.error(error.message, {
        autoClose: 5000,
        })
    }
};


const state = ref({
collectors: [],
isTableLoading: false,
});

const customer_group = ref({
        description: '',
        collector_id: '',
        })

        // create user data
const createGroup = async () => {
    try {

        if(customer_group.value.description.length <= 0)
        {
            toast.error(`The group name should not be empty!`)
            return   
        }
        if(customer_group.value.collector_id.length <= 0)
        {
            toast.error(`The collector name should not be empty!`)
            return   
        }

        const jsonObject = {
            description: customer_group.value.description,
            collector_id: customer_group.value.collector_id,
        };
            const response =  await apiService.createGroup(jsonObject);

        if(response)
        {
            toast.success("Customer group created successfully!", {
            autoClose: 2000,
            });
            // Introduce a delay before navigating
            setTimeout(() => {
                navigateTo('/customers/group');
            }, 2000);
        }

        } catch (error) {
            toast.error('Error creating Customer group: ' + error);
            toast.error(`${error}`, {
    autoClose: 5000,
    });
        }
    };


onMounted(async () => {
    fetchCollectors();
})
</script>
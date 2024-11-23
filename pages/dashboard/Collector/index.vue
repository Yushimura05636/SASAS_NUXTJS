<template>
    <NuxtLayout name="admin">
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Welcome Message and Date-Time -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-3xl font-extrabold text-gray-800">Welcome Back, 
                    {{  UserService.last_name ?? 'User'}} {{  UserService.first_name ?? 'User'}} {{ UserService.middle_name ?? 'User'}}!
                </h1>
                <p class="text-gray-600 text-lg">{{ currentDateTime }}</p>
            </div>
        </div>

        <!-- Loan Overview Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-3">Payments to collect</h2>
            <p class="text-3xl font-semibold text-red-600">{{ formatCurrency(state.totaltoCollect)  }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-3">Collected payments</h2>
            <p class="text-3xl font-semibold text-green-600">{{ formatCurrency(state.totalCollected) }}</p>
        </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md ">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Loans to Collect</h2>
            <div class="overflow-x-auto max-h-96 overflow-y-auto">
                <table class="min-w-full bg-white rounded-lg border border-gray-200 ">
                <thead>
                    <tr>
                        <th class="py-2 px-4">Group Name</th>
                        <th class="py-2 px-4">Full name</th>
                        <th class="py-2 px-4">Amount Due</th>
                        <th class="py-2 px-4">Due Date</th>
                        <th class="py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through loanstoCollect -->
                    <tr 
                        v-for="(loan, index) in state.loanstoCollect" 
                        :key="index"
                        class="hover:bg-gray-50 transition duration-200"
                    >
                        <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            {{ loan["Group Name"] }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            {{ loan["Full Name"] }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            {{ loan["Amount Due"] }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            {{ loan["Due Date"] }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium">
                            <!-- Check if due date is overdue -->
                            <span 
                                v-if="new Date(loan['Due Date']) < new Date()" 
                                class="text-red-500 font-bold"
                            >
                                Overdue
                            </span>
                            <span 
                                v-else 
                                class="text-green-500 font-bold"
                            >
                                On Time
                            </span>
                        </td>
                        
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md mt-10">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Loans Collected</h2>
            <div class="overflow-x-auto max-h-96 overflow-y-auto ">
                <table class="min-w-full bg-white rounded-lg border border-gray-200">
                <thead>
                    <tr>
                        <th class="py-2 px-4">Group Name</th>
                        <th class="py-2 px-4">Full name</th>
                        <th class="py-2 px-4">Amount Paid</th>
                        <th class="py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through loanstoCollect -->
                    <tr 
                        v-for="(loan, index) in state.loansCollected" 
                        :key="index"
                        class="hover:bg-gray-50 transition duration-200"
                    >
                    <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            {{ loan["Group Name"] }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            {{ loan["Customer Name"] }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            {{ loan["Amount Paid"] }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800">
                            <span 
                                :class="{
                                    'text-green-500 font-bold': loan['Payment Status'] === 'PAID',
                                    'text-orange-500 font-bold': loan['Payment Status'] === 'PARTIALLY PAID, FORWARDED'
                                    }"
                                >
                                {{ loan["Payment Status"] }}
                            </span>
                        </td>
                        
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

    </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, onMounted } from 'vue'
import { UserService } from '~/models/User';
import { apiService } from '~/routes/api/API'

// Real-time clock
const currentDateTime = ref('')

const last_name = ref('User');
const first_name = ref('User');
const middle_name = ref('User');


first_name.value = UserService.first_name
last_name.value = UserService.last_name
middle_name.value = UserService.middle_name

// Update the time every second
const updateTime = () => {
    const now = new Date()
    currentDateTime.value = now.toLocaleString()
}


const state = ref({
    totalCollected: 0,
    totaltoCollect: 0,
    userLogged: [],
    loanstoCollect:[],
    loansCollected:[],
});


    const test = async () => {
    try {
        // Step 1: Fetch user data to get collector_id and group_id
        const userResponse = await apiService.getCollectorAndGroupID({});
        
        if (userResponse.success && userResponse.data.customer_group) {
            // Correctly access the collector_id from the customer_group
            const collector_id = userResponse.data.customer_group.collector_id;

            console.log("Collector ID: ", collector_id);  // Display the collector_id
        } else {
            console.log("No customer group data found.");
        }
    } catch (error) {
        // Handle any error that occurs in the try block
        console.log("Error: ", error);
    }
};





const fetchLoansToCollect = async () => {
try {
    // Step 1: Fetch user data to get collector_id and group_id
    const userResponse = await apiService.getCollectorAndGroupID({});
    
    if (userResponse.success && userResponse.data.customer_group) {
            // Correctly access the collector_id from the customer_group
        const collector_id = userResponse.data.customer_group.collector_id;

        console.log("Collector ID: ", collector_id); 

        // Step 2: Fetch loans using the collector_id and group_id
        const loansResponse = await apiService.getLoansToCollect({ 
            collector_id: collector_id 
        });

        if (loansResponse.success) {
            // Step 3: Update state with the loans data and total amount to collect
            state.value.loanstoCollect = loansResponse.data;
            state.value.totaltoCollect = loansResponse.total_to_collect;  // Save the total_collected in the state

            console.log("Loans to Collect: ", state.value.loanstoCollect);
            console.log("Total to Collect: ", state.value.totaltoCollect); // Log total to collect amount

        } else {
            throw new Error(loansResponse.message || 'Failed to fetch loans');
        }
    } else {
        throw new Error(userResponse.message || 'Failed to fetch user data');
    }
} catch (error) {
    // Catch any errors from either of the API calls
    console.error("Error: ", error);
    toast.error(`${error}`, { autoClose: 5000 });
}
};



const fetchLoansCollected = async () => {
try {
    // Step 1: Fetch user data to get collector_id and group_id
    const userResponse = await apiService.getCollectorAndGroupID({});
    
    if (userResponse.success && userResponse.data.customer_group) {
        const { collector_id, group_id } = userResponse.data.customer_group;

        console.log("Collector ID: ", collector_id);
        console.log("Group ID: ", group_id);

        // Step 2: Fetch loans using the collector_id and group_id
        const loansResponse = await apiService.getLoansCollected({ 
            group_id: group_id, 
            collector_id: collector_id 
        });

        if (loansResponse.success) {
            state.value.loansCollected = loansResponse.data;
            state.value.totalCollected = loansResponse.total_collected;  // Save the total_collected in the state


            console.log("Loans to Collected: ", state.value.loansCollected);
            console.log("Total Collected: ", state.value.totalCollected); // Log total collected amount
        } else {
            throw new Error(loansResponse.message || 'Failed to fetch loans');
        }
    } else {
        throw new Error(userResponse.message || 'Failed to fetch user data');
    }
} catch (error) {
    console.error("Error: ", error);
    toast.error(`${error}`, { autoClose: 5000 });
}
};



const formatCurrency = (value) => {
return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}


// Call the updateTime function every second
onMounted(() => {
    debugger
    // test();
    fetchLoansCollected();
    fetchLoansToCollect();
    setInterval(updateTime, 1000) // Update time every second
})
</script>  
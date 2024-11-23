<template>
    <NuxtLayout name="admin">
            <div class="p-4">
                <div class="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div class="font-bold">Payment Frequency</div>

                    <!-- Action Buttons -->
                    <div class="flex justify-between items-center mb-8 mt-8">

                        <!-- Left: Action Buttons -->
                        <div class="flex space-x-4">
                            <button  class="px-4 py-2 text-white button rounded-lg hover:bg-green-600"
                            @click="createPaymentFrequency">
                            Create
                            </button>

                            <button
                            type="button"
                            class="px-4 py-2 text-white button rounded-lg hover:bg-blue-600"
                            v-if="selectedFrequencyID"
                            @click="updateFrequency"
                            >
                            Modify
                            </button>

                            <button type="button"
                            class="px-4 py-2 text-white button rounded-lg hover:bg-red-600 "
                            v-if="selectedFrequencyID"
                            >
                            Delete
                            </button>
                        </div>

                        <!-- Right: Search Bar -->
                        <div class="flex items-center space-x-2">
                            <input
                            type="text"
                            placeholder="Search"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            <button class="px-4 py-2 text-white button rounded-lg hover:bg-indigo-700">
                            Search
                            </button>
                        </div>
                    </div>

                    <Table class="w-full  "
                        :columnHeaders="state.columnHeaders"
                        :data="state.frequency"
                        :isLoading="state.isTableLoading"
                        :sortData="state.sortData"
                        >
                        <template #body
                            v-if="!(state.isTableLoading || (state.frequency?.data === 0))">

                            <tr v-for="(frequency, index) in state.frequency?.data" :key="index" class="">

                                <td class="py-2 border-b border-gray-300 ">
                                    <input
                                    type="radio"
                                    :value="frequency.id"
                                    v-model="selectedFrequencyID"
                                    class="cursor-pointer"
                                    />
                                </td>
                                <td class="py-2 border-b border-gray-300  ">
                                    <span>{{ frequency.description }} </span>
                                </td>
                                <td class="py-2 border-b border-gray-300 ">
                                    <span>{{ frequency.days_interval }}</span>
                                </td>
                                <td class="py-2 border-b border-gray-300 ">
                                    <span>{{ frequency.notes }}</span>
                                </td>
                                <!-- <td class="border-b border-gray-300 cursor-pointer ">
                                    <FormButton class="bg-blue-600 hover:bg-blue-800 text-white rounded pl-5 pr-5"></FormButton>
                                </td> -->
                            </tr>
                        </template>
                    </Table>
                </div>
            </div>
    </NuxtLayout>
</template>


<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

    import { ref, reactive, onMounted } from 'vue'
    import { apiService } from '~/routes/api/API'
    import { paymentFrequencyService } from '~/models/PaymentFrequency'
import { PermissionService } from '~/models/Permission';
import { PageNameService } from '~/models/PageName';



    const state = reactive({
        columnHeaders: [
            { name: 'Select' },
            { name: 'Description' },
            { name: 'Days Interval' },
            { name: 'Notes' }
        ],
        error: null,
        isTableLoading: false,
        sortData: {
            sortField: 'id',
            sortOrder: 'descend',
        },
        frequency: [],
        searchQuery: '',
    })

    let selectedFrequencyID = ref(null); // Track selected library


    async function fetchFreqandDuration() {
        state.isTableLoading = true
        state.error = null
        try {
            const params = {}
            const response = await apiService.getPaymentFrequency(params)
            state.frequency = response
            console.log(state.frequency);
        } catch (error: any) {
            toast.error(`${error}`, {
                autoClose: 5000,
            })
        }
        state.isTableLoading = false
    }
    onMounted(() => {
        PageNameService.pageName = 'Payment Frequencies';
        fetchFreqandDuration()
    })


    async function updateFrequency(){
        try {
            const response = await apiService.authPaymentFrequenciesUpdate({})
            if (selectedFrequencyID.value) {
        let daysInterval = null;
        let description = null;
        let notes = null;

        // Iterate through the data using a for loop
        for (let i = 0; i < state.frequency?.data.length; i++) {
            const frequency = state.frequency.data[i];

            // Check if the current library's id matches the selectedLibraryId
            if (frequency.id == parseInt(selectedFrequencyID.value)?.toString()) {
                description = frequency.description;
                daysInterval = frequency.days_interval;
                notes = frequency.notes;
            break; // Exit the loop once we find the selected library
            }
        }
        paymentFrequencyService.id = selectedFrequencyID.value;
        paymentFrequencyService.description = description;
        paymentFrequencyService.days_interval = daysInterval;
        paymentFrequencyService.notes = notes;

        console.log(paymentFrequencyService.id);
        console.log(paymentFrequencyService.description);
        console.log(paymentFrequencyService.days_interval);
        console.log(paymentFrequencyService.notes);
        navigateTo('payment_frequency/update');
        }
        } catch (error) {
            toast.error(`${error}`, {
      autoClose: 5000,
    })
        }
    }

    async function createPaymentFrequency() {
        try {
            const response = await apiService.authPaymentFrequenciesCreate({})
            navigateTo('/payment_frequency/create')
        } catch (error) {
            toast.error(`${error}`, {
      autoClose: 5000,
    })
        }
    }

</script>

<style>
.button {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    background-color: #116f6f; /* Tailwind color teal-800 */
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 15px;
  }
  
  .icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease-in-out;
  }
  
  .button:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }
  
  .button:hover .icon {
    transform: translate(4px);
  }
  
  .button:hover::before {
    animation: shine 1.5s ease-out infinite;
  }
  
  .button::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }</style>
